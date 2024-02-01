import {Ref} from 'react';
import * as classNames from 'classnames';

function Board(props: {
    addToUser: (value: number) => void,
    round: number,
    currentValue: number,
    allowUserInput: boolean,
    forwardRef: Ref<HTMLDivElement>
}) {
    return (
        <div>
            <div ref={props.forwardRef}
                 className="relative grid grid-cols-2 h-56 w-56 rounded-full overflow-hidden initialBoard">
                <button
                    className={classNames('bg-yellow-500 cursor-not-allowed', {'hover:bg-yellow-400 transition !cursor-pointer': props.allowUserInput})}
                    disabled={!props.allowUserInput} onClick={() => props.addToUser(0)}/>
                <button
                    className={classNames('bg-blue-500 cursor-not-allowed', {'hover:bg-blue-400 transition !cursor-pointer': props.allowUserInput})}
                    disabled={!props.allowUserInput}
                    onClick={() => props.addToUser(1)}/>
                <button
                    className={classNames('bg-green-500 cursor-not-allowed', {'hover:bg-green-400 transition !cursor-pointer': props.allowUserInput})}
                    disabled={!props.allowUserInput}
                    onClick={() => props.addToUser(2)}/>
                <button
                    className={classNames('bg-red-500 cursor-not-allowed', {'hover:bg-red-400 transition !cursor-pointer': props.allowUserInput})}
                    disabled={!props.allowUserInput}
                    onClick={() => props.addToUser(3)}/>
                <div
                    className="absolute h-[35px] w-[35px] right-[calc(50%-17.5px)] top-[calc(50%-17.5px)] bg-gray-300 rounded-full align-middle leading-[35px] text-center text-xl">
                    {props.round}
                </div>
            </div>
        </div>
    );
}

export default Board;