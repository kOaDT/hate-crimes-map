import { ICrime } from '../Map';

export default function MobileList({ data }: { data: ICrime[] }) {
  return (
    <div className='md:hidden space-y-4'>
      {data.map((crime, idx) => (
        <div key={`${crime.Date}-${idx}`} className='bg-gray-800/50 p-4 rounded-lg space-y-2'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='text-gray-400'>Date:</div>
            <div>{crime.Date}</div>

            <div className='text-gray-400'>Type:</div>
            <div>{crime['Type of incident']}</div>

            <div className='text-gray-400'>Bias Motivations:</div>
            <div>{crime['Bias motivations']}</div>

            <div className='text-gray-400'>Source:</div>
            <div>{crime.Source}</div>
          </div>

          <div>
            <div className='text-gray-400 mb-1'>Description:</div>
            <div>{crime.Description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
