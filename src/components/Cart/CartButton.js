import { useSelector } from "react-redux";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const counterBtn = useSelector((state) => state.cartSlice.productsQuantity);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span>Корзина</span>
      <span className={styles.badge}>{counterBtn}</span>
    </button>
  );
};

export default CartButton;
