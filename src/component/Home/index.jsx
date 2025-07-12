import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import { getAllArticles } from "../../services/articles";
import { capitalizeWords, formatDate } from "../../helper/format";
export default function Home() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories"))[0]?.id : 0
  );

  // Pagination states
  const [categories, setCategories] = useState([]);
  const [sidebarPage, setSidebarPage] = useState(1);
  const [newsListPage, setNewsListPage] = useState(1);
  const [popularNewsPage, setPopularNewsPage] = useState(1);
  const [postOutstandings, setPostOutstandings] = useState([]);
  const itemsPerPage = 5;
  const sidebarItemsPerPage = 7;
  // API states
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLatestNews, setTotalLatestNews] = useState(0);
  const [totalPostOutstandings, setTotalPostOutstandings] = useState(0);



  // Fetch latest news from API
  const fetchLatestNews = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const offset = (page - 1) * sidebarItemsPerPage;
      const response = await getAllArticles(sidebarItemsPerPage, offset, "createAt", "desc");
      if (response && response.status === 200) {
        setLatestNews(response?.data);
        setTotalLatestNews(response.totalItems);
      } else {
        setError('Không thể tải tin mới nhất');
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu');
      console.error('Error fetching latest news:', err);
    } finally {
      setLoading(false);
    }
  };
  const fetchPostOutstandings = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const offset = (page - 1) * itemsPerPage;
      const response = await getAllArticles(itemsPerPage, offset, "view", "desc");
      if (response && response.status === 200) {
        setPostOutstandings(response?.data);
        setTotalPostOutstandings(response.totalItems);
      }
    } catch (err) {
      console.error('Error fetching post outstandings:', err);
    } finally {
      setLoading(false);
    }
  }


  // useEffect to fetch data when component mounts or page changes
  useEffect(() => {
    fetchLatestNews(sidebarPage);
  }, [sidebarPage]);

  useEffect(() => {
    fetchPostOutstandings(popularNewsPage);
  }, [popularNewsPage]);


  useEffect(() => {
    const fetchCategory = async () => {
      if (localStorage.getItem("categories")) {
        const formatCategory = JSON.parse(localStorage.getItem("categories"))?.map(item => ({
          id: item?.id,
          name: `${item?.name != null && item?.name.toLowerCase() !== "tin tức"
            ? capitalizeWords(`Tin tức ${item?.name.toLowerCase()}`)
            : capitalizeWords(item?.name?.toLowerCase())}`,
          slug: item?.slug,
        }));
        setCategories(formatCategory);
      }
    }
    fetchCategory();
  }, [])

  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23374151' text-anchor='middle' dy='.3em'%3EHình ảnh%3C/text%3E%3C/svg%3E";
  };
  const heroNews = [
    {
      id: 1,
      title: "Tin tức mới nhất",
      image: "https://picsum.photos/800/400?random=1",
      content: "Hội nghị Ban Thường vụ Hội Cấp Thoát nước Việt Nam nhiệm kỳ VI (2020 -2025)",
      date: "04/07/2025",
      category: "Công nghệ"
    },
    {
      id: 2,
      title: "Đảm bảo cấp nước sạch trong mùa mưa",
      image: "https://picsum.photos/800/400?random=2",
      content: "Đại hội đại biểu Đảng bộ Tổng Công ty Cấp nước Sài Gòn lần thứ V, nhiệm kỳ 2025-2030",
      date: "27/06/2025",
      category: "Tin tức"
    },
    {
      id: 3,
      title: "Nhấn mạnh các sáng kiến đảm bảo công tác cấp nước an toàn",
      image: "https://picsum.photos/800/400?random=3",
      content: "Chuẩn hóa quy trình cấp nước để đảm bảo chất lượng tốt nhất",
      date: "18/06/2025",
      category: "Hoạt động"
    }
  ];

  // Expanded sidebar news data
  const allSidebarNews = [
    {
      id: 1,
      title: "Đảm bảo cấp nước sạch trong mùa mưa",
      date: "04/07/2025",
      category: "Tin tức",
      slug: "dam-bao-cap-nuoc-sach-trong-mua-mua"
    },
    {
      id: 2,
      title: "Đại hội đại biểu Đảng bộ Tổng Công ty Cấp nước Sài Gòn lần thứ V, nhiệm kỳ 2025-2030",
      date: "27/06/2025",
      category: "Hoạt động",
      slug: "dai-hoi-dai-bieu-dang-bo-tong-cong-ty-cap-nuoc-sai-gon"
    },
    {
      id: 3,
      title: "Nhấn mạnh các sáng kiến đảm bảo công tác cấp nước an toàn",
      date: "18/06/2025",
      category: "Công nghệ",
      slug: "nhan-manh-cac-sang-kien-dam-bao-cong-tac-cap-nuoc-an-toan"
    },
    {
      id: 4,
      title: "Chuẩn hóa quy trình cấp nước",
      date: "18/06/2025",
      category: "Quy định",
      slug: "chuan-hoa-quy-trinh-cap-nuoc"
    },
    {
      id: 5,
      title: "Sự hài lòng của khách hàng là thước đo hiệu quả",
      date: "18/06/2025",
      category: "Dịch vụ",
      slug: "su-hai-long-cua-khach-hang-la-thuoc-do-hieu-qua"
    },
    {
      id: 6,
      title: "Công ty CPCN Gia Định tổ chức lớp đào tạo 'Ứng dụng AI trong công việc'",
      date: "06/06/2025",
      category: "Đào tạo",
      slug: "cong-ty-cpcn-gia-dinh-to-chuc-lop-dao-tao-ung-dung-ai"
    },
    {
      id: 7,
      title: "SAWACO: Đổi mới sáng tạo và chuyển đổi số phục vụ cung cấp nước sạch",
      date: "06/06/2025",
      category: "Chuyển đổi số",
      slug: "sawaco-doi-moi-sang-tao-va-chuyen-doi-so-phuc-vu-cung-cap-nuoc-sach"
    },
    {
      id: 8,
      title: "Triển khai công nghệ IoT trong hệ thống cấp nước",
      date: "05/06/2025",
      category: "Công nghệ",
      slug: "trien-khai-cong-nghe-iot-trong-he-thong-cap-nuoc"
    },
    {
      id: 9,
      title: "Quy trình xử lý nước thải sinh hoạt mới",
      date: "04/06/2025",
      category: "Môi trường",
      slug: "quy-trinh-xu-ly-nuoc-thai-sinh-hoat-moi"
    },
    {
      id: 10,
      title: "Chương trình tiết kiệm nước cho cộng đồng",
      date: "03/06/2025",
      category: "Cộng đồng",
      slug: "chuong-trinh-tiet-kiem-nuoc-cho-cong-dong"
    },
    {
      id: 11,
      title: "Hệ thống giám sát chất lượng nước tự động",
      date: "02/06/2025",
      category: "Công nghệ",
      slug: "he-thong-giam-sat-chat-luong-nuoc-tu-dong"
    },
    {
      id: 12,
      title: "Kế hoạch mở rộng hệ thống cấp nước năm 2025",
      date: "01/06/2025",
      category: "Dự án",
      slug: "ke-hoach-mo-rong-he-thong-cap-nuoc-nam-2025"
    },
    {
      id: 13,
      title: "Đào tạo kỹ thuật viên vận hành hệ thống cấp nước",
      date: "31/05/2025",
      category: "Đào tạo",
      slug: "dao-tao-ky-thuat-vien-van-hanh-he-thong-cap-nuoc"
    },
    {
      id: 14,
      title: "Ứng dụng trí tuệ nhân tạo trong quản lý nước",
      date: "30/05/2025",
      category: "AI",
      slug: "ung-dung-tri-tue-nhan-tao-trong-quan-ly-nuoc"
    },
    {
      id: 15,
      title: "Chính sách hỗ trợ người dân sử dụng nước sạch",
      date: "29/05/2025",
      category: "Chính sách",
      slug: "chinh-sach-ho-tro-nguoi-dan-su-dung-nuoc-sach"
    }
  ];



  // Expanded news list data
  const allNewsList = [
    {
      id: 1,
      title: "Thư mời chào giá dự án 'Sửa chữa, lớp mai tôn khu vực chứa máy lý tâm 2 tại Nhà máy bể tông...'",
      date: "08/07/2025",
      image: "https://picsum.photos/300/200?random=10",
      category: "Dự án",
      slug: "thu-moi-chao-gia-du-an-sua-chua-lop-mai-ton"
    },
    {
      id: 2,
      title: "Hội nghị Ban Thường vụ Hội Cấp Thoát nước Việt Nam nhiệm kỳ VI (2020 -2025)",
      date: "07/07/2025",
      image: "https://picsum.photos/300/200?random=11",
      category: "Hội nghị",
      slug: "hoi-nghi-ban-thuong-vu-hoi-cap-thoat-nuoc-viet-nam"
    },
    {
      id: 3,
      title: "Lễ phát thường học sinh giỏi và trao học bổng Nguyễn Thị Định",
      date: "07/07/2025",
      image: "https://picsum.photos/300/200?random=12",
      category: "Giáo dục",
      slug: "le-phat-thuong-hoc-sinh-gioi-va-trao-hoc-bong-nguyen-thi-dinh"
    },
    {
      id: 4,
      title: "Kỷ niệm 55 năm thực hiện di chúc của Chủ tịch Hồ Chí Minh",
      date: "15/05/2025",
      image: "https://picsum.photos/300/200?random=13",
      category: "Kỷ niệm",
      slug: "ky-niem-55-nam-thuc-hien-di-chuc-cua-chu-tich-ho-chi-minh"
    },
    {
      id: 5,
      title: "Triển khai dự án cấp nước sạch cho vùng nông thôn",
      date: "14/05/2025",
      image: "https://picsum.photos/300/200?random=14",
      category: "Dự án",
      slug: "trien-khai-du-an-cap-nuoc-sach-cho-vung-nong-thon"
    },
    {
      id: 6,
      title: "Công nghệ lọc nước tiên tiến mới nhất năm 2025",
      date: "13/05/2025",
      image: "https://picsum.photos/300/200?random=15",
      category: "Công nghệ",
      slug: "cong-nghe-loc-nuoc-tien-tien-moi-nhat-nam-2025"
    },
    {
      id: 7,
      title: "Hệ thống cấp nước thông minh cho thành phố tương lai",
      date: "12/05/2025",
      image: "https://picsum.photos/300/200?random=16",
      category: "Smart City",
      slug: "he-thong-cap-nuoc-thong-minh-cho-thanh-pho-tuong-lai"
    },
    {
      id: 8,
      title: "Chương trình bảo vệ nguồn nước cho thế hệ tương lai",
      date: "11/05/2025",
      image: "https://picsum.photos/300/200?random=17",
      category: "Môi trường",
      slug: "chuong-trinh-bao-ve-nguon-nuoc-cho-the-he-tuong-lai"
    },
    {
      id: 9,
      title: "Đào tạo nguồn nhân lực chuyên nghiệp trong ngành cấp nước",
      date: "10/05/2025",
      image: "https://picsum.photos/300/200?random=18",
      category: "Đào tạo",
      slug: "dao-tao-nguon-nhan-luc-chuyen-nghiep-trong-nganh-cap-nuoc"
    },
    {
      id: 10,
      title: "Ứng dụng blockchain trong quản lý chất lượng nước",
      date: "09/05/2025",
      image: "https://picsum.photos/300/200?random=19",
      category: "Blockchain",
      slug: "ung-dung-blockchain-trong-quan-ly-chat-luong-nuoc"
    },
    {
      id: 11,
      title: "Giải pháp tiết kiệm nước thông minh cho hộ gia đình",
      date: "08/05/2025",
      image: "https://picsum.photos/300/200?random=20",
      category: "Giải pháp",
      slug: "giai-phap-tiet-kiem-nuoc-thong-minh-cho-ho-gia-dinh"
    },
    {
      id: 12,
      title: "Hội thảo quốc tế về công nghệ xử lý nước",
      date: "07/05/2025",
      image: "https://picsum.photos/300/200?random=21",
      category: "Hội thảo",
      slug: "hoi-thao-quoc-te-ve-cong-nghe-xu-ly-nuoc"
    }
  ];

  // Expanded popular news data
  const allPopularNews = [
    {
      id: 1,
      title: "Định mức tiền nước theo nhân khẩu: Có lợi hơn cho người dân",
      date: "08/07/2025",
      image: "https://picsum.photos/300/200?random=30",
      views: "1.2K",
      slug: "dinh-muc-tien-nuoc-theo-nhan-khau-co-loi-hon-cho-nguoi-dan"
    },
    {
      id: 2,
      title: "Quy trình xử lý nước thải công nghiệp mới nhất",
      date: "07/07/2025",
      image: "https://picsum.photos/300/200?random=31",
      views: "980",
      slug: "quy-trinh-xu-ly-nuoc-thai-cong-nghiep-moi-nhat"
    },
    {
      id: 3,
      title: "Công nghệ lọc nước tiên tiến nhất hiện nay",
      date: "06/07/2025",
      image: "https://picsum.photos/300/200?random=32",
      views: "756",
      slug: "cong-nghe-loc-nuoc-tien-tien-nhat-hien-nay"
    },
    {
      id: 4,
      title: "Hệ thống cấp nước thông minh cho thành phố",
      date: "05/07/2025",
      image: "https://picsum.photos/300/200?random=33",
      views: "645",
      slug: "he-thong-cap-nuoc-thong-minh-cho-thanh-pho"
    },
    {
      id: 5,
      title: "Ứng dụng AI trong kiểm soát chất lượng nước",
      date: "04/07/2025",
      image: "https://picsum.photos/300/200?random=34",
      views: "532",
      slug: "ung-dung-ai-trong-kiem-soat-chat-luong-nuoc"
    },
    {
      id: 6,
      title: "Mô hình quản lý nước bền vững cho đô thị",
      date: "03/07/2025",
      image: "https://picsum.photos/300/200?random=35",
      views: "489",
      slug: "mo-hinh-quan-ly-nuoc-ben-vung-cho-do-thi"
    },
    {
      id: 7,
      title: "Tiêu chuẩn nước sạch mới theo WHO 2025",
      date: "02/07/2025",
      image: "https://picsum.photos/300/200?random=36",
      views: "423",
      slug: "tieu-chuan-nuoc-sach-moi-theo-who-2025"
    },
    {
      id: 8,
      title: "Hệ thống cảnh báo sớm ô nhiễm nguồn nước",
      date: "01/07/2025",
      image: "https://picsum.photos/300/200?random=37",
      views: "398",
      slug: "he-thong-canh-bao-som-o-nhiem-nguon-nuoc"
    },
    {
      id: 9,
      title: "Giải pháp xử lý nước nhiễm mặn hiệu quả",
      date: "30/06/2025",
      image: "https://picsum.photos/300/200?random=38",
      views: "367",
      slug: "giai-phap-xu-ly-nuoc-nhiem-man-hieu-qua"
    },
    {
      id: 10,
      title: "Công nghệ nano trong xử lý nước thải",
      date: "29/06/2025",
      image: "https://picsum.photos/300/200?random=39",
      views: "345",
      slug: "cong-nghe-nano-trong-xu-ly-nuoc-thai"
    },
    {
      id: 11,
      title: "Kế hoạch phát triển hạ tầng cấp nước 2025-2030",
      date: "28/06/2025",
      image: "https://picsum.photos/300/200?random=40",
      views: "321",
      slug: "ke-hoach-phat-trien-ha-tang-cap-nuoc-2025-2030"
    },
    {
      id: 12,
      title: "Đổi mới công nghệ trong ngành cấp nước Việt Nam",
      date: "27/06/2025",
      image: "https://picsum.photos/300/200?random=41",
      views: "298",
      slug: "doi-moi-cong-nghe-trong-nganh-cap-nuoc-viet-nam"
    }
  ];

  // Pagination logic
  const getSidebarNews = () => {
    const startIndex = (sidebarPage - 1) * sidebarItemsPerPage;
    const endIndex = startIndex + sidebarItemsPerPage;
    return allSidebarNews.slice(startIndex, endIndex);
  };

  const getNewsList = () => {
    const startIndex = (newsListPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allNewsList.slice(startIndex, endIndex);
  };

  const getPopularNews = () => {
    const startIndex = (popularNewsPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allPopularNews.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const sidebarTotalPages = Math.ceil(allSidebarNews.length / sidebarItemsPerPage);
  const newsListTotalPages = Math.ceil(allNewsList.length / itemsPerPage);
  const popularNewsTotalPages = Math.ceil(allPopularNews.length / itemsPerPage);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Content - Hero Slider */}
          <div className="lg:col-span-3">
            {/* Hero Slider */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 rounded-lg shadow-xl overflow-hidden mb-6 border-4 border-yellow-400 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Hero Tin Tức 24/7"
                  className="w-full h-80 object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                  <h2 className="text-4xl font-extrabold mb-3 drop-shadow-lg">
                    Tin Tức 24/7 - Nơi Tin Cậy Cho Mọi Nhà
                  </h2>
                  <p className="text-lg text-yellow-200 mb-4 font-semibold drop-shadow">
                    Cập nhật nhanh nhất, chính xác nhất, thương hiệu tin tức hàng đầu Việt Nam.
                  </p>
                  <div className="flex items-center gap-4 text-base font-medium">
                    <span className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full shadow">Tin Nổi Bật</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold shadow-lg text-lg z-20 animate-bounce">
                  #1 Tin Tức Việt
                </div>
              </div>

              {/* Thanh điều hướng nhỏ các tin nổi bật */}
              {/* <div className="flex gap-2 p-4 bg-gradient-to-r from-yellow-100 via-white to-blue-100">
                {heroNews.map((news, index) => (
                  <div key={news.id} className="flex-1 cursor-pointer group transition-transform hover:scale-105">
                    <a href={`/tin-tuc/${news.slug || news.id}`}>
                      <img
                        src={news.image}
                        alt=""
                        className="w-full h-16 object-cover rounded"
                        onError={handleImageError}
                      />
                      <p className="text-xs mt-1 text-gray-600 line-clamp-2">{news.title}</p>
                    </a>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="flex border-b overflow-x-auto">
                {categories?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === tab?.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {tab?.name}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getNewsList().slice(0, 4).map((news) => (
                    <div key={news.id} className="flex gap-4 group cursor-pointer">
                      <a href={`/tin-tuc/${news.slug || news.id}`} className="flex gap-4 w-full">
                        <img
                          src={news.image}
                          alt=""
                          className="w-20 h-16 object-cover rounded flex-shrink-0"
                          onError={handleImageError}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {news.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{news.category}</span>
                            <span>{news.date}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Banner Ads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-2">NHIỆT LIỆT CHÀO MỪNG</h3>
                <p className="text-sm opacity-90">ĐẠI HỘI ĐẠI BIỂU ĐẢNG BỘ TỔNG CÔNG TY CẤP NƯỚC SÀI GÒN</p>
                <p className="text-sm opacity-90">THẠCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN LẦN THỨ V</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-2">SAWACO CSKH</h3>
                <p className="text-sm opacity-90">Tải Ứng dụng và kích hoạt tài khoản tại đây</p>
                <div className="mt-4">
                  <div className="bg-white w-16 h-16 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Tin mới nhất</h3>
                <div className="space-y-4">
                  {loading ? (
                    <p>Đang tải tin mới nhất...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    latestNews?.map((news) => (
                      <div key={news.id} className="group cursor-pointer">
                        <a href={`/tin-tuc/${news.slug || news.id}`}>
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-2">
                              {news.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 ml-4 text-xs text-gray-500">
                            {news.category && (
                              <>
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{news?.tags?.length > 0 ? news?.tags?.map((tag) => tag.name).join(', ') : ''}</span>
                                <span>•</span>
                              </>
                            )}
                            <span>{formatDate(news?.createAt)}</span>
                          </div>
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar Pagination */}
              {!loading && !error && (
                <div className="border-t border-gray-200">
                  <Pagination
                    currentPage={sidebarPage}
                    totalPages={Math.ceil(totalLatestNews / sidebarItemsPerPage)}
                    onPageChange={setSidebarPage}
                    itemsPerPage={sidebarItemsPerPage}
                    totalItems={totalLatestNews}
                  />
                </div>
              )}
            </div>

            {/* Additional Banners */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-4 shadow-md">
                <h4 className="font-bold text-white mb-2">KỶ NIỆM 55 NĂM</h4>
                <p className="text-sm text-white opacity-90">THỰC HIỆN DI CHÚC CỦA CHỦ TỊCH HỒ CHÍ MINH</p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 shadow-md">
                <h4 className="font-bold text-white mb-2">Radio</h4>
                <p className="text-sm text-white opacity-90">Nước sạch và cuộc sống</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom News Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Tin mới */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-l-lg">
                  <h3 className="font-bold text-lg">THÔNG TIN</h3>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-r-lg">
                  <h3 className="font-bold text-lg">DỰ ÁN</h3>
                </div>
              </div>
              <div className="space-y-4">
                {getNewsList().map((news) => (
                  <div key={news.id} className="flex gap-4 group cursor-pointer pb-4 border-b border-gray-100 last:border-b-0">
                    <a href={`/tin-tuc/${news.slug || news.id}`} className="flex gap-4 w-full">
                      <img
                        src={news.image}
                        alt=""
                        className="w-24 h-18 object-cover rounded flex-shrink-0"
                        onError={handleImageError}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                          {news.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">{news.category}</span>
                          <span>{news.date}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* News List Pagination */}
            <Pagination
              currentPage={newsListPage}
              totalPages={newsListTotalPages}
              onPageChange={setNewsListPage}
              itemsPerPage={itemsPerPage}
              totalItems={allNewsList.length}
            />
          </div>

          {/* Xem nhiều */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-6 text-blue-600">Xem nhiều</h3>
              <div className="space-y-4">
                {loading ? (
                  <p>Đang tải bài viết xem nhiều...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : postOutstandings && postOutstandings.length > 0 ? (
                  postOutstandings.map((news) => (
                    <div key={news.id} className="flex gap-4 group cursor-pointer pb-4 border-b border-gray-100 last:border-b-0">
                      <a href={`/tin-tuc/${news.slug || news.id}`} className="flex gap-4 w-full">
                        <img
                          src={news?.image || "https://picsum.photos/300/200?random=36"}
                          alt={news?.title || "Ảnh bài viết"}
                          className="w-24 h-18 object-cover rounded flex-shrink-0"
                          onError={handleImageError}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                            {news.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{formatDate(news?.createAt)}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              {news?.view}
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))
                ) : (
                  <p>Không có bài viết nào.</p>
                )}
              </div>
            </div>

            {/* Popular News Pagination */}
            {!loading && !error && totalPostOutstandings > 0 && (
              <Pagination
                currentPage={popularNewsPage}
                totalPages={Math.ceil(totalPostOutstandings / itemsPerPage)}
                onPageChange={setPopularNewsPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalPostOutstandings}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
