import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { cartSliceActions } from "../store/cartSlice";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatchFunction = useDispatch();

  const addToCartHandler = (e) => {
    dispatchFunction(cartSliceActions.addProduct(props.item));
  };

  const deleteFromCartHandler = (e) => {
    dispatchFunction(cartSliceActions.deleteProduct(id));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{" "}
          <span className={styles["item-price"]}>
            (${price.toFixed(2)} / шт.)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={deleteFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
