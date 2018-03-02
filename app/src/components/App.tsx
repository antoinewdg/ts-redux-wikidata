import * as React from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';

import { State } from 'store';
import { Module } from 'app';
import makeShoppingList from 'components/ShoppingList';

const appClass = style({ color: 'red' });

interface Props {
  n: number;
}

const make = (mod: Module) => {
  const {selectors} = mod;
  const ShoppingListA = makeShoppingList(mod.listA);
  const ShoppingListB = makeShoppingList(mod.listB);

  const App = ({ n }: Props) => (
    <div className={appClass}>
      APP: {n}
      <ShoppingListA />
      <ShoppingListB />
    </div>
  );

  const mapState = (s: State) => ({
    n: selectors.n(s),
  });

  return connect(mapState)(App);
};

export default make;
