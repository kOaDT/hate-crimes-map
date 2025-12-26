'use client';

import { useEffect, useState, useMemo } from 'react';
import { Map as ReactMap } from 'react-map-gl/mapbox';
import { Source, Layer } from 'react-map-gl/mapbox';
import type { FeatureCollection, Point, GeoJsonProperties } from 'geojson';
import { countryCoordinates } from '../utils/countryCoordinates';
import CountryModal from './Modal';
import Legend from './Legend';

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
  const [mounted] = useState(() => typeof window !== 'undefined');
  const [loaded, setLoaded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<ICrime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBiases, setSelectedBiases] = useState<string[]>([]);

  const topBiasMotivations = useMemo(() => {
    const biasCount = crimes.reduce(
      (acc, crime) => {
        const bias = crime['Bias motivations'];
        acc[bias] = (acc[bias] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(biasCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([bias]) => bias);
  }, [crimes]);

  const crimesByCountry = useMemo(() => {
    return crimes
      .filter((crime) => selectedBiases.length === 0 || selectedBiases.includes(crime['Bias motivations']))
      .reduce(
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
  }, [crimes, selectedBiases]);

  const thresholds = [10, 50, 100, 500, 1000, 5000];
  const circleColor = '#FF1A1A';

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

  const circleData: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection' as const,
    features: Object.entries(crimesByCountry)
      .filter(([country]) => countryCoordinates[country])
      .map(([country, crimes]) => ({
        type: 'Feature' as const,
        properties: {
          count: crimes.length,
          country,
        },
        geometry: {
          type: 'Point' as const,
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
      <Legend
        thresholds={thresholds}
        circleColor={circleColor}
        biasMotivations={topBiasMotivations}
        selectedBiases={selectedBiases}
        onBiasChange={setSelectedBiases}
      />

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
        mapStyle='mapbox://styles/mapbox/dark-v11'
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
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'count'],
                0,
                4,
                10,
                8,
                50,
                12,
                100,
                16,
                500,
                24,
                1000,
                32,
                5000,
                48,
              ],
              'circle-color': circleColor,
              'circle-opacity': 0.7,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#991B1B',
              'circle-stroke-opacity': 1,
            }}
          />
        </Source>
      </ReactMap>

      {selectedCountry && (
        <div className='modal-wrapper'>
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
