import Base from "../component/Base";
import Login from "../component/Auth/Login";
import Register from "../component/Auth/Register";
import ForgotPassword from "../component/Auth/ForgotPassword";
import Home from "../component/Home";
import DetailArticle from "../component/DetailArticle";
import CategoryPage from "../component/CategoryPage";
import SavedArticles from "../component/SavedArticles";
import LikedArticles from "../component/LikedArticles";
import AccountManagement from "../component/AccountManagement";
import URL from "../utils/url";

const publicRouters = [
  {
    path: "/",
    element: <Base />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // User content routes
      {
        path: "/bai-viet-da-luu",
        element: <SavedArticles />,
      },
      {
        path: "/bai-viet-da-thich",
        element: <LikedArticles />,
      },
      {
        path: "/quan-ly-tai-khoan",
        element: <AccountManagement />,
      },
      // Article detail routes (specific routes first)
      {
        path: "/tin-tuc/:slug",
        element: <DetailArticle />,
      },
      {
        path: "/bai-viet-test",
        element: <DetailArticle />,
      },
      // Category routes (general routes after specific ones)
      {
        path: "/tin-tuc",
        element: <CategoryPage />,
      },
      {
        path: "/tin-tuc/moi-nhat",
        element: <CategoryPage />,
      },
      {
        path: "/tin-tuc/tin-nong",
        element: <CategoryPage />,
      },
      {
        path: "/tin-tuc/trong-nuoc",
        element: <CategoryPage />,
      },
      {
        path: "/tin-tuc/quoc-te",
        element: <CategoryPage />,
      },
      {
        path: "/the-thao",
        element: <CategoryPage />,
      },
      {
        path: "/the-thao/bong-da",
        element: <CategoryPage />,
      },
      {
        path: "/the-thao/bong-ro",
        element: <CategoryPage />,
      },
      {
        path: "/the-thao/tennis",
        element: <CategoryPage />,
      },
      {
        path: "/the-thao/khac",
        element: <CategoryPage />,
      },
      {
        path: "/cong-nghe",
        element: <CategoryPage />,
      },
      {
        path: "/cong-nghe/dien-thoai",
        element: <CategoryPage />,
      },
      {
        path: "/cong-nghe/laptop",
        element: <CategoryPage />,
      },
      {
        path: "/cong-nghe/ai-tech",
        element: <CategoryPage />,
      },
      {
        path: "/cong-nghe/gaming",
        element: <CategoryPage />,
      },
      {
        path: "/kinh-doanh",
        element: <CategoryPage />,
      },
      {
        path: "/kinh-doanh/chung-khoan",
        element: <CategoryPage />,
      },
      {
        path: "/kinh-doanh/ngan-hang",
        element: <CategoryPage />,
      },
      {
        path: "/kinh-doanh/bat-dong-san",
        element: <CategoryPage />,
      },
      {
        path: "/kinh-doanh/khoi-nghiep",
        element: <CategoryPage />,
      },
      {
        path: "/giai-tri",
        element: <CategoryPage />,
      },
      {
        path: "/giai-tri/phim-anh",
        element: <CategoryPage />,
      },
      {
        path: "/giai-tri/am-nhac",
        element: <CategoryPage />,
      },
      {
        path: "/giai-tri/sao-viet",
        element: <CategoryPage />,
      },
      {
        path: "/giai-tri/thoi-trang",
        element: <CategoryPage />,
      },
      {
        path: "/doi-song",
        element: <CategoryPage />,
      },
      {
        path: "/doi-song/suc-khoe",
        element: <CategoryPage />,
      },
      {
        path: "/doi-song/gia-dinh",
        element: <CategoryPage />,
      },
      {
        path: "/doi-song/am-thuc",
        element: <CategoryPage />,
      },
      {
        path: "/doi-song/du-lich",
        element: <CategoryPage />,
      },
    ],
  },
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
