import * as Store from 'store';

export function $call<RT>(expression: (...params: any[]) => RT): RT {
  return (null as any) as RT;
}

type ReducerMap<S> = { [K in keyof S]: (s: Store.State | undefined, a: Store.Action) => S[K] };

type LocalStateSelector<S> = (s: Store.State) => S;
type Reducer<S> = (s: Store.State | undefined, a: Store.Action) => S;

export const composeReducers = <S>(reducers: ReducerMap<S>, local: LocalStateSelector<S>) => {
  const reducer: Reducer<S> = (s, a) => {
    if (s === undefined) {
      const _newState = {} as S;
      for (const key of Object.keys(reducers)) {
        _newState[key as keyof S] = reducers[key as keyof S](s, a);
      }
      return _newState;
    }

    const newState = {} as S;
    const state = local(s);
    let hasChanged: boolean = false;
    for (const k of Object.keys(reducers)) {
      const key = k as keyof S;
      newState[key] = reducers[key](s, a);
      if (newState[key] !== state[key]) {
        hasChanged = true;
      }
    }

    return hasChanged ? newState : state;
  };

  return reducer;
};
