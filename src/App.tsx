import useGame from './game/useGame.ts';
import Board from './components/Board.tsx';
import StartButton from './components/StartButton.tsx';

function App() {
    const {gameStarted, allowUserInput, currentValue, boardRef, round, addToUser, start} = useGame();

    return (
        <div className="flex h-full justify-center items-center">
            <StartButton start={start} round={round} />
            <Board addToUser={addToUser} round={round} currentValue={currentValue} allowUserInput={allowUserInput}
                   boardRef={boardRef}/>
        </div>
    );
}

export default App;
