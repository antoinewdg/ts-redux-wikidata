import * as React from 'react';
import { connect } from 'react-redux';

import { State, Dispatch } from 'store';
import { Module } from 'shoppingList';

interface Props {
  elements: string[];
  elementToInsert: string;
  onInsertElement: () => void;
  onChangeElementToInsert: (n: string) => void;
}

const make = ({ selectors, actions }: Module) => {
  const ShoppingList = (props: Props) => {
    const { elements, elementToInsert, onInsertElement, onChangeElementToInsert } = props;
    return (
      <div>
        {elements.map((e, i) => (
          <React.Fragment key={i}>
            {e}
            <br />
          </React.Fragment>
        ))}
        <button onClick={onInsertElement}>INSERT</button>
        <input
          type="text"
          value={elementToInsert}
          onChange={(e) => onChangeElementToInsert(e.target.value)}
        />
      </div>
    );
  };

  const mapState = (s: State) => {
    return {
      elements: selectors.items(s),
      elementToInsert: selectors.newItem(s),
    };
  };

  const mapDispatch = (dispatch: Dispatch) => ({
    onInsertElement: () => dispatch(actions.addItem()),
    onChangeElementToInsert: (n: string) => dispatch(actions.setNewItemName(n)),
  });

  return connect(mapState, mapDispatch)(ShoppingList);
};

export default make;
