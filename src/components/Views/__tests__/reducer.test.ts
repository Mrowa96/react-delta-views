import viewsReducer from '../reducer';
import { ViewType } from '../../../types';

const someComponent = () => null;
const testView: ViewType = {
  name: 'test',
  component: someComponent,
  path: '/test',
  state: 'VIEW_HIDDEN',
  default: undefined,
  outlet: undefined,
  options: undefined,
};
const anotherView: ViewType = {
  ...testView,
  name: 'another-view',
  state: 'VIEW_HIDDEN',
};

describe('[Reducer] Views reducer ', () => {
  it('should change view state to visible after OPEN_VIEW dispatch', () => {
    const views = [testView];

    expect(viewsReducer({ views }, { type: 'OPEN_VIEW', payload: { name: 'test' } })).toEqual({
      views: [{ ...testView, state: 'VIEW_VISIBLE' }],
    });
  });

  it('should change all others views state to hidden after OPEN_VIEW dispatch', () => {
    const currentlyVisibleView: ViewType = { ...testView, name: 'test2', state: 'VIEW_VISIBLE' };
    const views = [testView, currentlyVisibleView];

    expect(viewsReducer({ views }, { type: 'OPEN_VIEW', payload: { name: 'test' } })).toEqual({
      views: [
        { ...testView, state: 'VIEW_VISIBLE' },
        { ...currentlyVisibleView, state: 'VIEW_HIDDEN' },
      ],
    });
  });

  it('should change only requested view after OPEN_VIEW dispatch with some outlet', () => {
    const currentlyVisibleView: ViewType = { ...testView, name: 'test2', state: 'VIEW_VISIBLE' };
    const views = [testView, currentlyVisibleView];

    expect(viewsReducer({ views }, { type: 'OPEN_VIEW', payload: { name: 'test', outlet: 'outlet' } })).toEqual({
      views: [{ ...testView, state: 'VIEW_VISIBLE', outlet: 'outlet' }, currentlyVisibleView],
    });
  });

  it('should change view state to before close after BEFORE_CLOSE_VIEW dispatch', () => {
    const views: ViewType[] = [{ ...testView, state: 'VIEW_VISIBLE' }, anotherView];

    expect(viewsReducer({ views }, { type: 'BEFORE_CLOSE_VIEW', payload: { name: 'test' } })).toEqual({
      views: [{ ...testView, state: 'VIEW_BEFORE_HIDDEN' }, anotherView],
    });
  });

  it('should change view state to close after CLOSE_VIEW dispatch', () => {
    const views: ViewType[] = [{ ...testView, state: 'VIEW_VISIBLE' }, anotherView];

    expect(viewsReducer({ views }, { type: 'CLOSE_VIEW', payload: { name: 'test' } })).toEqual({
      views: [{ ...testView, state: 'VIEW_HIDDEN' }, anotherView],
    });
  });
});
