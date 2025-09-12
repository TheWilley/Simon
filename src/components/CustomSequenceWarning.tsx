function CustomSequenceWarning() {
  return (
    <div className='flex items-center gap-2 text-sm bg-blue-200 text-blue-900 px-3 py-2 rounded-md mb-2 '>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
        className='w-5 h-5 flex-shrink-0'
        fill='currentColor'
      >
        {/* Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
        <path d='M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z' />
      </svg>

      <span>
        You're using a{' '}
        <a
          href='https://github.com/TheWilley/Simon?tab=readme-ov-file#custom-sequences'
          className='text-blue-600 underline hover:text-blue-800 transition-colors'
          target='_blank'
          rel='noopener noreferrer'
        >
          custom sequence
        </a>
        , click{' '}
        <a
          href='/'
          className='text-blue-600 underline hover:text-blue-800 transition-colors'
          rel='noopener noreferrer'
        >
          here
        </a>{' '}
        to use a random sequence.
      </span>
    </div>
  );
}

export default CustomSequenceWarning;
