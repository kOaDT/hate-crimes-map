'use client';

import { useEffect, useState } from 'react';
import IncidentMap, { ICrime } from './components/Map';
import AboutModal from '@/app/components/About/AboutModal';
import Script from 'next/script';

interface CrimesData {
  'Report Export': ICrime[];
}

export default function Home() {
  const [crimes, setCrimes] = useState<ICrime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/hcrw_incidents_all-report.json')
      .then((res) => res.json())
      .then((data: CrimesData) => {
        setCrimes(data?.['Report Export'] || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading crimes data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <AboutModal />
      <div className='min-h-screen relative'>
        <Script data-goatcounter='https://hatecrimemap.goatcounter.com/count' async src='//gc.zgo.at/count.js' />
        {isLoading ? (
          <div className='flex items-center justify-center h-screen bg-black'>
            <div className='text-gray-300'>Loading map data...</div>
          </div>
        ) : (
          <IncidentMap crimes={crimes} />
        )}
        <div className='absolute bottom-2 left-2 text-sm text-gray-300 z-10'>
          v{process.env.npm_package_version || '1.0.0'}
        </div>
        <a
          href='/about'
          className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2 md:left-auto md:right-4 md:transform-none cursor-pointer'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            />
          </svg>
          <span>About</span>
        </a>
      </div>
    </>
  );
}
