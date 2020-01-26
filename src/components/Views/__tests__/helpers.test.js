import { createInitialState, isViewExistsInState } from '../helpers';

const TestComponent = () => {};

describe('[Helpers] Views helpers ', () => {
  test.each([
    { name: 'test-view', path: '/test', component: TestComponent },
    { name: 'test-view', path: '/test', component: TestComponent, default: true },
  ])('[createInitialState] should create state based on config', config => {
    const state = createInitialState([config]);

    expect(state).toEqual({
      views: [
        {
          name: config.name,
          path: config.path,
          component: config.component,
          default: !!config.default,
          outlet: undefined,
          state: 'VIEW_HIDDEN',
        },
      ],
    });
  });

  it('[isViewExistsInState] should return true if view exists in state', () => {
    expect(isViewExistsInState({ views: [{ name: 'test' }] }, 'test')).toBeTruthy();
  });

  it('[isViewExistsInState] should throw error if view not exist in state', () => {
    expect(() => {
      isViewExistsInState({ views: [{ name: 'test' }] }, 'not-existing-test');
    }).toThrow();
  });
});
