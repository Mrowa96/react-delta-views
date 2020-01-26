import { createContext } from 'react';

const ViewsContext = createContext({
  viewsState: {
    views: [],
  },
});

export default ViewsContext;
