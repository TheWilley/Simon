import useGame from './game/useGame.ts';
import GameBoard from './components/GameBoard.tsx';
import StartButton from './components/StartButton.tsx';

function App() {
    const {
        allowUserInput,
        currentNoteInSequence,
        gameBoardRef,
        startButtonRef,
        round,
        addNoteToUserInputs,
        start
    } = useGame();

    return (
        <div className="flex h-full justify-center items-center">
            <StartButton start={start} round={round} forwardRef={startButtonRef}/>
            <GameBoard addNoteToUserInputs={addNoteToUserInputs} round={round}
                       currentNoteInSequence={currentNoteInSequence}
                       allowUserInputs={allowUserInput}
                       forwardRef={gameBoardRef}/>
        </div>
    );
}

export default App;
