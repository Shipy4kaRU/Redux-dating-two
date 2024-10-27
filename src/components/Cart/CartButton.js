import styles from "./CartButton.module.css";

const CartButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span>Корзина</span>
      <span className={styles.badge}>2</span>
    </button>
  );
};

export default CartButton;
