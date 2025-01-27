import IncidentMap, { ICrime } from './components/Map';
import crimesData from '../../public/data/hcrw_incidents_all-report.json';
import { Analytics } from '@vercel/analytics/react';

interface CrimesData {
  'Report Export': ICrime[];
}
const typedCrimesData = crimesData as CrimesData;

export default function Home() {
  return (
    <div className='min-h-screen relative'>
      <Analytics />
      <IncidentMap crimes={typedCrimesData?.['Report Export'] || []} />
      <div className='absolute bottom-2 left-2 text-sm text-gray-600'>
        v{process.env.npm_package_version || '1.0.0'}
      </div>
      <a
        href='/about'
        className='fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2'
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
  );
}
