# react-delta-views

## How to use it?

### Define views configuration

Views configuration has to be an array with pre-defined views which are compatible with `ViewConfigType`. Example:

```js
const viewsConfig = [
  {
    name: 'homepage',
    path: '/',
    component: HomePage,
    default: true,
  },
  {
    name: 'settings',
    path: '/settings',
    component: SettingsPage,
  },
];
```

### Set up where to display your views

Wrap your components with `<Views>`, pass to it your views configuration and place `<DefaultView>` somewhere as a placeholder to display your views. Example:

```jsx
import Views, { DefaultView } from 'react-delta-views';

const App = () => (
  <Views config={viewsConfig}>
    <Header />
    <DefaultView />
    <Footer />
  </Views>
);
```

### Navigate between views

If you want to change current view, call `openView` function with view name as first parameter. Example:

```jsx
import { openView } from 'react-delta-views';

const Button = () => (
    <button onClick={() => openView('settings')}>
        Open settings
    </button>;
)
```

If you want close view, just call `closeView` function.

```jsx
import { closeView } from 'react-delta-views';

const Button = () => (
    <button onClick={() => closeView('settings')}>
        Close settings
    </button>;
)
```

### Create own view e.g. ModalView

```jsx
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useViews, getCurrentView, closeView } from 'react-delta-views';

const modalNode = document.getElementById('modal');

const ModalView = () => {
  const [currentView, setCurrentView] = useState(null);
  const { viewsState } = useViews();

  useEffect(() => {
    setCurrentView(getCurrentView('modal'));
  }, [viewsState]);

  if (!currentView) {
    return null;
  }

  const closeModal = () => {
    closeView(currentView.name);
  };

  return createPortal(
    <div className='modal'>
      <button type='button' onClick={closeModal}>
        Close
      </button>

      <currentView.component />
    </div>,
    modalNode,
  );
};

export default ModalView;
```

## Additional information

- Library was not tested with SSR, so I cannot guarantee that it will work out-of-the-box. If something is wrong, please create an Issue.

## Supported browsers

All browser which are compatible with ES2017.
