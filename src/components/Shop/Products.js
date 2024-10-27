import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import { PRODUCTS_DATA } from "./PRODUCTS_DATA";

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {PRODUCTS_DATA.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          ></ProductItem>
        ))}
      </ul>
    </section>
  );
};

export default Products;
