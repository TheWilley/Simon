import { Ref, RefObject, useMemo } from 'react';
import classNames from 'classnames';

function GameBoard(props: {
  addNoteToUserInputs: (value: number) => void;
  round: number;
  allowUserInputs: boolean;
  gameboardRef: Ref<HTMLDivElement>;
  playButtonRefs: RefObject<HTMLButtonElement[]>;
}) {
  const colorClasses = useMemo(
    () => [
      { bg: 'bg-yellow-600', hover: 'hover:bg-yellow-500' },
      { bg: 'bg-blue-600', hover: 'hover:bg-blue-500' },
      { bg: 'bg-green-600', hover: 'hover:bg-green-500' },
      { bg: 'bg-red-600', hover: 'hover:bg-red-500' },
    ],
    []
  );
  const buttons = useMemo(() => Array(4).fill(null), []);

  return (
    <div>
      <div
        ref={props.gameboardRef}
        className='relative grid grid-cols-2 h-56 w-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden transition initialBoard'
        style={{ filter: !props.allowUserInputs ? 'grayscale(40%)' : 'grayscale(0%)' }}
      >
        {buttons.map((_, index) => (
          <button
            key={index}
            ref={(el) => {
              if (el && props.playButtonRefs.current) {
                props.playButtonRefs.current[index] = el;
              }
            }}
            className={classNames(colorClasses[index].bg, {
              [`${colorClasses[index].hover} transition !cursor-pointer`]:
                props.allowUserInputs,
              'cursor-not-allowed': !props.allowUserInputs,
            })}
            disabled={!props.allowUserInputs}
            onClick={() => props.addNoteToUserInputs(index)}
          />
        ))}

        <div className='absolute h-[35px] w-[35px] right-[calc(50%-17.5px)] top-[calc(50%-17.5px)] bg-gray-300 rounded-full align-middle leading-[35px] text-center text-xl'>
          {props.round}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
