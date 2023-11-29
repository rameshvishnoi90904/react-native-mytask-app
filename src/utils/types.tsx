export type task = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type dispatchActionType = {
  type: string;
  data: task | null;
  searchInput: string;
}

export type NavigationScreenPropsType = {
  Home: undefined;
  TodoScreen: {item: task | null };
  LandingScreen: {};
};
