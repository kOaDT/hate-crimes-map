'use client';

import { useEffect, useState, useMemo } from 'react';
import ReactMap, { Source, Layer } from 'react-map-gl';
import { countryCoordinates } from '../helpers/countryCoordinates';
import CountryModal from './Modal';

export interface ICrime {
  Date: string;
  Country: string;
  'Bias motivations': string;
  'Type of incident': string;
  Source: string;
  Description: string;
}

interface IProps {
  crimes: ICrime[];
}

export default function MapComponent({ crimes }: IProps) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<ICrime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const crimesByCountry = useMemo(() => {
    return crimes.reduce(
      (acc, crime) => {
        const country = crime.Country;
        if (!acc[country]) {
          acc[country] = [];
        }
        acc[country].push(crime);
        return acc;
      },
      {} as Record<string, ICrime[]>
    );
  }, [crimes]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const processData = () => {
      setIsLoading(true);

      const uniqueMap = new Map();
      crimesByCountry[selectedCountry].forEach((crime) => {
        const key = `${crime.Date}-${crime['Type of incident']}-${crime['Bias motivations']}-${crime.Source}-${crime.Description}`;
        uniqueMap.set(key, crime);
      });
      const uniqueAndSortedData = Array.from(uniqueMap.values()).sort(
        (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );

      setProcessedData(uniqueAndSortedData);
      setIsLoading(false);
    };

    processData();
  }, [crimesByCountry, selectedCountry]);

  if (!mounted) return null;

  const circleData = {
    type: 'FeatureCollection',
    features: Object.entries(crimesByCountry)
      .filter(([country]) => countryCoordinates[country])
      .map(([country, crimes]) => ({
        type: 'Feature',
        properties: {
          count: crimes.length,
          country,
        },
        geometry: {
          type: 'Point',
          coordinates: countryCoordinates[country],
        },
      })),
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        cursor: hoveredCountry ? 'pointer' : 'default',
      }}
    >
      <ReactMap
        initialViewState={{
          longitude: 10,
          latitude: 50,
          zoom: 3,
          pitch: 0,
          bearing: 0,
        }}
        style={{ width: '100%', height: '100%' }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/outdoors-v12'
        reuseMaps
        interactiveLayerIds={loaded ? ['circles'] : []}
        onLoad={() => setLoaded(true)}
        onMouseEnter={(event) => {
          const features = event.features || [];
          const clickedCountry = features[0]?.properties?.country;
          if (clickedCountry) {
            setHoveredCountry(clickedCountry);
          }
        }}
        onMouseLeave={() => {
          setHoveredCountry(null);
        }}
        onClick={(event) => {
          const features = event.features || [];
          const clickedCountry = features[0]?.properties?.country;
          if (clickedCountry) {
            setHoveredCountry(null);
            setSelectedCountry(clickedCountry);
          }
        }}
      >
        <Source type='geojson' data={circleData}>
          <Layer
            id='circles'
            type='circle'
            paint={{
              'circle-radius': ['*', ['sqrt', ['get', 'count']], 1],
              'circle-color': '#FF0000',
              'circle-opacity': 0.6,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#FFFFFF',
            }}
          />
        </Source>
      </ReactMap>

      {selectedCountry && (
        <div>
          {isLoading ? (
            <div className='loader'>Loading...</div>
          ) : (
            <CountryModal country={selectedCountry} data={processedData} onClose={() => setSelectedCountry(null)} />
          )}
        </div>
      )}
    </div>
  );
}
