import { Ref, useEffect, useRef } from 'react';
import classNames from 'classnames';

function GameBoard(props: {
  addNoteToUserInputs: (value: number) => void;
  round: number;
  currentNoteInSequence: { value: number };
  allowUserInputs: boolean;
  forwardRef: Ref<HTMLDivElement>;
}) {
  const toggleFlash = (button: HTMLButtonElement | null) => {
    if (button) {
      button.classList.remove('flash');

      void button.offsetWidth;

      button.classList.add('flash');
    }
  };

  const buttons = {
    button0: useRef(null),
    button1: useRef(null),
    button2: useRef(null),
    button3: useRef(null),
  };

  useEffect(() => {
    switch (props.currentNoteInSequence.value) {
      case 0: {
        toggleFlash(buttons.button0.current);
        break;
      }
      case 1: {
        toggleFlash(buttons.button1.current);
        break;
      }
      case 2: {
        toggleFlash(buttons.button2.current);
        break;
      }
      case 3: {
        toggleFlash(buttons.button3.current);
        break;
      }
    }
  }, [props.currentNoteInSequence]);

  return (
    <div>
      <div
        ref={props.forwardRef}
        className='relative grid grid-cols-2 h-56 w-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden transition initialBoard'
        style={{ filter: !props.allowUserInputs ? 'grayscale(40%)' : 'grayscale(0%)' }}
      >
        <button
          ref={buttons.button0}
          className={classNames('bg-yellow-600 cursor-not-allowed', {
            'hover:bg-yellow-500 transition !cursor-pointer': props.allowUserInputs,
          })}
          disabled={!props.allowUserInputs}
          onClick={() => props.addNoteToUserInputs(0)}
        />
        <button
          ref={buttons.button1}
          className={classNames('bg-blue-600 cursor-not-allowed', {
            'hover:bg-blue-500 transition !cursor-pointer': props.allowUserInputs,
          })}
          disabled={!props.allowUserInputs}
          onClick={() => props.addNoteToUserInputs(1)}
        />
        <button
          ref={buttons.button2}
          className={classNames('bg-green-600 cursor-not-allowed', {
            'hover:bg-green-500 transition !cursor-pointer': props.allowUserInputs,
          })}
          disabled={!props.allowUserInputs}
          onClick={() => props.addNoteToUserInputs(2)}
        />
        <button
          ref={buttons.button3}
          className={classNames('bg-red-600 cursor-not-allowed', {
            'hover:bg-red-500 transition !cursor-pointer': props.allowUserInputs,
          })}
          disabled={!props.allowUserInputs}
          onClick={() => props.addNoteToUserInputs(3)}
        />
        <div className='absolute h-[35px] w-[35px] right-[calc(50%-17.5px)] top-[calc(50%-17.5px)] bg-gray-300 rounded-full align-middle leading-[35px] text-center text-xl'>
          {props.round}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
