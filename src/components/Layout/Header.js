import foodBackground from "../../res/img/food-background.jpg";
import CartButton from "../UI/CartButton";
import classes from './Header.module.css'

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food ordering app</h1>
        <CartButton onClick={props.onToggleCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={foodBackground} alt="food background"></img>
      </div>
    </>
  );
};

export default Header;
