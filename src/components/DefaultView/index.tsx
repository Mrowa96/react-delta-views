import React, { useEffect, useState } from 'react';
import useViews from '../../hooks/useViews';
import { ViewType } from '../../types';
import { getCurrentView } from '../Views';

export default function DefaultView(): JSX.Element | null {
  const [currentView, setCurrentView] = useState<ViewType | undefined>();
  const { viewsState } = useViews();

  useEffect(() => {
    setCurrentView(getCurrentView());
  }, [viewsState]);

  if (!currentView) {
    return null;
  }

  return <currentView.component />;
}
