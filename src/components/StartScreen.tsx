import {Ref} from 'react';

function StartScreen(props: {
    start: () => void,
    round: number,
    highscore: number,
    forwardRef: Ref<HTMLButtonElement>
}) {
    return (
        <div className='fixed text-center text-2xl md:text-3xl'>
            <div className='text-white font-bold mb-2'> HIGHSCORE: {props.highscore} </div>
            <button ref={props.forwardRef} disabled={props.round > 0}
                    onClick={() => props.start()}
                    className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg md:text-xl text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
            <span
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Start
            </span>
            </button>
        </div>
    );
}

export default StartScreen;