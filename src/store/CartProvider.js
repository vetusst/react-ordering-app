import CartContext from "./cart-context";
import { useReducer } from "react";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const itemExists = state.items.some((item) => item.id === action.item.id);

    let updatedItems;
    if (itemExists) {
      updatedItems = [
        ...state.items.map((item) => {
          if (item.id === action.item.id) {
            item.amount = item.amount += action.item.amount;
          }
          return item;
        }),
      ];
    } else {
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const updatedTotalAmount =
      state.totalAmount - action.item.price * action.item.amount;

    const updatedItems = [
      ...state.items
        .map((item) => {
          if (item.id === action.item.id) {
            item.amount = item.amount - action.item.amount;
          }
          return item;
        })
        .filter((item) => item.amount > 0),
    ];
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return {
    items: [],
    totalAmount: 0,
  };
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (item) => {
    dispatchCartAction({ type: "REMOVE", item: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
