import React, { useEffect, useState } from 'react';
import { getCurrentView } from '~/components/Views';
import useViews from '~/hooks/useViews';

export default function DefaultView() {
  const [currentView, setCurrentView] = useState(null);
  const { viewsState } = useViews();

  useEffect(() => {
    setCurrentView(getCurrentView());
  }, [viewsState]);

  if (!currentView) {
    return null;
  }

  return <currentView.component />;
}
