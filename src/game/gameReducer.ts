import { getRandomInt } from '../utils/utils';

export interface GameState {
  generatedNotes: number[];
  userNotes: number[];
  round: number;
}

export type GameAction =
  | { type: 'ADD_RANDOM_NOTE' }
  | { type: 'ADD_MANUAL_NOTE'; value: number }
  | { type: 'ADD_USER_NOTE'; value: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const initialGameState: GameState = {
  generatedNotes: [],
  userNotes: [],
  round: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_RANDOM_NOTE':
      return {
        ...state,
        generatedNotes: [...state.generatedNotes, getRandomInt(0, 3)],
      };

    case 'ADD_MANUAL_NOTE':
      return {
        ...state,
        generatedNotes: [...state.generatedNotes, action.value],
      };

    case 'ADD_USER_NOTE':
      return {
        ...state,
        userNotes: [...state.userNotes, action.value],
      };

    case 'NEXT_ROUND':
      return {
        ...state,
        userNotes: [],
        round: state.round + 1,
      };

    case 'RESET':
      return { ...initialGameState };

    default:
      return state;
  }
}
