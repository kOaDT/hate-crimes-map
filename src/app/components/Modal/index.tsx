import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { ICrime } from '../Map';
import React, { useEffect, useState } from 'react';
import CountryHeader from './CountryHeader';
import DesktopTable from './DesktopTable';
import MobileList from './MobileList';
import CrimesOverTime from './charts/CrimesOverTime';
import BiasMotivationsChart from './charts/BiasMotivationsChart';
import AttackTypesChart from './charts/AttackTypesChart';
import SourcesChart from './charts/SourcesChart';
import BiasMotivationsOverTime from './charts/BiasMotivationsOverTime';
import ChartFilters from './ChartFilters';

countries.registerLocale(enLocale);

interface CountryModalProps {
  country: string;
  data: ICrime[];
  onClose: () => void;
}

export default function CountryModal({ country, data, onClose }: CountryModalProps) {
  const countryCode = countries.getAlpha2Code(country, 'en') || '';
  const [filters, setFilters] = useState({
    crimesOverTime: true,
    biasMotivations: true,
    attackTypes: true,
    sources: true,
    biasMotivationsOverTime: true,
  });

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 bg-black/40 flex items-center justify-center md:p-4 cursor-pointer'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className='relative w-full h-full md:h-auto md:max-h-[90vh] max-w-[95rem] bg-black/90 p-4 sm:p-6 md:rounded-lg flex flex-col overflow-hidden'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer'
          aria-label='Close modal'
        >
          <svg
            className='w-5 h-5 text-white'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </button>

        <CountryHeader country={country} countryCode={countryCode} />

        <div className='overflow-y-auto flex-1 mt-6'>
          <ChartFilters filters={filters} onChange={handleFilterChange} />

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
            {filters.crimesOverTime && <CrimesOverTime data={data} />}
            {filters.biasMotivations && <BiasMotivationsChart data={data} />}
            {filters.attackTypes && <AttackTypesChart data={data} />}
            {filters.sources && <SourcesChart data={data} />}
          </div>
          {filters.biasMotivationsOverTime && <BiasMotivationsOverTime data={data} />}
          <div className='mt-4'>
            <DesktopTable data={data} />
            <MobileList data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
