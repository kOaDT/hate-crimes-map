import { ICrime } from '../Map';
import { useState } from 'react';

export default function DesktopTable({ data }: { data: ICrime[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className='hidden md:block'>
      <table className='w-full text-white table-fixed'>
        <thead className='bg-gray-800'>
          <tr>
            <th className='px-4 py-2 text-left w-[15%]'>Date</th>
            <th className='px-4 py-2 text-left w-[15%]'>Type</th>
            <th className='px-4 py-2 text-left w-[20%]'>Bias Motivations</th>
            <th className='px-4 py-2 text-left w-[15%]'>Source</th>
            <th className='px-4 py-2 text-left w-[35%]'>Description</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-700'>
          {currentData.map((crime, idx) => (
            <tr key={`${crime.Date}-${idx}`} className='hover:bg-gray-800/50'>
              <td className='px-4 py-2 break-words'>{crime.Date}</td>
              <td className='px-4 py-2 break-words'>{crime['Type of incident']}</td>
              <td className='px-4 py-2 break-words'>{crime['Bias motivations']}</td>
              <td className='px-4 py-2 break-words'>{crime.Source}</td>
              <td className='px-4 py-2 break-words'>{crime.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-center gap-2 mt-4'>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50'
        >
          Previous
        </button>
        <span className='px-4 py-2'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
}
