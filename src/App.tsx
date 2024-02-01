import useGame from './game/useGame.ts';
import GameBoard from './components/GameBoard.tsx';
import StartScreen from './components/StartScreen.tsx';

function App() {
  const {
    allowUserInput,
    currentNoteInSequence,
    gameBoardRef,
    startButtonRef,
    round,
    highscore,
    addNoteToUserInputs,
    start,
  } = useGame();

  return (
    <div className='flex h-full justify-center items-center'>
      <StartScreen
        start={start}
        round={round}
        highscore={highscore}
        forwardRef={startButtonRef}
      />
      <GameBoard
        addNoteToUserInputs={addNoteToUserInputs}
        round={round}
        currentNoteInSequence={currentNoteInSequence}
        allowUserInputs={allowUserInput}
        forwardRef={gameBoardRef}
      />
    </div>
  );
}

export default App;
