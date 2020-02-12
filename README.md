# react-delta-views

## How to use it?

### Set up where to display your views

Wrap your components with <Views>, pass to it your views configuration and place <DefaultView> somewhere as a placeholder to display your views. Example:

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

### Define views configuration

Views configuration has to be an array with pre-defined views. Example:

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

## TODO

- Write tests for Views component
