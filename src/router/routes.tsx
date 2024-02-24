import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Meet from "../pages/Meet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:roomid",
    element: <Meet />,
  },
]);
