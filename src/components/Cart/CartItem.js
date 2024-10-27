import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { PRODUCTS_DATA } from "../Shop/PRODUCTS_DATA";
import { cartSliceActions } from "../store/cartSlice";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatchFunction = useDispatch();

  const addToCartHandler = (e) => {
    const productId = e.target.dataset.id;
    const product = PRODUCTS_DATA.find((el) => el.id === Number(productId));
    dispatchFunction(cartSliceActions.addProduct(product));
  };

  const deleteFromCartHandler = (e) => {
    const productId = e.target.dataset.id;
    const product = PRODUCTS_DATA.find((el) => el.id === Number(productId));
    dispatchFunction(cartSliceActions.deleteProduct(product));
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
          <button onClick={deleteFromCartHandler} data-id={id}>
            -
          </button>
          <button onClick={addToCartHandler} data-id={id}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
