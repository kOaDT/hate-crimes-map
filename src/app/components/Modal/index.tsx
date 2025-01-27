import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { ICrime } from '../Map';
import React, { useEffect } from 'react';
import CountryHeader from './CountryHeader';
import DesktopTable from './DesktopTable';
import MobileList from './MobileList';
import CrimesOverTime from './charts/CrimesOverTime';

countries.registerLocale(enLocale);

interface CountryModalProps {
  country: string;
  data: ICrime[];
  onClose: () => void;
}

export default function CountryModal({ country, data, onClose }: CountryModalProps) {
  const countryCode = countries.getAlpha2Code(country, 'en') || '';

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
      className='fixed inset-0 bg-black/40 flex items-center justify-center p-4'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className='relative w-full max-w-8xl bg-black/90 p-6 rounded max-h-[90vh] flex flex-col'>
        <button onClick={onClose} className='absolute right-4 top-4 text-white hover:text-gray-300 text-xl'>
          ✕
        </button>

        <CountryHeader country={country} countryCode={countryCode} />

        <div className='overflow-y-auto flex-1'>
          <CrimesOverTime data={data} />
          <DesktopTable data={data} />
          <MobileList data={data} />
        </div>
      </div>
    </div>
  );
}
