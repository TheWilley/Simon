import useGame from './game/useGame.ts';
import GameBoard from './components/GameBoard.tsx';
import StartScreen from './components/StartScreen.tsx';
import GithubCorner from './components/GithubCorner.tsx';

function App() {
  const {
    usesUrlSequence,
    gameBoardRef,
    startButtonRef,
    playButtonRefs,
    allowUserInput,
    round,
    highscore,
    noteDelay,
    lastScore,
    setNoteDelay,
    addNoteToUserInputs,
    start,
  } = useGame();

  return (
    <div className='flex h-full justify-center items-center'>
      <StartScreen
        start={start}
        usesUrlSequence={usesUrlSequence}
        round={round}
        highscore={highscore}
        forwardRef={startButtonRef}
        notesDelay={noteDelay}
        lastScore={lastScore}
        setNotesDelay={setNoteDelay}
      />
      <GameBoard
        addNoteToUserInputs={addNoteToUserInputs}
        round={round}
        allowUserInputs={allowUserInput}
        gameboardRef={gameBoardRef}
        playButtonRefs={playButtonRefs}
      />
      <GithubCorner url='https://github.com/TheWilley/Simon' />
    </div>
  );
}

export default App;
