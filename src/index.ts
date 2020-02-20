import Views, { openView, closeView, getCurrentView } from './components/Views';
import DefaultView from './components/DefaultView';
import useViews from './hooks/useViews';
import { VIEW_BEFORE_HIDDEN, VIEW_HIDDEN, VIEW_VISIBLE } from './components/Views/consts';

export { DefaultView, useViews, openView, closeView, getCurrentView, VIEW_BEFORE_HIDDEN, VIEW_HIDDEN, VIEW_VISIBLE };
export default Views;
