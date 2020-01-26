import { useContext } from 'react';
import ViewContext from '~/contexts/ViewContext';

export default function useViews() {
  return useContext(ViewContext);
}
