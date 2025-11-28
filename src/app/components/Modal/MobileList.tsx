import { ICrime } from '../Map';
import { useState } from 'react';

interface MobileListProps {
  data: ICrime[];
}

export default function MobileList({ data }: MobileListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className='md:hidden space-y-4'>
      <h3 className='text-white text-lg font-medium mb-4'>Detailed Incidents Data</h3>

      <div className='space-y-4'>
        {currentData.map((crime, idx) => (
          <div
            key={`${crime.Date}-${idx}`}
            className='bg-gray-800/50 p-4 rounded-lg space-y-3 border border-gray-700/50 hover:border-gray-600/50 transition-colors'
          >
            <div className='flex justify-between items-center border-b border-gray-700 pb-2'>
              <span className='text-indigo-400 font-medium'>{formatDate(crime.Date)}</span>
              <span className='text-sm px-2 py-1 text-gray-300'>{crime['Type of incident']}</span>
            </div>

            <div className='space-y-2'>
              <div>
                <label className='text-gray-400 text-sm'>Bias Motivations:</label>
                <p className='text-gray-200'>{crime['Bias motivations']}</p>
              </div>

              <div>
                <label className='text-gray-400 text-sm'>Source:</label>
                <p className='text-gray-200'>{crime.Source}</p>
              </div>

              <div>
                <label className='text-gray-400 text-sm'>Description:</label>
                <p className='text-gray-200 text-sm leading-relaxed'>{crime.Description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='sticky bottom-0 bg-gray-900/95 backdrop-blur-sm p-4 rounded-lg border border-gray-800 mt-6'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <span className='text-sm text-gray-400'>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </span>

          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className='px-4 py-2 rounded-full bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer'
            >
              Previous
            </button>
            <span className='flex items-center px-4 text-gray-300 text-sm'>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className='px-4 py-2 rounded-full bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
