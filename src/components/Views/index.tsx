import React, { useReducer, useEffect } from 'react';
import ViewsContext from '../../contexts/ViewsContext';
import { ViewType, ViewStateType } from '../../types';
import { OPEN_VIEW, CLOSE_VIEW, BEFORE_CLOSE_VIEW } from './actions';
import { createInitialState, isViewExistsInState } from './helpers';
import { VIEW_HIDDEN } from './consts';
import viewReducer from './reducer';
import ViewsProps from './types';

let viewsState: ViewStateType;
let dispatch: ({ type: string, payload: object }) => void;

const getCurrentView = (outlet = undefined): ViewType | undefined => {
  let currentView = viewsState.views.find(view => view.state !== VIEW_HIDDEN && view.outlet === outlet);

  if (!currentView) {
    currentView = viewsState.views.find(view => !!view?.default && view.outlet === outlet);
  }

  return currentView;
};

const openView = (name: string, outlet?: string, options?: object): void => {
  if (isViewExistsInState(viewsState, name)) {
    dispatch({ type: OPEN_VIEW, payload: { name, outlet, options } });
  }
};

const closeView = (name: string, dispatchBeforeCloseAction = true): void => {
  if (isViewExistsInState(viewsState, name)) {
    if (dispatchBeforeCloseAction) {
      dispatch({ type: BEFORE_CLOSE_VIEW, payload: { name } });
    } else {
      dispatch({ type: CLOSE_VIEW, payload: { name } });
    }
  }
};

const Views = ({ children, config }: ViewsProps): JSX.Element => {
  [viewsState, dispatch] = useReducer(viewReducer, createInitialState(config));

  const currentView = getCurrentView();

  useEffect((): void => {
    if (currentView?.path) {
      window.history.replaceState({}, document.title, currentView.path);
    }
  }, [currentView]);

  return <ViewsContext.Provider value={{ viewsState }}>{children}</ViewsContext.Provider>;
};

export default Views;
export { closeView, openView, getCurrentView };
