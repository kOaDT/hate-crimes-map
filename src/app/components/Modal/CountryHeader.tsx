import Image from 'next/image';

interface CountryHeaderProps {
  country: string;
  countryCode: string;
}

export default function CountryHeader({ country, countryCode }: CountryHeaderProps) {
  return (
    <div className='flex items-center justify-center gap-4 mb-6'>
      <h2 className='text-white text-2xl'>{country}</h2>
      <Image
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        alt={`Flag of ${country}`}
        width={64}
        height={64}
      />
    </div>
  );
}
