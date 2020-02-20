import { ViewStateType, ViewType } from '../../types';
import { OPEN_VIEW, CLOSE_VIEW, BEFORE_CLOSE_VIEW } from './actions';
import { VIEW_BEFORE_HIDDEN, VIEW_HIDDEN, VIEW_VISIBLE } from './consts';

export default function viewReducer(
  state: ViewStateType,
  { type, payload }: { type: string; payload: { name: string; outlet?: string; options?: object } },
): ViewStateType {
  switch (type) {
    case OPEN_VIEW:
      return {
        ...state,
        views: state.views.reduce((views: ViewType[], view) => {
          if (view.name === payload.name) {
            views.push({ ...view, outlet: payload.outlet, options: payload.options, state: VIEW_VISIBLE });
          } else if (!payload.outlet) {
            views.push({ ...view, outlet: undefined, options: undefined, state: VIEW_HIDDEN });
          } else {
            views.push({ ...view });
          }

          return views;
        }, []),
      };

    case BEFORE_CLOSE_VIEW:
      return {
        ...state,
        views: state.views.reduce((views: ViewType[], view) => {
          if (view.name === payload.name) {
            views.push({ ...view, state: VIEW_BEFORE_HIDDEN });
          } else {
            views.push({ ...view });
          }

          return views;
        }, []),
      };

    case CLOSE_VIEW:
      return {
        ...state,
        views: state.views.reduce((views: ViewType[], view) => {
          if (view.name === payload.name) {
            views.push({ ...view, outlet: undefined, options: undefined, state: VIEW_HIDDEN });
          } else {
            views.push({ ...view });
          }

          return views;
        }, []),
      };
    default:
      return state;
  }
}
