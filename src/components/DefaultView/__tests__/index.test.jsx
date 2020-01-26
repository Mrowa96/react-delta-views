import React from 'react';
import { render } from '@testing-library/react';
import DefaultView from '~/components/DefaultView';
import Views from '~/components/Views';

const DummyComponent = () => <span data-testid="dummy-component">Dummy component</span>;

describe('[Component] DefaultView ', () => {
  it('should render current view component', () => {
    const { queryByTestId } = render(
      <Views
        views={[
          {
            name: 'dummy-view',
            component: DummyComponent,
            default: true,
          },
        ]}
      >
        <DefaultView />
      </Views>,
    );

    expect(queryByTestId('dummy-component')).toBeInTheDocument();
  });

  it('should render nothing if current view is undefined', () => {
    const { queryByTestId } = render(
      <Views
        views={[
          {
            name: 'dummy-view',
            component: DummyComponent,
            default: false,
          },
        ]}
      >
        <DefaultView />
      </Views>,
    );

    expect(queryByTestId('dummy-component')).not.toBeInTheDocument();
  });
});
