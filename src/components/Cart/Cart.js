import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartCtx.removeItem({
            ...item,
            amount: 1,
          })} 
          onAdd={() => cartCtx.addItem({
            ...item,
            amount: 1,
          })} 
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onToggleCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>${Math.abs(cartCtx.totalAmount).toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onToggleCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
