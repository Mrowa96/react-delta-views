import React, { useReducer, useEffect } from 'react';
import ViewsContext from '~/contexts/ViewsContext';
import { OPEN_VIEW, CLOSE_VIEW, BEFORE_CLOSE_VIEW } from './actions';
import { createInitialState, isViewExistsInState } from './helpers';
import { VIEW_HIDDEN } from './consts';
import viewReducer from './reducer';
import ViewsTypes from './types';

let viewsState;
let dispatch;

function getCurrentView(outlet) {
  let currentView = viewsState.views.find(view => view.state !== VIEW_HIDDEN && view.outlet === outlet);

  if (!currentView) {
    currentView = viewsState.views.find(view => !!view?.default && view.outlet === outlet);
  }

  return currentView;
}

function openView(name, outlet, options) {
  if (isViewExistsInState(viewsState, name)) {
    dispatch({ type: OPEN_VIEW, payload: { name, outlet, options } });
  }
}

function closeView(name, dispatchBeforeCloseAction = true) {
  if (isViewExistsInState(viewsState, name)) {
    if (dispatchBeforeCloseAction) {
      dispatch({ type: BEFORE_CLOSE_VIEW, payload: { name } });
    } else {
      dispatch({ type: CLOSE_VIEW, payload: { name } });
    }
  }
}

function Views({ children, config }) {
  [viewsState, dispatch] = useReducer(viewReducer, createInitialState(config));

  const currentView = getCurrentView();

  useEffect(() => {
    if (currentView?.path) {
      window.history.replaceState({}, document.title, currentView.path);
    }
  }, [currentView]);

  return <ViewsContext.Provider value={{ viewsState }}>{children}</ViewsContext.Provider>;
}

Views.propTypes = ViewsTypes;

export default Views;
export { closeView, openView, getCurrentView };
