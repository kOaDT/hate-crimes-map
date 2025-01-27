import Link from 'next/link';

export default function About() {
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>About This Project</h1>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Project Purpose</h2>
          <p className='text-gray-600 mb-4'>
            This project aims to visualize hate crime data to bring visibility to crimes that are often invisible or
            normalized by society. By making this data accessible and visual, we hope to raise awareness and contribute
            to a better understanding of these issues.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Data Source</h2>
          <p className='text-gray-600 mb-4'>
            The data displayed on this map comes from the OSCE (Organization for Security and Co-operation in Europe)
            Hate Crime Database. You can find the original data at:{' '}
            <a
              href='https://hatecrime.osce.org/hate-crime-data'
              className='text-blue-600 hover:text-blue-800 underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              hatecrime.osce.org/hate-crime-data
            </a>
          </p>
          <div className='w-full h-[600px] mt-4 border border-gray-200 rounded-lg overflow-hidden'>
            <iframe
              src='https://hatecrime.osce.org/sites/default/files/2024-11/2023%20Hate%20Crime%20Data%20Findings_FINAL_for%20PPT%20and%20PDF_1811%20%281%29.pdf'
              className='w-full h-full'
              title='2023 Hate Crime Data Findings'
            />
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Data Interpretation Notice</h2>
          <p className='text-gray-600 mb-4'>
            Please note that this data should be interpreted with caution. The data only includes participating OSCE
            member states and the number and nature of reported hate crimes can vary significantly between countries due
            to:
          </p>
          <ul className='list-disc list-inside text-gray-600 mb-4 ml-4'>
            <li>Limited geographical coverage (OSCE participating states only)</li>
            <li>Varying levels of freedom of expression</li>
            <li>Different reporting mechanisms and practices</li>
            <li>Cultural and social factors affecting reporting</li>
          </ul>
          <blockquote className='border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4'>
            In this regard, ODIHR observes that many gaps remain in the prosecution of hate crimes. Incomplete or
            inadequate legislation is a major obstacle for prosecutors, and means that some hate crimes are not
            investigated as such or are incorrectly prosecuted as &quot;hate speech&quot; offences. This can render hate
            crimes invisible, leaving victims without support or access to their rights and leading to misinformed
            policy and legal responses
            <footer className='mt-2 text-sm'>
              <cite>
                <a
                  href='https://hatecrime.osce.org/hate-crime-data'
                  className='text-blue-600 hover:text-blue-800 underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  OSCE Hate Crime Data
                </a>
              </cite>
            </footer>
          </blockquote>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Privacy Policy</h2>
          <p className='text-gray-600 mb-4'>
            We are committed to protecting your privacy. This website does not collect any personal data from its
            visitors. We do not use cookies or any other tracking mechanisms.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Hosting</h2>
          <p className='text-gray-600 mb-4'>This website is hosted on Vercel.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Open Source Project</h2>
          <p className='text-gray-600 mb-4'>
            This is an open-source project built with Next.js, TypeScript, Tailwind CSS and Mapbox. You are welcome to
            contribute! You can find the source code and contribution guidelines on our GitHub repository:{' '}
            <a
              href='https://github.com/kOaDT/hate-crimes-map'
              className='text-blue-600 hover:text-blue-800 underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub Repository
            </a>
          </p>
        </section>

        <section className='mb-8'>
          <p className='text-gray-600 mb-4'>
            {new Date().getFullYear()} - v{process.env.npm_package_version || '1.0.0'}
          </p>
        </section>

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
