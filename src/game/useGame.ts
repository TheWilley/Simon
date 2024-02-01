import { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useSound from 'use-sound';
import boop from '../sounds/boop.mp3';
import loose from '../sounds/loose.mp3';
import win from '../sounds/win.mp3';
import { useLocalStorage } from '@uidotdev/usehooks';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqualSoFar<T>(arr1: T[], arr2: T[]) {
  return JSON.stringify(arr2.slice(0, arr1.length)) === JSON.stringify(arr1);
}

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function useGame() {
  // REFS
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  // STATES
  const [highscore, setHighscore] = useLocalStorage('highscore', 0);
  const [allowUserInput, setAllowUserInput] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentNoteInSequence, setCurrentNoteInSequence] = useState<{ value: number }>({
    value: 0,
  });
  const [round, setRound] = useState<number>(1);
  const [generatedNotes, setgeneratedNotes] = useState<number[]>([]);
  const [userNotes, setUserNotes] = useState<number[]>([]);
  const [gameIsWon, setGameIsWon] = useState<boolean>(true);
  const [playbackRate, setPlaybackrate] = useState<number>(0.75);

  // HOOKS
  const [boopSound] = useSound(boop, {
    volume: 0.5,
    playbackRate,
    interrupt: true,
  });

  const [looseSound] = useSound(loose, { volume: 0.5 });
  const [winSound] = useSound(win, { volume: 0.3 });

  // Class specifics - used for animation
  const animationsHandler = {
    showBoard: () => {
      gameBoardRef.current?.classList.remove('initialBoard');
      startButtonRef.current?.classList.remove('fadeIn');
      startButtonRef.current?.classList.add('fadeOut');
      gameBoardRef.current?.classList.remove('tableflip');
      gameBoardRef.current?.classList.add('reverseTableflip');
    },
    showStart: () => {
      gameBoardRef.current?.classList.remove('reverseTableflip');
      gameBoardRef.current?.classList.add('tableflip');
      startButtonRef.current?.classList.remove('fadeOut');
      startButtonRef.current?.classList.add('fadeIn');
    },
  };

  /**
   * Simulates "play" of the generated number sequence by
   * playing and displaying each note after 500ms.
   */
  const playNotes = async () => {
    setAllowUserInput(false);
    for (const value of generatedNotes) {
      await delay(1000);
      setCurrentNoteInSequence({ value });
      setPlaybackrate(1 + value * 0.3);
      boopSound();
    }
    await delay(500);
    setAllowUserInput(true);
  };

  /**
   * Adds a random value between 0 and 3 to the sequence state.
   */
  const addRandomNoteToSequence = useCallback(() => {
    const pickedColor = getRandomInt(0, 3);
    setgeneratedNotes([...generatedNotes, pickedColor]);
  }, [generatedNotes]);

  /**
   * Adds a value to the user inputs state and play the associated note.
   */
  const addNoteToUserInputs = useCallback(
    (value: number) => {
      setUserNotes([...userNotes, value]);
      setPlaybackrate(1 + value * 0.3);
    },
    [boopSound, userNotes]
  );

  /**
   * Starts the game.
   */
  const start = useCallback(() => {
    setGameStarted(true);
    addRandomNoteToSequence();
    animationsHandler.showBoard();
  }, []);

  /**
   * Resets the game states.
   */
  const resetGame = useCallback(() => {
    setGameStarted(false);
    setgeneratedNotes([]);
    setUserNotes([]);
    setCurrentNoteInSequence({ value: -1 });
    setGameIsWon(true);
    animationsHandler.showStart();
    setRound(1);
  }, []);

  /**
   * Every time the sequence state is updated, we run the `play` function.
   */
  useEffect(() => {
    playNotes();
  }, [JSON.stringify(generatedNotes)]);

  /**
   * Every time the user presses a note, we check if it's the correct one
   * and if we can move on to the next round.
   */
  useEffect(() => {
    if (generatedNotes.length > 0) {
      const gameCanContinue = arraysAreEqualSoFar(userNotes, generatedNotes);
      setGameIsWon(gameCanContinue);

      // If we should play loose or win sound
      if (gameCanContinue) {
        boopSound();
      } else {
        looseSound();
      }

      // Check if we can continue to the next round
      if (userNotes.length === generatedNotes.length && gameCanContinue) {
        addRandomNoteToSequence();
        setUserNotes([]);
        setRound(round + 1);
        winSound();
      }
    }
  }, [JSON.stringify(userNotes)]);

  /**
   * Checks if the game is lost, and resets game if it is.
   */
  useEffect(() => {
    if (!gameIsWon) {
      if (round > highscore) setHighscore(round);
      resetGame();
    }
  }, [gameIsWon]);

  return {
    gameBoardRef,
    startButtonRef,
    allowUserInput,
    gameStarted,
    round,
    highscore,
    currentNoteInSequence,
    addRandomNoteToSequence,
    addNoteToUserInputs,
    start,
  };
}
