import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsLogin, selectUser } from "../../redux/slice/useSlice";
import { logout } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  FaNewspaper,
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
  FaChevronDown,
  FaGlobeAmericas,
  FaBolt
} from 'react-icons/fa';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const isLogin = useSelector(selectIsLogin);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Mock search data - trong thực tế sẽ từ API
  const mockArticles = [
    {
      id: 1,
      title: "Đảm bảo cấp nước sạch trong mùa mưa",
      category: "Tin tức",
      slug: "dam-bao-cap-nuoc-sach-trong-mua-mua",
      image: "https://picsum.photos/100/80?random=1"
    },
    {
      id: 2,
      title: "Công nghệ lọc nước tiên tiến nhất hiện nay",
      category: "Công nghệ",
      slug: "cong-nghe-loc-nuoc-tien-tien-nhat-hien-nay",
      image: "https://picsum.photos/100/80?random=2"
    },
    {
      id: 3,
      title: "Hệ thống cấp nước thông minh cho thành phố",
      category: "Smart City",
      slug: "he-thong-cap-nuoc-thong-minh-cho-thanh-pho",
      image: "https://picsum.photos/100/80?random=3"
    },
    {
      id: 4,
      title: "Quy trình xử lý nước thải công nghiệp mới nhất",
      category: "Môi trường",
      slug: "quy-trinh-xu-ly-nuoc-thai-cong-nghiep-moi-nhat",
      image: "https://picsum.photos/100/80?random=4"
    },
    {
      id: 5,
      title: "SAWACO: Đổi mới sáng tạo và chuyển đổi số",
      category: "Chuyển đổi số",
      slug: "sawaco-doi-moi-sang-tao-va-chuyen-doi-so",
      image: "https://picsum.photos/100/80?random=5"
    },
    {
      id: 6,
      title: "Ứng dụng AI trong kiểm soát chất lượng nước",
      category: "AI",
      slug: "ung-dung-ai-trong-kiem-soat-chat-luong-nuoc",
      image: "https://picsum.photos/100/80?random=6"
    },
    {
      id: 7,
      title: "Triển khai công nghệ IoT trong hệ thống cấp nước",
      category: "IoT",
      slug: "trien-khai-cong-nghe-iot-trong-he-thong-cap-nuoc",
      image: "https://picsum.photos/100/80?random=7"
    }
  ];

  // Mock search function với delay để simulate API call
  const searchArticles = async (term) => {
    if (!term.trim()) return [];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const filtered = mockArticles.filter(article =>
      article.title.toLowerCase().includes(term.toLowerCase()) ||
      article.category.toLowerCase().includes(term.toLowerCase())
    );

    return filtered.slice(0, 5); // Chỉ hiển thị 5 kết quả đầu
  };

  // Debounce search with loading
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearchLoading(true);
        setIsSearchOpen(true);
        setSelectedIndex(-1);

        try {
          const results = await searchArticles(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearchLoading(false);
        }
      } else {
        setSearchResults([]);
        setIsSearchOpen(false);
        setIsSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSelectedIndex(-1);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isSearchOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          window.location.href = `/tin-tuc/${searchResults[selectedIndex].slug}`;
        }
        break;
      case 'Escape':
        setIsSearchOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Chuyển đến trang search với query
      window.location.href = `/tim-kiem?q=${encodeURIComponent(searchTerm)}`;
    }
  };
  const handleLogout = () => {
    setIsUserMenuOpen(false);
    dispatch(logout());
    navigate("/dang-nhap");
  };


  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg width='100' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='12' fill='%23374151' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
  };

  const menuItems = [
    {
      title: "TRANG CHỦ",
      path: "/",
    },
    {
      title: "TIN TỨC",
      path: "/tin-tuc",
      submenu: [
        { title: "Tin mới nhất", path: "/tin-tuc/moi-nhat" },
        { title: "Tin nóng", path: "/tin-tuc/tin-nong" },
        { title: "Tin trong nước", path: "/tin-tuc/trong-nuoc" },
        { title: "Tin quốc tế", path: "/tin-tuc/quoc-te" },
      ],
    },
    {
      title: "THỂ THAO",
      path: "/the-thao",
      submenu: [
        { title: "Bóng đá", path: "/the-thao/bong-da" },
        { title: "Bóng rổ", path: "/the-thao/bong-ro" },
        { title: "Tennis", path: "/the-thao/tennis" },
        { title: "Thể thao khác", path: "/the-thao/khac" },
      ],
    },
    {
      title: "CÔNG NGHỆ",
      path: "/cong-nghe",
      submenu: [
        { title: "Điện thoại", path: "/cong-nghe/dien-thoai" },
        { title: "Laptop", path: "/cong-nghe/laptop" },
        { title: "AI & Tech", path: "/cong-nghe/ai-tech" },
        { title: "Gaming", path: "/cong-nghe/gaming" },
      ],
    },
    {
      title: "KINH DOANH",
      path: "/kinh-doanh",
      submenu: [
        { title: "Chứng khoán", path: "/kinh-doanh/chung-khoan" },
        { title: "Ngân hàng", path: "/kinh-doanh/ngan-hang" },
        { title: "Bất động sản", path: "/kinh-doanh/bat-dong-san" },
        { title: "Khởi nghiệp", path: "/kinh-doanh/khoi-nghiep" },
      ],
    },
    {
      title: "GIẢI TRÍ",
      path: "/giai-tri",
      submenu: [
        { title: "Phim ảnh", path: "/giai-tri/phim-anh" },
        { title: "Âm nhạc", path: "/giai-tri/am-nhac" },
        { title: "Sao Việt", path: "/giai-tri/sao-viet" },
        { title: "Thời trang", path: "/giai-tri/thoi-trang" },
      ],
    },
    {
      title: "ĐỜI SỐNG",
      path: "/doi-song",
      submenu: [
        { title: "Sức khỏe", path: "/doi-song/suc-khoe" },
        { title: "Gia đình", path: "/doi-song/gia-dinh" },
        { title: "Ẩm thực", path: "/doi-song/am-thuc" },
        { title: "Du lịch", path: "/doi-song/du-lich" },
      ],
    },
    {
      title: "LIÊN HỆ",
      path: "/lien-he",
    },
  ];

  const userMenuItems = [
    {
      title: "Bài viết đã lưu",
      path: "/bai-viet-da-luu",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )
    },
    {
      title: "Bài viết đã thích",
      path: "/bai-viet-da-thich",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Quản lý tài khoản",
      path: "/quan-ly-tai-khoan",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Đăng xuất",
      onClick: handleLogout,
      path: "/dang-nhap",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      isLogout: true
    }
  ];

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };


  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-[70px]">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center no-underline group">
            <div className="relative flex items-center">
              {/* Logo Icon Container */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <FaNewspaper className="w-6 h-6 text-white" />
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl animate-pulse opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Lightning Effect */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full flex items-center justify-center shadow-md group-hover:animate-bounce">
                  <FaBolt className="w-2 h-2 text-orange-600" />
                </div>
              </div>

              {/* Logo Text */}
              <div className="ml-3 flex flex-col">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-white leading-none tracking-tight">
                    NEWS
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent leading-none tracking-tight">
                    24H
                  </span>
                </div>
                <div className="flex items-center mt-0.5">
                  <FaGlobeAmericas className="w-3 h-3 text-blue-300 mr-1" />
                  <span className="text-xs text-blue-200 font-medium uppercase tracking-wider">
                    TIN TỨC NHANH
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur-lg"></div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 mx-10 hidden md:block">
          <ul className="flex justify-center items-center gap-1 list-none m-0 p-0">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.path}
                  className="text-white no-underline px-4 py-5 flex items-center font-medium text-sm transition-all duration-300 uppercase tracking-wide hover:bg-white/10 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 focus:outline-offset-2"
                >
                  {item.title}
                  {item.submenu && (
                    <span className={`ml-2 text-xs transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  )}
                </a>
                {item.submenu && (
                  <ul className={`absolute top-full left-0 bg-white rounded-lg shadow-2xl list-none m-0 py-3 min-w-[200px] z-50 transition-all duration-300 ${activeDropdown === index
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-3'
                    }`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex} className="m-0">
                        <a
                          href={subItem.path}
                          className="text-gray-800 no-underline px-5 py-3 block text-sm transition-all duration-300 hover:bg-gray-100 hover:text-blue-700 hover:pl-6"
                        >
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 focus-within:bg-white/20 hidden sm:flex">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                className="bg-transparent border-none text-white px-4 py-2 text-sm w-36 lg:w-52 outline-none placeholder-white/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setIsSearchOpen(true)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="submit"
                className="bg-transparent border-none text-white px-4 py-2 cursor-pointer flex items-center transition-all duration-300 hover:text-yellow-400 focus:outline-2 focus:outline-yellow-400 focus:outline-offset-2"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </form>

            {/* Search Results Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-gray-500 font-medium mb-2 px-2">
                    Kết quả tìm kiếm cho "{searchTerm}"
                  </div>

                  {/* Loading State */}
                  {isSearchLoading && (
                    <div className="py-8">
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">Đang tìm kiếm...</span>
                      </div>
                    </div>
                  )}

                  {/* Results List */}
                  {!isSearchLoading && searchResults.length > 0 && (
                    <>
                      <ul className="list-none m-0 p-0">
                        {searchResults.map((article, index) => (
                          <li key={article.id} className="mb-1">
                            <a
                              href={`/tin-tuc/${article.slug}`}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 no-underline ${selectedIndex === index ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                }`}
                            >
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                                onError={handleImageError}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm leading-tight" style={{
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 2,
                                  overflow: 'hidden'
                                }}>
                                  {article.title}
                                </p>
                                <p className="text-blue-600 text-xs mt-1 font-medium">
                                  {article.category}
                                </p>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                      {searchResults.length === 5 && (
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <a
                            href={`/tim-kiem?q=${encodeURIComponent(searchTerm)}`}
                            className="block text-center text-blue-600 text-sm font-medium py-2 hover:bg-gray-50 rounded-lg transition-all duration-300 no-underline"
                          >
                            Xem tất cả kết quả tìm kiếm
                          </a>
                        </div>
                      )}
                    </>
                  )}
                  {/* No Results */}
                  {!isSearchLoading && searchTerm && searchResults.length === 0 && (
                    <div className="text-center py-4">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">Không tìm thấy kết quả nào cho "{searchTerm}"</p>
                      <p className="text-gray-400 text-xs mt-1">Thử với từ khóa khác</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Authentication Section */}
          {isLogin ? (
            /* User Menu - When logged in */
            <div className="relative hidden md:block" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full py-2 px-3 transition-all duration-300 focus:outline-2 focus:outline-yellow-400 focus:outline-offset-2"
              >
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-semibold text-sm">
                  {getInitials(user?.name || user?.email)}
                </div>
                <span
                  className="text-white text-sm hidden lg:block max-w-[120px] truncate"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                  title={user?.username || user?.email || "User"}
                >
                  {user?.username || user?.email || "User"}
                </span>
                <FaChevronDown
                  className={`w-4 h-4 text-white transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* User Dropdown */}
              <div
                className={`absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl py-2 transition-all duration-300 ${isUserMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3'
                  }`}
                style={{ overflowX: 'hidden', wordBreak: 'break-word' }}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p
                    className="text-sm font-medium text-gray-900 max-w-[180px] truncate"
                    style={{ wordBreak: 'break-all' }}
                    title={user?.username || "User"}
                  >
                    {user?.username || "User"}
                  </p>
                  <p
                    className="text-sm text-gray-500 max-w-[180px] truncate"
                    title={user?.email}
                    style={{ wordBreak: 'break-all' }}
                  >
                    {user?.email}
                  </p>
                </div>
                <Link
                  to="/quan-ly-tai-khoan"
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 hover:bg-gray-100 text-gray-700 hover:text-blue-700"
                >
                  <FaUser className="w-4 h-4" />
                  Tài khoản của tôi
                </Link>
                <Link
                  to="/bai-viet-da-luu"
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 hover:bg-gray-100 text-gray-700 hover:text-blue-700"
                >
                  <FaNewspaper className="w-4 h-4" />
                  Bài viết đã lưu
                </Link>
                <Link
                  to="/bai-viet-da-thich"
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 hover:bg-gray-100 text-gray-700 hover:text-blue-700"
                >
                  <FaBolt className="w-4 h-4" />
                  Bài viết đã thích
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                >
                  <FaTimes className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            /* Login/Register Buttons - When not logged in */
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/dang-nhap"
                className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-all duration-300 focus:outline-2 focus:outline-yellow-400 focus:outline-offset-2"
              >
                Đăng nhập
              </Link>
              <Link
                to="/dang-ky"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-2 focus:outline-yellow-400 focus:outline-offset-2"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col bg-transparent border-none cursor-pointer p-1 gap-1 focus:outline-2 focus:outline-yellow-400 focus:outline-offset-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6 text-white" />
            ) : (
              <FaBars className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`md:hidden bg-blue-900 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="p-5">
          {/* Mobile Search */}
          <div className="mb-4 sm:hidden relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white/10 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent border-none text-white px-4 py-2 text-sm w-full outline-none placeholder-white/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setIsSearchOpen(true)}
                onKeyDown={handleKeyDown}
              />
              <button type="submit" className="bg-transparent border-none text-white px-4 py-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {/* Mobile Search Results */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                <div className="p-3">
                  <div className="text-xs text-gray-500 font-medium mb-3">
                    Kết quả tìm kiếm cho "{searchTerm}"
                  </div>

                  {/* Mobile Loading State */}
                  {isSearchLoading && (
                    <div className="py-6">
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <div className="w-6 h-6 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">Đang tìm kiếm...</span>
                      </div>
                    </div>
                  )}

                  {/* Mobile Results List */}
                  {!isSearchLoading && searchResults.length > 0 && (
                    <>
                      <ul className="list-none m-0 p-0">
                        {searchResults.map((article, index) => (
                          <li key={article.id} className="mb-2">
                            <a
                              href={`/tin-tuc/${article.slug}`}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 no-underline ${selectedIndex === index ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                }`}
                            >
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                onError={handleImageError}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm leading-tight" style={{
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 2,
                                  overflow: 'hidden'
                                }}>
                                  {article.title}
                                </p>
                                <p className="text-blue-600 text-xs mt-1 font-medium">
                                  {article.category}
                                </p>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                      {searchResults.length === 5 && (
                        <div className="border-t border-gray-100 mt-3 pt-3">
                          <a
                            href={`/tim-kiem?q=${encodeURIComponent(searchTerm)}`}
                            className="block text-center text-blue-600 text-sm font-medium py-2 hover:bg-gray-50 rounded-lg transition-all duration-300 no-underline"
                          >
                            Xem tất cả kết quả
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  {/* Mobile No Results */}
                  {!isSearchLoading && searchTerm && searchResults.length === 0 && (
                    <div className="text-center py-4">
                      <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">Không tìm thấy kết quả nào cho "{searchTerm}"</p>
                      <p className="text-gray-400 text-xs mt-1">Thử với từ khóa khác</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Authentication */}
          {isLogin ? (
            <div className="mb-4 pb-4 border-b border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-semibold">
                  {getInitials(user?.name || user?.email)}
                </div>
                <div>
                  <p className="text-white font-medium">{user?.name || "User"}</p>
                  <p className="text-white/70 text-sm">{user?.email}</p>
                </div>
              </div>
              {userMenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  onClick={item.isLogout ? handleLogout : undefined}
                  className={`flex items-center gap-3 py-3 text-sm transition-all duration-300 ${item.isLogout ? 'text-red-300' : 'text-white/90 hover:text-white'
                    }`}
                >
                  {item.icon}
                  {item.title}
                </a>
              ))}
            </div>
          ) : (
            <div className="mb-4 pb-4 border-b border-white/20">
              <div className="flex flex-col gap-2">
                <Link
                  to="/dang-nhap"
                  className="text-white hover:text-yellow-400 py-2 text-sm font-medium transition-all duration-300"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/dang-ky"
                  className="bg-yellow-400 text-center hover:bg-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-center"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Menu Items */}
          <ul className="list-none m-0 p-0">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-3">
                <a
                  href={item.path}
                  className="text-white no-underline py-4 block text-base font-medium border-b border-white/10 transition-all duration-300 hover:text-yellow-400 hover:pl-3"
                >
                  {item.title}
                </a>
                {item.submenu && (
                  <ul className="list-none ml-5 mt-3 p-0">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex} className="mb-2">
                        <a
                          href={subItem.path}
                          className="text-white/80 no-underline py-2 block text-sm transition-all duration-300 hover:text-yellow-400 hover:pl-3"
                        >
                          {subItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
