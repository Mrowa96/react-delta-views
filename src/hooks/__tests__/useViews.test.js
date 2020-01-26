import { renderHook } from '@testing-library/react-hooks';
import useViews from '~/hooks/useViews';

describe('[HOOK] useViews', () => {
  it('should return views state', () => {
    const { result } = renderHook(() => useViews());

    expect(result.current).toEqual({
      viewsState: {
        views: [],
      },
    });
  });
});
