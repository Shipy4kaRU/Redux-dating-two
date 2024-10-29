import { useDispatch } from "react-redux";
import { cartSliceActions } from "../store/cartSlice";
import Card from "../UI/Card";
import styles from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const dispatchFunction = useDispatch();

  // const cartState = useSelector((state) => state.cartSlice);

  const addToCartHandler = () => {
    // const updatedProductsQuantity = cartState.productsQuantity + 1; //присваиваем значение новой переменной, чтобы Redux не подумал, что мы меняем состояние и не изменил его. Здесь мы просто получаем значение из хранилища, увеличиваем его на единицу и записываем куда нам нужно, состояние мы не меняем, Redux ничего не будет выполнять на такое)
    // const updatedProducts = cartState.products.slice();
    // const existingProduct = updatedProducts.find((el) => el.id === id);
    // if (existingProduct) {
    //   const updatedExistingProduct = { ...existingProduct }; // иначе с quantity ошибка read-only
    //   updatedExistingProduct.quantity = existingProduct.quantity + 1;
    //   updatedExistingProduct.total = existingProduct.total + price;
    //   const existingProductIndex = updatedProducts.findIndex(
    //     (el) => el.id === id
    //   );
    //   updatedProducts[existingProductIndex] = updatedExistingProduct; // обновляем элемент
    // } else {
    //   updatedProducts.push({
    //     id: id,
    //     title: title,
    //     price: price,
    //     quantity: 1,
    //     total: price,
    //   });
    // }

    // const updatedCart = {
    //   productsQuantity: updatedProductsQuantity,
    //   products: updatedProducts,
    // };

    // dispatchFunction(cartSliceActions.updateCart(updatedCart));

    dispatchFunction(cartSliceActions.addProduct({ id, title, price }));
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
