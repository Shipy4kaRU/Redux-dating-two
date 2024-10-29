import { Fragment, useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import StatusBarMessage from "./components/UI/StatusBarMessage";
import { CartRequestSliceActions } from "./components/store/CartRequestSlice";
import { useDispatch, useSelector } from "react-redux";

let isAppRunningFirst = true;
let deleteStatusBar;
let isStatusBarDeleting = false;

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const requestState = useSelector((state) => state.cartRequestSlice);
  const cartState = useSelector((state) => state.cartSlice);

  const dispatchFunction = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      try {
        dispatchFunction(
          CartRequestSliceActions.showMessageRequest({
            requestStatus: "pending",
            requestTitle: "Отправка данных.",
            requestMessage: "Данные корзины отправляются на сервер...",
          })
        );
        const response = await fetch(
          "https://sushiapp-3c0b7-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cartState),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Ошибка при отправке данных корзины");
        }
        dispatchFunction(
          CartRequestSliceActions.showMessageRequest({
            requestStatus: "success",
            requestTitle: "Успешно!",
            requestMessage: "Товар был успешно добавлен в корзину!",
          })
        );
        if (isStatusBarDeleting) {
          clearTimeout(deleteStatusBar);
        }
        deleteStatusBar = setTimeout(() => {
          dispatchFunction(CartRequestSliceActions.deleteMessageRequest());
          isStatusBarDeleting = true;
        }, 1500);
      } catch (err) {
        dispatchFunction(
          CartRequestSliceActions.showMessageRequest({
            requestStatus: "error",
            requestTitle: "Неудача!",
            requestMessage: "Произошла ошибка при добавлении товара в корзину!",
          })
        );
        console.error(`Произошла ошибка: ${err.message}`);
      }
    };
    if (!isAppRunningFirst) sendCartData();
    isAppRunningFirst = false;
  }, [cartState, dispatchFunction]);

  const openCartHandler = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Fragment>
      {requestState.statusBarMessage && (
        <StatusBarMessage
          status={requestState.requestStatus}
          title={requestState.requestTitle}
          message={requestState.requestMessage}
        />
      )}
      <Layout onOpenCart={openCartHandler}>
        {<Cart isCartOpen={isCartOpen} />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
