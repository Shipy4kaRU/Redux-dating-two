import { useDispatch } from "react-redux";
import { cartSliceActions } from "../store/cartSlice";
import Card from "../UI/Card";
import styles from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const dispatchFunction = useDispatch();

  const addToCartHandler = () => {
    dispatchFunction(
      cartSliceActions.addProduct({ id, title, price, description })
    );
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addToCartHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
