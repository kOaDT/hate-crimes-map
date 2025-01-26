import IncidentMap, { ICrime } from './components/Map';
import crimesData from '../../public/data/hcrw_incidents_all-report.json';

interface CrimesData {
  'Report Export': ICrime[];
}
const typedCrimesData = crimesData as CrimesData;

export default function Home() {
  return (
    <div>
      <IncidentMap crimes={typedCrimesData?.['Report Export'] || []} />
    </div>
  );
}
