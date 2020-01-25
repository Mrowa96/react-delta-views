import React, { useEffect, useState, useContext } from 'react';
import ViewContext from '../../contexts/ViewContext';
import { getCurrentView } from '../View';

const StandardView = () => {
  const [currentView, setCurrentView] = useState(null);
  const { viewState } = useContext(ViewContext);

  useEffect(() => {
    setCurrentView(getCurrentView());
  }, [viewState]);

  if (!currentView) {
    return null;
  }

  return <currentView.component />;
};

export default StandardView;
