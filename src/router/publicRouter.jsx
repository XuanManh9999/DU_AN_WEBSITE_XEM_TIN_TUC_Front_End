import Base from "../component/Base";
import Login from "../component/Auth/Login";
import Register from "../component/Auth/Register";
import ForgotPassword from "../component/Auth/ForgotPassword";
import URL from "../utils/url";

const publicRouters = [
  {
    path: URL.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: URL.AUTH.REGISTER,
    element: <Register />,
  },
  {
    path: URL.AUTH.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
];

export default publicRouters;
