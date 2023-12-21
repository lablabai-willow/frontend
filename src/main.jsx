import React from 'react';
import ReactDOM from 'react-dom/client';
import Draw from "./Draw.jsx";
import App from './App.jsx';
import './styles.css';
import store from './store/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App env="prod" />,
  },
  {
    path: "/dev",
    element: <App env="dev" />,
  },
  {
    path: "/draw",
    element: <Draw />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
