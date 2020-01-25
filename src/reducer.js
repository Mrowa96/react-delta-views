import ViewActions from './actions';
import ViewState from './consts';

const ViewReducer = (state, { type, payload }) => {
  switch (type) {
    case ViewActions.OPEN_VIEW:
      return {
        ...state,
        views: state.views.reduce((views, view) => {
          if (view.name === payload.name) {
            views.push({ ...view, as: payload.as, options: payload.options, state: ViewState.VISIBLE });
          } else if (!payload.as) {
            views.push({ ...view, as: undefined, options: undefined, state: ViewState.HIDDEN });
          } else {
            views.push({ ...view });
          }

          return views;
        }, []),
      };

    case ViewActions.BEFORE_CLOSE_VIEW:
      return {
        ...state,
        views: state.views.reduce((views, view) => {
          if (view.name === payload.name) {
            views.push({ ...view, state: ViewState.BEFORE_HIDDEN });
          } else {
            views.push({ ...view });
          }

          return views;
        }, []),
      };

    case ViewActions.CLOSE_VIEW:
      return {
        ...state,
        views: state.views.reduce((views, view) => {
          if (view.name === payload.name) {
            views.push({ ...view, as: undefined, options: undefined, state: ViewState.HIDDEN });
          } else {
            views.push({ ...view });
          }

          return views;
        }, []),
      };
    default:
      return state;
  }
};

export default ViewReducer;
