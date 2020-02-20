import { createContext } from 'react';
import { ViewStateType } from '../types';

const ViewsContext = createContext<{ viewsState: ViewStateType }>({
  viewsState: {
    views: [],
  },
});

export default ViewsContext;
