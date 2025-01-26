'use client';

import { useEffect, useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import { countryCoordinates } from '../helpers/countryCoordinates';

export interface ICrime {
  id: string;
  latitude: number;
  longitude: number;
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

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const crimesByCountry = crimes.reduce(
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

  console.log(crimesByCountry);

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
      }}
    >
      <Map
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
      </Map>
    </div>
  );
}
