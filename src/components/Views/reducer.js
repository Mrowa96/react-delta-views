import { OPEN_VIEW, CLOSE_VIEW, BEFORE_CLOSE_VIEW } from './actions';
import { VIEW_BEFORE_HIDDEN, VIEW_HIDDEN, VIEW_VISIBLE } from './consts';

export default function viewReducer(state, { type, payload }) {
  switch (type) {
    case OPEN_VIEW:
      return {
        ...state,
        views: state.views.reduce((views, view) => {
          if (view.name === payload.name) {
            views.push({ ...view, as: payload.as, options: payload.options, state: VIEW_VISIBLE });
          } else if (!payload.as) {
            views.push({ ...view, as: undefined, options: undefined, state: VIEW_HIDDEN });
          } else {
            views.push({ ...view });
          }

          return views;
        }, []),
      };

    case BEFORE_CLOSE_VIEW:
      return {
        ...state,
        views: state.views.reduce((views, view) => {
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
        views: state.views.reduce((views, view) => {
          if (view.name === payload.name) {
            views.push({ ...view, as: undefined, options: undefined, state: VIEW_HIDDEN });
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
