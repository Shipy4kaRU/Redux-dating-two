import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartState = useSelector((state) => state.cartSlice);

  useEffect(() => {
    fetch("https://sushiapp-3c0b7-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cartState),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [cartState]);

  const openCartHandler = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Layout onOpenCart={openCartHandler}>
      {<Cart isCartOpen={isCartOpen} />}
      <Products />
    </Layout>
  );
}

export default App;
