'use client';

import { useEffect, useState } from 'react';
import Map, { MapRef } from 'react-map-gl';

export default function MapComponent() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        mapStyle='mapbox://styles/mapbox/streets-v11'
        reuseMaps
        interactiveLayerIds={loaded ? undefined : []}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
