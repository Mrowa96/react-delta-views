import { createInitialState, isViewExistsInState } from '../helpers';
import { ViewStateType } from '../../../types';

const TestComponent = () => {
  return null;
};

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
    const viewsState = {
      views: [
        {
          name: 'test',
          path: '/',
        },
      ],
    } as ViewStateType;

    expect(isViewExistsInState(viewsState, 'test')).toBeTruthy();
  });

  it('[isViewExistsInState] should throw error if view not exist in state', () => {
    const viewsState = {
      views: [
        {
          name: 'test',
          path: '/',
        },
      ],
    } as ViewStateType;

    expect(() => {
      isViewExistsInState(viewsState, 'not-existing-test');
    }).toThrow();
  });
});
