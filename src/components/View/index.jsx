import React, { useReducer, useEffect } from 'react';
import ViewContext from '../../contexts/ViewContext';
import ViewReducer from '../../reducer';
import ViewActions from '../../actions';
import ViewState from '../../consts';
import ViewTypes from './types';

let viewState;
let dispatch;

const getView = name => viewState.views.find(view => view.name === name);

export const getCurrentView = as => {
  let currentView = viewState.views.find(view => view.state > 0 && view.as === as);

  if (!currentView) {
    currentView = viewState.views.find(view => view?.default === true && view.as === as);
  }

  return currentView;
};

export const openView = (name, as, options) => {
  const view = getView(name);

  if (!view) {
    throw new Error(`View with name "${name}" was not registered`);
  }

  dispatch({ type: ViewActions.OPEN_VIEW, payload: { name, as, options } });
};

export const closeView = (name, dispatchBeforeCloseAction = true) => {
  const view = getView(name);

  if (!view) {
    throw new Error(`View with name "${name}" was not registered`);
  }

  if (dispatchBeforeCloseAction) {
    dispatch({ type: ViewActions.BEFORE_CLOSE_VIEW, payload: { name } });
  } else {
    dispatch({ type: ViewActions.CLOSE_VIEW, payload: { name } });
  }
};

const View = ({ children, views }) => {
  [viewState, dispatch] = useReducer(ViewReducer, {
    views: views.map(view => {
      return {
        ...view,
        as: undefined,
        state: view?.path === window.location.pathname ? ViewState.VISIBLE : ViewState.HIDDEN,
      };
    }),
  });

  const currentView = getCurrentView();

  useEffect(() => {
    if (currentView?.path) {
      window.history.replaceState({}, document.title, currentView.path);
    }
  }, [currentView]);

  return <ViewContext.Provider value={{ viewState }}>{children}</ViewContext.Provider>;
};

View.propTypes = ViewTypes;

export default View;
