import IncidentMap, { ICrime } from './components/Map';
import crimesData from '../../public/data/hcrw_incidents_all-report.json';

interface CrimesData {
  'Report Export': ICrime[];
}
const typedCrimesData = crimesData as CrimesData;

export default function Home() {
  return (
    <div className='min-h-screen relative'>
      <IncidentMap crimes={typedCrimesData?.['Report Export'] || []} />
      <div className='absolute bottom-2 left-2 text-sm text-gray-600'>
        v{process.env.npm_package_version || '1.0.0'}
      </div>
    </div>
  );
}
