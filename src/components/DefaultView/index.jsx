import React, { useEffect, useState } from 'react';
import { getCurrentView } from '~/components/Views';
import useViews from '~/hooks/useViews';

export default function DefaultView() {
  const [currentView, setCurrentView] = useState(null);
  const { viewState } = useViews();

  useEffect(() => {
    setCurrentView(getCurrentView());
  }, [viewState]);

  if (!currentView) {
    return null;
  }

  return <currentView.component />;
}
