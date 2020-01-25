import React, { useEffect, useState, useContext } from 'react';
import ViewContext from '~/contexts/ViewContext';
import { getCurrentView } from '~/components/Views';

const DefaultView = () => {
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

export default DefaultView;
