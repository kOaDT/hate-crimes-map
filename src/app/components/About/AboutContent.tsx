export default function AboutContent() {
  return (
    <div className='about-content'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>About This Project</h1>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Project Purpose</h2>
        <p className='text-gray-600 mb-4'>
          This project aims to visualize hate crime data to bring visibility to crimes that are often invisible or
          normalized by society. By making this data accessible and visual, we hope to contribute to a better
          understanding of these issues.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Data Source</h2>
        <p className='text-gray-600 mb-4'>
          The data displayed on this map comes from the ODIHR (Office for Democratic Institutions and Human Rights) Hate
          Crime Database. You can find the original data at:{' '}
          <a
            href='https://hatecrime.osce.org/hate-crime-data'
            className='text-blue-600 hover:text-blue-800 underline cursor-pointer'
            target='_blank'
            rel='noopener noreferrer'
          >
            hatecrime.osce.org/hate-crime-data
          </a>
        </p>
        {
          <div className='w-full h-[600px] mt-4 border border-gray-200 rounded-lg overflow-hidden'>
            <iframe
              src='https://hatecrime.osce.org/sites/default/files/2026-11/2025%20Hate%20Crime%20Data%20Findings_FINAL_0.pdf'
              className='w-full h-full'
              title='2025 Hate Crime Data Findings'
            />
          </div>
        }
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Data Interpretation Notice</h2>
        <p className='text-gray-600 mb-4'>
          Please note that this data should be interpreted with caution. The data only includes participating OSCE
          member states and the number and nature of reported hate crimes can vary significantly between countries.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Privacy Policy</h2>
        <p className='text-gray-600 mb-4'>
          This website does not collect any personal data from its visitors. We do not use cookies or any other tracking
          mechanisms.
        </p>
      </section>

      <section>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Hosting</h2>
        <p className='text-gray-600 mb-4'>This website is hosted on Netlify.</p>
      </section>

      <section className='mb-8'>
        <p className='text-gray-600 mb-4'>
          {new Date().getFullYear()} - v{process.env.npm_package_version || '1.0.0'}
        </p>
      </section>
    </div>
  );
}
