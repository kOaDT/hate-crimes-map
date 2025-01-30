import Link from 'next/link';
import AboutContent from '@/app/components/About/AboutContent';

export default function About() {
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <AboutContent />

        <div className='mt-12'>
          <Link href='/' className='inline-flex items-center text-blue-600 hover:text-blue-800'>
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            Back to Map
          </Link>
        </div>
      </div>
    </div>
  );
}
