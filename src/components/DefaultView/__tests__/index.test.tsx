import React from 'react';
import { render } from '@testing-library/react';
import DefaultView from '~/components/DefaultView';
import Views from '~/components/Views';
import { ViewConfigType } from '~/types';

const DummyComponent = () => <span data-testid='dummy-component'>Dummy component</span>;

describe('[Component] DefaultView ', () => {
  it('should render current view component', () => {
    const viewConfig = [
      {
        name: 'dummy-view',
        component: DummyComponent,
        default: true,
      },
    ] as ViewConfigType[];

    const { queryByTestId } = render(
      <Views config={viewConfig}>
        <DefaultView />
      </Views>,
    );

    expect(queryByTestId('dummy-component')).toBeInTheDocument();
  });

  it('should render nothing if current view is undefined', () => {
    const viewConfig = [
      {
        name: 'dummy-view',
        component: DummyComponent,
        default: false,
      },
    ] as ViewConfigType[];

    const { queryByTestId } = render(
      <Views config={viewConfig}>
        <DefaultView />
      </Views>,
    );

    expect(queryByTestId('dummy-component')).not.toBeInTheDocument();
  });
});
