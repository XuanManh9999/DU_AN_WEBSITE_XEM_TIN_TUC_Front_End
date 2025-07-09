import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectUser } from '../../redux/slice/useSlice';
import Pagination from '../Pagination';

const LikedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const isLogin = useSelector(selectIsLogin);
    const user = useSelector(selectUser);
    const articlesPerPage = 9;

    // Mock data cho bài viết đã thích
    const mockLikedArticles = [
        {
            id: 1,
            title: "Công nghệ lọc nước hiện đại tại nhà máy nước",
            excerpt: "Hệ thống lọc nước tiên tiến với công nghệ RO và UV đảm bảo chất lượng nước sạch cho toàn thành phố...",
            image: "https://picsum.photos/400/250?random=21",
            date: "2024-01-18",
            author: "Lê Thị C",
            category: "Công nghệ",
            subcategory: "AI & Tech",
            views: 3456,
            slug: "cong-nghe-loc-nuoc-hien-dai-nha-may-nuoc",
            likedDate: "2024-01-20"
        },
        {
            id: 2,
            title: "Chất lượng nước sinh hoạt đạt tiêu chuẩn quốc tế",
            excerpt: "Kết quả kiểm tra chất lượng nước sinh hoạt trong tháng 1/2024 cho thấy các chỉ số đều đạt tiêu chuẩn WHO...",
            image: "https://picsum.photos/400/250?random=22",
            date: "2024-01-17",
            author: "Phạm Văn E",
            category: "Tin tức",
            subcategory: "Tin nóng",
            views: 2345,
            slug: "chat-luong-nuoc-sinh-hoat-dat-tieu-chuan-quoc-te",
            likedDate: "2024-01-19"
        },
        {
            id: 3,
            title: "Giải chạy bộ SAWACO Run 2024",
            excerpt: "Sự kiện chạy bộ thường niên với hơn 3000 người tham gia, quyên góp ủng hộ các hoạt động từ thiện...",
            image: "https://picsum.photos/400/250?random=23",
            date: "2024-01-16",
            author: "Nguyễn Thể Thao",
            category: "Thể thao",
            subcategory: "Khác",
            views: 4567,
            slug: "giai-chay-bo-sawaco-run-2024",
            likedDate: "2024-01-18"
        },
        {
            id: 4,
            title: "Báo cáo phát triển bền vững năm 2023",
            excerpt: "Tổng kết các hoạt động phát triển bền vững, bảo vệ môi trường và trách nhiệm xã hội của SAWACO...",
            image: "https://picsum.photos/400/250?random=24",
            date: "2024-01-15",
            author: "Trần Kinh Doanh",
            category: "Kinh doanh",
            subcategory: "Báo cáo",
            views: 1234,
            slug: "bao-cao-phat-trien-ben-vung-2023",
            likedDate: "2024-01-17"
        },
        {
            id: 5,
            title: "Liên hoan văn hóa dân tộc",
            excerpt: "Chương trình văn hóa đặc sắc với sự tham gia của 54 dân tộc, thể hiện tinh thần đoàn kết...",
            image: "https://picsum.photos/400/250?random=25",
            date: "2024-01-14",
            author: "Lê Giải Trí",
            category: "Giải trí",
            subcategory: "Văn hóa",
            views: 2890,
            slug: "lien-hoan-van-hoa-dan-toc",
            likedDate: "2024-01-16"
        },
        {
            id: 6,
            title: "Mẹo tiết kiệm nước trong mùa khô",
            excerpt: "Những cách thực tế giúp mỗi gia đình tiết kiệm nước hiệu quả trong mùa khô hạn...",
            image: "https://picsum.photos/400/250?random=26",
            date: "2024-01-13",
            author: "Nguyễn Đời Sống",
            category: "Đời sống",
            subcategory: "Gia đình",
            views: 3456,
            slug: "meo-tiet-kiem-nuoc-trong-mua-kho",
            likedDate: "2024-01-15"
        },
        {
            id: 7,
            title: "Hệ thống cấp nước thông minh 4.0",
            excerpt: "Ứng dụng IoT và AI để tự động hóa việc quản lý và vận hành hệ thống cấp nước...",
            image: "https://picsum.photos/400/250?random=27",
            date: "2024-01-12",
            author: "Phan Công Nghệ",
            category: "Công nghệ",
            subcategory: "AI & Tech",
            views: 5678,
            slug: "he-thong-cap-nuoc-thong-minh-4-0",
            likedDate: "2024-01-14"
        },
        {
            id: 8,
            title: "Đầu tư phát triển nguồn nhân lực",
            excerpt: "Chương trình đào tạo nâng cao kỹ năng cho đội ngũ nhân viên, đáp ứng nhu cầu phát triển...",
            image: "https://picsum.photos/400/250?random=28",
            date: "2024-01-11",
            author: "Võ Thị G",
            category: "Tin tức",
            subcategory: "Mới nhất",
            views: 2345,
            slug: "dau-tu-phat-trien-nguon-nhan-luc",
            likedDate: "2024-01-13"
        },
        {
            id: 9,
            title: "Cần Thơ Tennis Open 2024",
            excerpt: "Giải tennis mở rộng với sự tham gia của các tay vợt hàng đầu khu vực Đồng bằng sông Cửu Long...",
            image: "https://picsum.photos/400/250?random=29",
            date: "2024-01-10",
            author: "Lê Thể Thao",
            category: "Thể thao",
            subcategory: "Tennis",
            views: 3456,
            slug: "can-tho-tennis-open-2024",
            likedDate: "2024-01-12"
        },
        {
            id: 10,
            title: "Nghiên cứu khoa học về chất lượng nước",
            excerpt: "Các nghiên cứu mới nhất về công nghệ xử lý nước và kiểm tra chất lượng nước sinh hoạt...",
            image: "https://picsum.photos/400/250?random=30",
            date: "2024-01-09",
            author: "Tiến sĩ Hoàng",
            category: "Công nghệ",
            subcategory: "Khoa học",
            views: 2345,
            slug: "nghien-cuu-khoa-hoc-ve-chat-luong-nuoc",
            likedDate: "2024-01-11"
        },
        {
            id: 11,
            title: "Lễ hội ẩm thực nước sạch",
            excerpt: "Sự kiện kết hợp giữa ẩm thực và tuyên truyền về tầm quan trọng của nước sạch...",
            image: "https://picsum.photos/400/250?random=31",
            date: "2024-01-08",
            author: "Nguyễn Ẩm Thực",
            category: "Đời sống",
            subcategory: "Ẩm thực",
            views: 4567,
            slug: "le-hoi-am-thuc-nuoc-sach",
            likedDate: "2024-01-10"
        },
        {
            id: 12,
            title: "Chứng khoán SAWACO tăng mạnh trong Q1",
            excerpt: "Cổ phiếu SAWACO ghi nhận mức tăng trưởng ấn tượng trong quý đầu năm 2024...",
            image: "https://picsum.photos/400/250?random=32",
            date: "2024-01-07",
            author: "Lê Kinh Doanh",
            category: "Kinh doanh",
            subcategory: "Chứng khoán",
            views: 3456,
            slug: "chung-khoan-sawaco-tang-manh-trong-q1",
            likedDate: "2024-01-09"
        }
    ];

    useEffect(() => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (isLogin) {
                // Sort by liked date (newest first)
                const sortedArticles = mockLikedArticles.sort((a, b) =>
                    new Date(b.likedDate) - new Date(a.likedDate)
                );
                setArticles(sortedArticles);
            } else {
                setArticles([]);
            }
            setLoading(false);
        }, 500);
    }, [isLogin]);

    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleImageError = (e) => {
        e.target.src = "data:image/svg+xml,%3Csvg width='400' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23374151' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
    };

    const handleUnlike = (articleId) => {
        setArticles(prev => prev.filter(article => article.id !== articleId));
    };

    if (!isLogin) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Bạn cần đăng nhập</h3>
                    <p className="text-gray-500 mb-4">Vui lòng đăng nhập để xem bài viết đã thích</p>
                    <div className="space-x-4">
                        <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Đăng nhập
                        </a>
                        <a href="/register" className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            Đăng ký
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-center py-20">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <span className="text-gray-600 font-medium">Đang tải...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                        <a href="/" className="hover:text-blue-600 transition-colors">Trang chủ</a>
                        <span>›</span>
                        <span className="text-gray-900 font-medium">Bài viết đã thích</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Bài viết đã thích</h1>
                            <p className="text-gray-600">
                                {articles.length} bài viết đã được thích
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {articles.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Chưa có bài viết nào được thích</h3>
                        <p className="text-gray-500 mb-4">Hãy thích những bài viết bạn yêu thích để lưu lại ở đây</p>
                        <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Khám phá bài viết
                        </a>
                    </div>
                ) : (
                    <>
                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentArticles.map((article) => (
                                <article key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative">
                                    <a href={`/tin-tuc/${article.slug}`} className="block">
                                        <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                                onError={handleImageError}
                                            />
                                        </div>
                                    </a>

                                    {/* Unlike button */}
                                    <button
                                        onClick={() => handleUnlike(article.id)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center shadow-lg"
                                        title="Bỏ thích bài viết"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                                    {article.subcategory}
                                                </span>
                                                <span>•</span>
                                                <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                            <a href={`/tin-tuc/${article.slug}`} className="no-underline" style={{
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                overflow: 'hidden'
                                            }}>
                                                {article.title}
                                            </a>
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3" style={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden'
                                        }}>
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>Bởi {article.author}</span>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{article.views.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                                Đã thích {new Date(article.likedDate).toLocaleDateString('vi-VN')}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LikedArticles; 