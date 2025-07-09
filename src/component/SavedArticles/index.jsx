import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLogin, selectUser } from '../../redux/slice/useSlice';
import Pagination from '../Pagination';

const SavedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const isLogin = useSelector(selectIsLogin);
    const user = useSelector(selectUser);
    const articlesPerPage = 9;

    // Mock data cho bài viết đã lưu
    const mockSavedArticles = [
        {
            id: 1,
            title: "Cập nhật tình hình cấp nước trong mùa khô",
            excerpt: "Tổng Công ty Cấp nước Sài Gòn đã có những giải pháp hiệu quả để đảm bảo việc cấp nước ổn định cho người dân trong mùa khô...",
            image: "https://picsum.photos/400/250?random=1",
            date: "2024-01-15",
            author: "Nguyễn Văn A",
            category: "Tin tức",
            subcategory: "Mới nhất",
            views: 1234,
            slug: "cap-nhat-tinh-hinh-cap-nuoc-mua-kho",
            savedDate: "2024-01-20"
        },
        {
            id: 2,
            title: "Ứng dụng AI trong quản lý cấp nước",
            excerpt: "Triển khai công nghệ trí tuệ nhân tạo để tối ưu hóa quy trình quản lý và phân phối nước...",
            image: "https://picsum.photos/400/250?random=15",
            date: "2024-01-15",
            author: "Nguyễn Công Nghệ",
            category: "Công nghệ",
            subcategory: "AI & Tech",
            views: 4567,
            slug: "ung-dung-ai-trong-quan-ly-cap-nuoc",
            savedDate: "2024-01-19"
        },
        {
            id: 3,
            title: "Giải bóng đá SAWACO Cup 2024",
            excerpt: "Giải đấu bóng đá thường niên của các đội tuyển nhân viên SAWACO với nhiều trận cầu hấp dẫn...",
            image: "https://picsum.photos/400/250?random=13",
            date: "2024-01-15",
            author: "Nguyễn Thể Thao",
            category: "Thể thao",
            subcategory: "Bóng đá",
            views: 3456,
            slug: "giai-bong-da-sawaco-cup-2024",
            savedDate: "2024-01-18"
        },
        {
            id: 4,
            title: "Kết quả kinh doanh Q4/2023 của SAWACO",
            excerpt: "Báo cáo kết quả kinh doanh quý 4 năm 2023 với những thành tích đáng kể...",
            image: "https://picsum.photos/400/250?random=17",
            date: "2024-01-15",
            author: "Nguyễn Kinh Doanh",
            category: "Kinh doanh",
            subcategory: "Chứng khoán",
            views: 5678,
            slug: "ket-qua-kinh-doanh-q4-2023-sawaco",
            savedDate: "2024-01-17"
        },
        {
            id: 5,
            title: "Sử dụng nước sinh hoạt an toàn",
            excerpt: "Hướng dẫn cách sử dụng nước sinh hoạt an toàn cho sức khỏe của cả gia đình...",
            image: "https://picsum.photos/400/250?random=19",
            date: "2024-01-15",
            author: "Nguyễn Đời Sống",
            category: "Đời sống",
            subcategory: "Sức khỏe",
            views: 2345,
            slug: "su-dung-nuoc-sinh-hoat-an-toan",
            savedDate: "2024-01-16"
        },
        {
            id: 6,
            title: "Triển khai hệ thống cấp nước thông minh tại TP.HCM",
            excerpt: "Dự án hệ thống cấp nước thông minh được triển khai để tối ưu hóa việc quản lý và phân phối nước cho toàn thành phố...",
            image: "https://picsum.photos/400/250?random=2",
            date: "2024-01-14",
            author: "Trần Thị B",
            category: "Tin tức",
            subcategory: "Tin nóng",
            views: 2156,
            slug: "trien-khai-he-thong-cap-nuoc-thong-minh",
            savedDate: "2024-01-15"
        },
        {
            id: 7,
            title: "Hệ thống IoT giám sát chất lượng nước",
            excerpt: "Mạng lưới cảm biến IoT giúp theo dõi chất lượng nước trong thời gian thực...",
            image: "https://picsum.photos/400/250?random=16",
            date: "2024-01-14",
            author: "Trần Công Nghệ",
            category: "Công nghệ",
            subcategory: "AI & Tech",
            views: 3245,
            slug: "he-thong-iot-giam-sat-chat-luong-nuoc",
            savedDate: "2024-01-14"
        },
        {
            id: 8,
            title: "Chương trình văn nghệ chào mừng năm mới",
            excerpt: "Đêm văn nghệ với sự tham gia của các nghệ sĩ nổi tiếng để chào mừng năm mới...",
            image: "https://picsum.photos/400/250?random=18",
            date: "2024-01-15",
            author: "Nguyễn Giải Trí",
            category: "Giải trí",
            subcategory: "Văn hóa",
            views: 3456,
            slug: "chuong-trinh-van-nghe-chao-mung-nam-moi",
            savedDate: "2024-01-13"
        },
        {
            id: 9,
            title: "Đầu tư nâng cấp hạ tầng cấp nước năm 2024",
            excerpt: "Kế hoạch đầu tư 5000 tỷ đồng để nâng cấp hạ tầng cấp nước, đảm bảo nguồn nước chất lượng cao...",
            image: "https://picsum.photos/400/250?random=4",
            date: "2024-01-12",
            author: "Phạm Thị D",
            category: "Tin tức",
            subcategory: "Mới nhất",
            views: 2834,
            slug: "dau-tu-nang-cap-ha-tang-cap-nuoc-2024",
            savedDate: "2024-01-12"
        },
        {
            id: 10,
            title: "Tiết kiệm nước trong sinh hoạt hàng ngày",
            excerpt: "Hướng dẫn các cách tiết kiệm nước hiệu quả cho gia đình, góp phần bảo vệ nguồn nước...",
            image: "https://picsum.photos/400/250?random=6",
            date: "2024-01-10",
            author: "Nguyễn Thị F",
            category: "Tin tức",
            subcategory: "Mới nhất",
            views: 2145,
            slug: "tiet-kiem-nuoc-trong-sinh-hoat-hang-ngay",
            savedDate: "2024-01-11"
        }
    ];

    useEffect(() => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (isLogin) {
                // Sort by saved date (newest first)
                const sortedArticles = mockSavedArticles.sort((a, b) =>
                    new Date(b.savedDate) - new Date(a.savedDate)
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

    const handleRemoveFromSaved = (articleId) => {
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
                    <p className="text-gray-500 mb-4">Vui lòng đăng nhập để xem bài viết đã lưu</p>
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
                        <span className="text-gray-900 font-medium">Bài viết đã lưu</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Bài viết đã lưu</h1>
                            <p className="text-gray-600">
                                {articles.length} bài viết đã được lưu
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Chưa có bài viết nào được lưu</h3>
                        <p className="text-gray-500 mb-4">Bắt đầu lưu những bài viết yêu thích để đọc sau</p>
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

                                    {/* Remove from saved button */}
                                    <button
                                        onClick={() => handleRemoveFromSaved(article.id)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center shadow-lg"
                                        title="Bỏ lưu bài viết"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="p-4">
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
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
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                                Đã lưu {new Date(article.savedDate).toLocaleDateString('vi-VN')}
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

export default SavedArticles; 