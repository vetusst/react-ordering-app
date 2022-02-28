import { useContext, useEffect, useState } from "react";

import classes from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const CartButton = (props) => {
  const [btnIsActive, setBtnIsActive] = useState(false)
  const cartCtx = useContext(CartContext)

  const btnClasses = `${classes.button} ${btnIsActive ? classes.bump : ''}`

  useEffect(() => {
    if (cartCtx.items.length === 0) return
    setBtnIsActive(true)

    const timer = setTimeout(() => {
      setBtnIsActive(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [cartCtx.items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>
        {cartCtx.items.reduce((num, item) => num + item.amount, 0)}
       </span>
    </button>
  );
};

export default CartButton;
