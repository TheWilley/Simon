import { type Ref } from 'react';

function StartScreen(props: {
  start: () => void;
  round: number;
  highscore: number;
  lastScore: number;
  forwardRef: Ref<HTMLButtonElement>;
  notesDelay: number;
  setNotesDelay: (value: number) => void;
}) {
  return (
    <div
      className='fixed text-center text-2xl md:text-3xl overflow-hidden duration-700 ease-in-out '
      style={{
        height: props.round >= 1 ? '0' : '400px',
        opacity: props.round >= 1 ? '0' : '1',
      }}
    >
      <div className='text-white font-bold mb-2 bg-gray-800/50 p-4 rounded-lg'>
        <div className='text-purple-500'>HIGHSCORE: {props.highscore}</div>
        <div className='text-blue-500'>LAST SCORE: {props.lastScore}</div>
      </div>
      <div className='mb-4 bg-gray-800/50 p-4 rounded-lg'>
        <label htmlFor='notes-delay' className='block text-white mb-1 text-lg'>
          Difficulty (Notes Delay): {props.notesDelay}ms
        </label>
        <input
          id='notes-delay'
          type='range'
          min={100}
          max={1200}
          step={100}
          value={props.notesDelay}
          onChange={(e) => props.setNotesDelay(Number(e.target.value))}
          disabled={props.round > 1}
          className='w-64'
        />
        <div className='text-white text-sm'>Hard (100ms) &larr; &rarr; Easy (1200ms)</div>
      </div>
      <button
        ref={props.forwardRef}
        disabled={props.round > 1}
        onClick={() => props.start()}
        className='inline-flex items-center w-full justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg md:text-xl text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
      >
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full'>
          Start
        </span>
      </button>
    </div>
  );
}

export default StartScreen;
