import React, { useReducer, useEffect } from 'react';
import ViewsContext from '~/contexts/ViewsContext';
import { OPEN_VIEW, CLOSE_VIEW, BEFORE_CLOSE_VIEW } from './actions';
import { VIEW_HIDDEN, VIEW_VISIBLE } from './consts';
import viewReducer from './reducer';
import ViewsTypes from './types';

let viewsState;
let dispatch;

const getView = name => viewsState.views.find(view => view.name === name);

export const getCurrentView = as => {
  let currentView = viewsState.views.find(view => view.state > VIEW_HIDDEN && view.as === as);

  if (!currentView) {
    currentView = viewsState.views.find(view => view?.default === true && view.as === as);
  }

  return currentView;
};

export const openView = (name, as, options) => {
  const view = getView(name);

  if (!view) {
    throw new Error(`View with name "${name}" was not registered`);
  }

  dispatch({ type: OPEN_VIEW, payload: { name, as, options } });
};

export const closeView = (name, dispatchBeforeCloseAction = true) => {
  const view = getView(name);

  if (!view) {
    throw new Error(`View with name "${name}" was not registered`);
  }

  if (dispatchBeforeCloseAction) {
    dispatch({ type: BEFORE_CLOSE_VIEW, payload: { name } });
  } else {
    dispatch({ type: CLOSE_VIEW, payload: { name } });
  }
};

export default function Views({ children, views }) {
  [viewsState, dispatch] = useReducer(viewReducer, {
    views: views.map(view => {
      return {
        ...view,
        as: undefined,
        state: view?.path === window.location.pathname ? VIEW_VISIBLE : VIEW_HIDDEN,
      };
    }),
  });

  const currentView = getCurrentView();

  useEffect(() => {
    if (currentView?.path) {
      window.history.replaceState({}, document.title, currentView.path);
    }
  }, [currentView]);

  return <ViewsContext.Provider value={{ viewsState }}>{children}</ViewsContext.Provider>;
}

Views.propTypes = ViewsTypes;
