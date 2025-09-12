import useGame from './game/useGame.ts';
import GameBoard from './components/GameBoard.tsx';
import StartScreen from './components/StartScreen.tsx';

function App() {
  const {
    gameBoardRef,
    startButtonRef,
    playButtonRefs,
    allowUserInput,
    round,
    highscore,
    noteDelay,
    setNoteDelay,
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
        notesDelay={noteDelay}
        setNotesDelay={setNoteDelay}
      />
      <GameBoard
        addNoteToUserInputs={addNoteToUserInputs}
        round={round}
        allowUserInputs={allowUserInput}
        gameboardRef={gameBoardRef}
        playButtonRefs={playButtonRefs}
      />
    </div>
  );
}

export default App;
