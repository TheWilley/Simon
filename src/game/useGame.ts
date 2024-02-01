import {useEffect, useRef, useState} from 'react';
import useSound from 'use-sound';
import dial from '../sounds/dial.mp3';
import startButton from '../components/StartButton.tsx';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function arraysAreEqualSoFar<T>(arr1: T[], arr2: T[]) {
    return JSON.stringify(arr2.slice(0, arr1.length)) === JSON.stringify(arr1);
}

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default function useGame() {
    const boardRef = useRef<HTMLDivElement>(null);
    const startButtonRef = useRef<HTMLButtonElement>(null);
    const [allowUserInput, setAllowUserInput] = useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<number>(-1);
    const [round, setRound] = useState<number>(0);
    const [sequence, setSequence] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const [gameIsNotLost, setGameIsNotLost] = useState<boolean>(true);
    const [playbackRate, setPlaybackrate] = useState<number>(0.75);
    const [play] = useSound(dial, {
        playbackRate
    });

    // SOUND
    const playSequence = async () => {
        setAllowUserInput(false);
        for (const value of sequence) {
            await delay(1000);
            setCurrentValue(value);
            setPlaybackrate(1 + value * 0.3);
            play();
        }
        setAllowUserInput(true);
    };

    // LOGIC
    const addToSequence = () => {
        const pickedColor = getRandomInt(0, 3);
        setSequence([...sequence, pickedColor]);
    };

    const addToUser = (value: number) => {
        setUserInput([...userInput, value]);
        setPlaybackrate(1 + value * 0.3);
        play();
    };

    const start = () => {
        setGameStarted(true);
        boardRef.current.classList.remove('initialBoard')
        startButtonRef.current.classList.remove('fadeIn')
        startButtonRef.current.classList.add('fadeOut')
        boardRef.current.classList.remove('tableflip');
        boardRef.current.classList.add('reverseTableflip')
        addToSequence();
    };

    const resetGame = () => {
        setGameStarted(false);
        setRound(0);
        setSequence([]);
        setUserInput([]);
        setCurrentValue(-1)
        setGameIsNotLost(true);
    };

    useEffect(() => {
        playSequence();
    }, [JSON.stringify(sequence)]);

    useEffect(() => {
        if (sequence.length > 0) {
            const gameIsLost = arraysAreEqualSoFar(userInput, sequence);
            setGameIsNotLost(gameIsLost);
            if (userInput.length === sequence.length && gameIsLost) {
                addToSequence();
                setUserInput([]);
                setRound(round + 1);
            }
        }
    }, [JSON.stringify(userInput)]);


    useEffect(() => {
        if (!gameIsNotLost) {
            resetGame();
            boardRef.current.classList.remove('reverseTableflip')
            boardRef.current.classList.add('tableflip');
            startButtonRef.current.classList.remove('fadeOut')
            startButtonRef.current.classList.add('fadeIn')
        }
    }, [gameIsNotLost]);

    return {
        boardRef,
        startButtonRef,
        allowUserInput,
        gameStarted,
        round,
        currentValue,
        addToSequence,
        addToUser,
        start
    };
}