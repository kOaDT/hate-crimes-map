import Image from 'next/image';

interface CountryHeaderProps {
  country: string;
  countryCode: string;
}

export default function CountryHeader({ country, countryCode }: CountryHeaderProps) {
  return (
    <div className='relative flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-800/50'>
      <div className='absolute inset-0 opacity-5'>
        <svg className='w-full h-full' viewBox='0 0 100 100'>
          <pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'>
            <path d='M 10 0 L 0 0 0 10' fill='none' stroke='currentColor' strokeWidth='0.5' />
          </pattern>
          <rect width='100' height='100' fill='url(#grid)' />
        </svg>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 bg-black/20 blur-md transform translate-y-1'></div>
        <div className='relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-gray-700/50 shadow-lg'>
          <Image
            src={`https://flagsapi.com/${countryCode}/flat/64.png`}
            alt={`Flag of ${country}`}
            width={80}
            height={80}
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      <div className='flex flex-col items-center sm:items-start'>
        <h2 className='text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>
          {country}
        </h2>
        <span className='text-sm text-gray-400 mt-1'>Country Statistics & Data</span>
      </div>
    </div>
  );
}
