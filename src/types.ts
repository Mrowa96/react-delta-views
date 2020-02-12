export type ViewConfigType = {
  name: string;
  component: () => JSX.Element | null;
  path: string;
  default?: boolean;
};

export type ViewType = ViewConfigType & {
  outlet?: string;
  options?: object;
  state: 'VIEW_HIDDEN' | 'VIEW_BEFORE_HIDDEN' | 'VIEW_VISIBLE';
};

export type ViewStateType = {
  views: ViewType[];
};
