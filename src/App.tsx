import useGame from './game/useGame.ts';
import Board from './components/Board.tsx';
import ConditionalRender from './components/ConditionalRender.tsx';

function App() {
    const {gameStarted, allowUserInput, currentValue, boardRef, round, addToUser, start} = useGame();

    return (
        <div className="flex h-full justify-center items-center">
            <ConditionalRender condition={!gameStarted}>
                <button disabled={round > 0}
                        onClick={() => start()}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span
                            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Start
                        </span>
                </button>
            </ConditionalRender>

            <ConditionalRender condition={gameStarted}>
                <Board addToUser={addToUser} round={round} currentValue={currentValue} allowUserInput={allowUserInput} boardRef={boardRef}/>
            </ConditionalRender>
        </div>
    );
}

export default App;
