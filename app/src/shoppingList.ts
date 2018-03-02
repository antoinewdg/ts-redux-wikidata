import { $call } from 'utils';

import * as Store from 'store';

enum T {
  ADD_ITEM = 'SHOPPING_LIST/ADD_ITEM',
  SET_NEW_ITEM_NAME = 'SHOPPING_LIST/SET_NEW_ITEM_NAME',
}

type _Action = { type: T.ADD_ITEM } | { type: T.SET_NEW_ITEM_NAME; name: string };

export type Action = Store.Namespaced & _Action;

const makeActions = (id: string) => {
  return {
    addItem: (): Action => ({ type: T.ADD_ITEM, id }),
    setNewItemName: (name: string): Action => ({ type: T.SET_NEW_ITEM_NAME, name, id }),
  };
};

const _act = $call(makeActions);
export type Actions = typeof _act;

export interface State {
  items: string[];
  newItem: string;
}

export type Reducer = (s: Store.State | undefined, a: Store.Action) => State;
export type LocalStateSelector = (s: Store.State) => State;

function makeSelectors(local: LocalStateSelector) {
  class _Selectors {
    local = local;
    items = (s: Store.State) => local(s).items;
    test = (s: Store.State) => this.items(s);
    newItem = (s: Store.State) => local(s).newItem;
  }

  return new _Selectors();
}

const _selec = $call(makeSelectors);
export type Selectors = typeof _selec;

function makeReducer(id: string, selectors: Selectors): Reducer {
  const INIT_STATE = {
    items: [],
    newItem: '',
  };

  const reducer: Reducer = (s: Store.State | undefined, action: Store.Action): State => {
    if (s === undefined) {
      return INIT_STATE;
    }
    const state = selectors.local(s);
    if (action.id !== id) {
      return state;
    }

    switch (action.type) {
      case T.SET_NEW_ITEM_NAME:
        const r = { ...state, newItem: action.name };
        return r;

      case T.ADD_ITEM:
        return { ...state, items: [...state.items, selectors.newItem(s)], newItem: '' };

      default:
        return state;
    }
  };

  return reducer;
}

export const make = (id: string, local: LocalStateSelector) => {
  class _Module {
    selectors: Selectors;
    actions: Actions;
    reducer: Reducer;

    constructor() {
      this.selectors = makeSelectors(local);
      this.actions = makeActions(id);
      this.reducer = makeReducer(id, this.selectors);
    }
  }

  return new _Module();
};

const _mod = $call(make);
export type Module = typeof _mod;
