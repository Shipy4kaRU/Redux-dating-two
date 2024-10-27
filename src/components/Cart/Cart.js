import { useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const products = useSelector((state) => state.cartSlice.products);

  return (
    <Card
      className={`${styles.cart} ${
        props.isCartOpen ? styles["cart--appear"] : styles["cart--disappear"]
      }`}
    >
      <h2>Мои Покупки</h2>
      <ul>
        {products.map((product) => (
          <CartItem
            item={{
              id: product.id,
              key: product.id,
              title: product.title,
              quantity: product.quantity,
              total: product.total,
              price: product.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
