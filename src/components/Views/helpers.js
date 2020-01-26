import { VIEW_HIDDEN, VIEW_VISIBLE } from './consts';

export function createInitialState(config) {
  return {
    views: config.map(({ name, path, component, default: defaultView }) => {
      return {
        name,
        path,
        component,
        default: !!defaultView,
        outlet: undefined,
        state: path === window.location.pathname ? VIEW_VISIBLE : VIEW_HIDDEN,
      };
    }),
  };
}

export function isViewExistsInState(viewsState, name) {
  const view = viewsState.views.find(viewInState => viewInState.name === name);

  if (!view) {
    throw new Error(`View with name "${name}" was not found`);
  }

  return true;
}
