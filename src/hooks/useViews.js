import { useContext } from 'react';
import ViewsContext from '~/contexts/ViewsContext';

export default function useViews() {
  return useContext(ViewsContext);
}
