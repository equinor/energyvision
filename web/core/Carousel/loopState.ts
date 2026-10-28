export const CAROUSEL_TRANSITION_MS = 800;
export const AUTO_ROTATION_MS = 6000;

export type Direction = -1 | 1;
export type LoopState = {
  index: number;
  direction: Direction;
  phase: 'idle' | 'preparing' | 'animating';
  queue: Direction[];
};

export type LoopAction =
  | {
      type: 'navigate';
      direction: Direction;
      count: number;
      reducedMotion: boolean;
    }
  | { type: 'animate' }
  | { type: 'settle'; count: number };

export const initialLoopState: LoopState = {
  index: 0,
  direction: 1,
  phase: 'idle',
  queue: [],
};

export function wrapIndex(index: number, count: number) {
  return count > 0 ? ((index % count) + count) % count : 0;
}

export function loopReducer(state: LoopState, action: LoopAction): LoopState {
  switch (action.type) {
    case 'navigate':
      if (action.count < 2) return state;
      if (action.reducedMotion) {
        return {
          ...initialLoopState,
          index: wrapIndex(
            state.index +
              (state.phase !== 'idle' ? state.direction : 0) +
              state.queue.reduce<number>(
                (sum, direction) => sum + direction,
                0,
              ) +
              action.direction,
            action.count,
          ),
        };
      }
      if (state.phase !== 'idle') {
        return { ...state, queue: [...state.queue, action.direction] };
      }
      return { ...state, direction: action.direction, phase: 'preparing' };
    case 'animate':
      return state.phase === 'preparing'
        ? { ...state, phase: 'animating' }
        : state;
    case 'settle': {
      if (state.phase !== 'animating') return state;
      const [next, ...queue] = state.queue;
      return {
        index: wrapIndex(state.index + state.direction, action.count),
        direction: next ?? state.direction,
        phase: next === undefined ? 'idle' : 'preparing',
        queue,
      };
    }
  }
}

export function getSlideOffset(index: number, state: LoopState, count: number) {
  let offset = wrapIndex(index - state.index, count);
  if (offset > Math.floor(count / 2)) offset -= count;
  if (
    state.phase !== 'idle' &&
    index === wrapIndex(state.index + state.direction, count)
  ) {
    offset = state.direction;
  }
  return offset - (state.phase === 'animating' ? state.direction : 0);
}
