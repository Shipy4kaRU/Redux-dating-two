import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

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
