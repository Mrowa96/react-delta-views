import { useContext } from 'react';
import ViewsContext from '../contexts/ViewsContext';
import { ViewStateType } from '../types';

const useViews = (): { viewsState: ViewStateType } => {
  return useContext(ViewsContext);
};

export default useViews;
