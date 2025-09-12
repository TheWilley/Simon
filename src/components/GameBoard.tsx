import { Ref, RefObject } from 'react';
import classNames from 'classnames';

function GameBoard(props: {
  addNoteToUserInputs: (value: number) => void;
  round: number;
  allowUserInputs: boolean;
  gameboardRef: Ref<HTMLDivElement>;
  playButtonRefs: RefObject<HTMLButtonElement[]>;
}) {
  const buttonConfigs = [
    { color: 'yellow', index: 0 },
    { color: 'blue', index: 1 },
    { color: 'green', index: 2 },
    { color: 'red', index: 3 },
  ];

  return (
    <div>
      <div
        ref={props.gameboardRef}
        className='relative grid grid-cols-2 h-56 w-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden transition initialBoard'
        style={{ filter: !props.allowUserInputs ? 'grayscale(40%)' : 'grayscale(0%)' }}
      >
        {buttonConfigs.map(({ color, index }) => (
          <button
            key={index}
            ref={(el) => {
              if (el && props.playButtonRefs.current) {
                props.playButtonRefs.current[index] = el;
              }
            }}
            className={classNames(`bg-${color}-600 cursor-not-allowed`, {
              [`hover:bg-${color}-500 transition !cursor-pointer`]: props.allowUserInputs,
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
