import Image from 'next/image';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { ICrime } from './Map';
import React, { useEffect } from 'react';

countries.registerLocale(enLocale);

interface CountryModalProps {
  country: string;
  data: ICrime[];
  onClose: () => void;
}

export default function CountryModal({ country, data, onClose }: CountryModalProps) {
  const countryCode = countries.getAlpha2Code(country, 'en');

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
        <div className='flex items-center justify-center gap-4 mb-6'>
          <h2 className='text-white text-2xl'>{country}</h2>
          <Image
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            alt={`Flag of ${country}`}
            width={64}
            height={64}
          />
        </div>

        <div className='overflow-y-auto flex-1'>
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
                {data.map((crime) => (
                  <tr key={crime.id} className='hover:bg-gray-800/50'>
                    <td className='px-4 py-2 break-words'>{crime.Date}</td>
                    <td className='px-4 py-2 break-words'>{crime['Type of incident']}</td>
                    <td className='px-4 py-2 break-words'>{crime['Bias motivations']}</td>
                    <td className='px-4 py-2 break-words'>{crime.Source}</td>
                    <td className='px-4 py-2 break-words'>{crime.Description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='md:hidden space-y-4'>
            {data.map((crime) => (
              <div key={crime.id} className='bg-gray-800/50 p-4 rounded-lg space-y-2'>
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
        </div>
      </div>
    </div>
  );
}
