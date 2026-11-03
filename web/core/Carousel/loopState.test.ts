import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  type Direction,
  getSlideOffset,
  initialLoopState,
  loopReducer,
  wrapIndex,
} from './loopState';

function navigate(direction: Direction, count: number) {
  const preparing = loopReducer(initialLoopState, {
    type: 'navigate',
    direction,
    count,
    reducedMotion: false,
  });
  return loopReducer(preparing, { type: 'animate' });
}

describe('loop carousel navigation', () => {
  for (const count of [2, 3, 4, 7]) {
    for (const direction of [-1, 1] as const) {
      it(`positions and wraps ${count} slides moving ${direction}`, () => {
        let state = initialLoopState;
        for (let step = 0; step < count * 3; step++) {
          state = loopReducer(state, {
            type: 'navigate',
            direction,
            count,
            reducedMotion: false,
          });
          const target = wrapIndex(state.index + direction, count);
          assert.equal(getSlideOffset(state.index, state, count), 0);
          assert.equal(getSlideOffset(target, state, count), direction);
          state = loopReducer(state, { type: 'animate' });
          assert.equal(getSlideOffset(target, state, count), 0);
          assert.equal(getSlideOffset(state.index, state, count), -direction);
          state = loopReducer(state, { type: 'settle', count });
          assert.equal(state.index, wrapIndex((step + 1) * direction, count));
          assert.equal(getSlideOffset(state.index, state, count), 0);
          assert.equal(state.phase, 'idle');
        }
      });
    }
  }

  it('queues rapid navigation in order without losing presses', () => {
    let state = navigate(1, 4);
    for (const direction of [1, -1, 1] as const) {
      state = loopReducer(state, {
        type: 'navigate',
        direction,
        count: 4,
        reducedMotion: false,
      });
    }
    for (const expected of [1, 2, 1, 2]) {
      state = loopReducer(state, { type: 'settle', count: 4 });
      assert.equal(state.index, expected);
      if (state.phase === 'preparing')
        state = loopReducer(state, { type: 'animate' });
    }
    assert.equal(state.phase, 'idle');
    assert.deepEqual(state.queue, []);
  });

  it('ignores repeated transition completion events', () => {
    const settled = loopReducer(navigate(1, 3), { type: 'settle', count: 3 });
    assert.equal(loopReducer(settled, { type: 'settle', count: 3 }), settled);
  });

  it('navigates immediately with reduced motion', () => {
    const state = loopReducer(initialLoopState, {
      type: 'navigate',
      direction: -1,
      count: 3,
      reducedMotion: true,
    });
    assert.equal(state.index, 2);
    assert.equal(state.phase, 'idle');
  });

  it('settles pending navigation before a reduced-motion navigation', () => {
    let state = navigate(1, 4);
    state = loopReducer(state, {
      type: 'navigate',
      direction: 1,
      count: 4,
      reducedMotion: false,
    });
    state = loopReducer(state, {
      type: 'navigate',
      direction: 1,
      count: 4,
      reducedMotion: true,
    });
    assert.equal(state.index, 3);
    assert.equal(state.phase, 'idle');
    assert.deepEqual(state.queue, []);
  });

  it('does not navigate empty or single-slide carousels', () => {
    for (const count of [0, 1]) {
      assert.equal(
        loopReducer(initialLoopState, {
          type: 'navigate',
          direction: 1,
          count,
          reducedMotion: false,
        }),
        initialLoopState,
      );
      assert.equal(wrapIndex(0, count), 0);
    }
  });

  it('preserves a prepared navigation when reduced motion is enabled', () => {
    let state = loopReducer(initialLoopState, {
      type: 'navigate',
      direction: 1,
      count: 4,
      reducedMotion: false,
    });
    state = loopReducer(state, {
      type: 'navigate',
      direction: 1,
      count: 4,
      reducedMotion: true,
    });
    assert.equal(state.index, 2);
    assert.equal(state.phase, 'idle');
  });

  it('starts on the first slide without an initialization effect', () => {
    assert.deepEqual(
      [0, 1, 2].map((index) => getSlideOffset(index, initialLoopState, 3)),
      [0, 1, -1],
    );
  });
});
