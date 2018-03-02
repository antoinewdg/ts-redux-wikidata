import { $call, composeReducers } from 'utils';
import * as Store from 'store';
import * as ShoppingList from 'shoppingList';

enum T {}

export type Action = ShoppingList.Action;

export interface ChidlrenState {
  listA: ShoppingList.State;
  listB: ShoppingList.State;
}

export interface LocalState {
  n: number;
}

export type State = ChidlrenState & LocalState;

export type Reducer = (s: Store.State | undefined, a: Store.Action) => State;
export type LocalStateSelector = (s: Store.State) => State;

const makeSelectors = (local: LocalStateSelector) => {
  class _Selectors {
    local = local;
    n = (s: Store.State) => local(s).n;
  }

  return new _Selectors();
};

const _sel = $call(makeSelectors);
export type Selectors = typeof _sel;

interface SubReducers {
  listA: ShoppingList.Reducer;
  listB: ShoppingList.Reducer;
}

const makeReducer = (mod: Module): Reducer => {
  const composedReducer = composeReducers<ChidlrenState>(
    {
      listA: mod.listA.reducer,
      listB: mod.listB.reducer,
    },
    mod.selectors.local
  );

  const reducer: Reducer = (s, a) => {
    const children = composedReducer(s, a);

    if (s === undefined) {
      return { n: 0, ...children };
    }
    const state = mod.selectors.local(s);
    if (!a.id.startsWith(mod.id)) {
      return state;
    }
    const newState = { ...state, ...children };
    return { ...newState, n: state.n + 1 };
  };
  return reducer;
};

export const make = (id: string, local: LocalStateSelector) => {
  class _Module {
    id = id;
    selectors = makeSelectors(local);
    reducer: Reducer;
    listA = ShoppingList.make(id + '/LIST_A', (s) => local(s).listA);
    listB = ShoppingList.make(id + '/LIST_B', (s) => local(s).listB);

    constructor() {
      this.reducer = makeReducer(this);
    }
  }

  return new _Module();
};

const _mod = $call(make);
export type Module = typeof _mod;
