import * as Redux from 'redux';

import * as App from 'app';

export type State = App.State;

export const app = App.make('TEST', (s) => s);

export interface Namespaced {
  id: string;
}

interface InitAction {
  type: 'INIT';
  id: 'INIT';
}

export type Action = (App.Action | InitAction);
export type Reducer<S> = (s: State | undefined, a: Action) => S;
export type Dispatch = Redux.Dispatch<State>;

function isAppAction(a: Redux.AnyAction): a is Action {
  return typeof a.id === 'string';
}

const reducer: Redux.Reducer<State> = (s: State | undefined, a: Redux.AnyAction): State => {
  if (isAppAction(a)) {
    const r =  app.reducer(s, a);
    return r;
  }
  if (s === undefined) {
    return app.reducer(s, { type: 'INIT', id: 'INIT' });
  }
  return s;
};

export const store = Redux.createStore(reducer);
