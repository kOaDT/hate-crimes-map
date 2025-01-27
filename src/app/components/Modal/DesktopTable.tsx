import { ICrime } from '../Map';
import { useState } from 'react';

interface SortConfig {
  key: keyof ICrime;
  direction: 'asc' | 'desc';
}

export default function DesktopTable({ data }: { data: ICrime[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'Date', direction: 'desc' });
  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === 'Date') {
      const dateA = new Date(a[sortConfig.key]).getTime();
      const dateB = new Date(b[sortConfig.key]).getTime();
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    const valueA = a[sortConfig.key] || '';
    const valueB = b[sortConfig.key] || '';
    return sortConfig.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: keyof ICrime) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIcon = ({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) => (
    <svg
      className={`w-4 h-4 inline-block ml-1 transition-transform ${
        active ? 'text-indigo-400' : 'text-gray-600'
      } ${direction === 'desc' ? 'transform rotate-180' : ''}`}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
    </svg>
  );

  return (
    <div className='hidden md:flex md:flex-col gap-4'>
      <h3 className='text-white text-lg font-medium'>Detailed Incidents Data</h3>
      <div className='rounded-lg border border-gray-700 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm text-gray-300'>
            <thead className='bg-gray-800 text-xs uppercase text-gray-400'>
              <tr>
                {['Date', 'Type of incident', 'Bias motivations', 'Source', 'Description'].map((header) => (
                  <th
                    key={header}
                    onClick={() => handleSort(header as keyof ICrime)}
                    className='px-4 py-3 font-medium cursor-pointer hover:bg-gray-700 transition-colors'
                  >
                    <span className='flex items-center'>
                      {header}
                      <SortIcon active={sortConfig.key === header} direction={sortConfig.direction} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {currentData.map((crime, idx) => (
                <tr key={`${crime.Date}-${idx}`} className='bg-gray-800/50 hover:bg-gray-700/50 transition-colors'>
                  <td className='px-4 py-3 whitespace-nowrap'>{crime.Date}</td>
                  <td className='px-4 py-3'>{crime['Type of incident']}</td>
                  <td className='px-4 py-3'>{crime['Bias motivations']}</td>
                  <td className='px-4 py-3'>{crime.Source}</td>
                  <td className='px-4 py-3 max-w-md'>{crime.Description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-400'>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </span>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className='px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors'
          >
            Previous
          </button>
          <span className='px-3 py-1 text-gray-300'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className='px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
