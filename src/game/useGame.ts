import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import useSound from 'use-sound';
import boop from '../sounds/boop.mp3';
import loose from '../sounds/loose.mp3';
import win from '../sounds/win.mp3';
import { useLocalStorage } from '@uidotdev/usehooks';
import { delay, arraysAreEqualSoFar } from '../utils/utils';
import { gameReducer, initialGameState } from './gameReducer';
import { useGameAnimations } from './animations';

export default function useGame() {
  // REFS
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const playButtonRefs = useRef<HTMLButtonElement[]>([]);

  // ANIMATION HANDLER
  const animationsHandler = useGameAnimations(gameBoardRef, startButtonRef);

  // PERSISTED HIGH SCORE
  const [highscore, setHighscore] = useLocalStorage('highscore', 0);

  // NON-PERSISTED LAST SCORE
  const [lastScore, setLastScore] = useState(0);

  // GAME REDUCER (sequence + user inputs + round + current note + win flag)
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // CONTROL STATES
  const [allowUserInput, setAllowUserInput] = useState<boolean>(false);
  const [noteDelay, setNoteDelay] = useState<number>(1000);

  const [boopSound] = useSound(boop, { volume: 0.5, interrupt: true });
  const [looseSound] = useSound(loose, { volume: 0.5 });
  const [winSound] = useSound(win, { volume: 0.3 });

  /**
   * Play the generated sequence.
   */
  const playNotes = useCallback(async () => {
    setAllowUserInput(false);
    for (const value of state.generatedNotes) {
      await delay(noteDelay);
      // flash note here instead of in GameBoard
      animationsHandler.flash(playButtonRefs.current[value]);
      const rate = 1 + value * 0.3;
      boopSound({ playbackRate: rate });
    }
    await delay(500);
    setAllowUserInput(true);
  }, [state.generatedNotes, noteDelay, playButtonRefs, boopSound]);

  /**
   * Add user's pressed note (fires when the user physically presses a pad).
   */
  const addNoteToUserInputs = useCallback(
    (value: number) => {
      dispatch({ type: 'ADD_USER_NOTE', value });
      const rate = 1 + value * 0.3;
      boopSound({ playbackRate: rate });
    },
    [boopSound]
  );

  /**
   * Convenience: dispatch an action to add a note.
   */
  const addNoteToSequence = useCallback(() => {
    dispatch({ type: 'ADD_RANDOM_NOTE' });
  }, []);

  /**
   * Start game UI + seed the first note.
   */
  const start = useCallback(() => {
    setAllowUserInput(false);
    animationsHandler.showBoard();
    dispatch({ type: 'NEXT_ROUND' });

    delay(1000 - noteDelay).then(() => addNoteToSequence());
  }, [addNoteToSequence, animationsHandler, noteDelay]);

  /**
   * Reset game to initial values.
   */
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
    animationsHandler.showStart();
  }, [animationsHandler]);

  // When the sequence changes, play it back
  useEffect(() => {
    if (state.generatedNotes.length > 0) playNotes();
  }, [state.generatedNotes, playNotes]);

  // Whenever the user adds input, check correctness and progress/win/lose
  useEffect(() => {
    if (state.generatedNotes.length === 0) return;

    const gameCanContinue = arraysAreEqualSoFar(state.userNotes, state.generatedNotes);

    if (!gameCanContinue) {
      looseSound();
      if (state.round > highscore) {
        setHighscore(state.round);
      }
      setLastScore(state.round);
      resetGame();
    } else {
      // If user finished the sequence correctly, progress to next round
      if (state.userNotes.length === state.generatedNotes.length && gameCanContinue) {
        winSound();
        addNoteToSequence();
        dispatch({ type: 'NEXT_ROUND' });
      }
    }
  }, [
    state.userNotes,
    state.generatedNotes,
    looseSound,
    winSound,
    state.round,
    highscore,
    resetGame,
    setHighscore,
    addNoteToSequence,
  ]);

  return {
    gameBoardRef,
    startButtonRef,
    playButtonRefs,
    allowUserInput,
    round: state.round,
    lastScore,
    highscore,
    noteDelay,
    setNoteDelay,
    addNoteToUserInputs,
    start,
  };
}
