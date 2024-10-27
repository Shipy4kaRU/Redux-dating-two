import { useDispatch } from "react-redux";
import { cartSliceActions } from "../store/cartSlice";
import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { PRODUCTS_DATA } from "./PRODUCTS_DATA";

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const dispatchFunction = useDispatch();

  const addToCartHandler = (e) => {
    const productId = e.target.dataset.id;
    const product = PRODUCTS_DATA.find((el) => el.id === Number(productId));
    dispatchFunction(cartSliceActions.addProduct(product));
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
          <button onClick={addToCartHandler} data-id={id}>
            Добавить в Корзину
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
