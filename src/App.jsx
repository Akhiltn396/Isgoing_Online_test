import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Footer from "./components/Footer/Footer";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Navbar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
  const queryClient = new QueryClient();
  const persistor = persistStore(store);
  const Layout = () => {
    return (
      <div className="app">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />

            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
            <Footer />
          </PersistGate>
        </Provider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path:"*",
    //   element: <Login/>
    // }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
