import { createBrowserRouter } from "react-router-dom";
import Test from '../pages/test/index'
 const router = createBrowserRouter([
  {
    path: "/",
    element: <Test/>
  },
]);

export default router