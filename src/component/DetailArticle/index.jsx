import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLogin, selectUser } from "../../redux/slice/useSlice";

export default function DetailArticle() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const isLogin = useSelector(selectIsLogin);
    const user = useSelector(selectUser);

    // Mock data - trong thực tế sẽ fetch từ API
    const mockArticle = {
        id: 1,
        title: "Đảm bảo cấp nước sạch trong mùa mưa - Giải pháp bền vững cho thành phố",
        slug: "dam-bao-cap-nuoc-sach-trong-mua-mua",
        content: `
      <p>Việc đảm bảo cấp nước sạch trong mùa mưa là một trong những thách thức lớn nhất đối với các thành phố hiện nay. Với biến đổi khí hậu ngày càng gay gắt, việc chuẩn bị các giải pháp bền vững trở nên cấp thiết hơn bao giờ hết.</p>
      
      <h2>Những thách thức chính</h2>
      <p>Mùa mưa mang lại nhiều thách thức đối với hệ thống cấp nước:</p>
      <ul>
        <li>Nguồn nước bị ô nhiễm do nước mưa cuốn theo các chất thải</li>
        <li>Hệ thống lọc nước quá tải do lượng nước lớn</li>
        <li>Nguy cơ nhiễm bẩn từ các khu vực ngập lụt</li>
        <li>Khó khăn trong việc vận hành và bảo trì thiết bị</li>
      </ul>
      
      <h2>Giải pháp công nghệ hiện đại</h2>
      <p>Các công nghệ hiện đại đang được áp dụng để giải quyết các vấn đề này:</p>
      <ul>
        <li>Hệ thống lọc nước thông minh với AI</li>
        <li>Công nghệ xử lý nước tiên tiến</li>
        <li>Hệ thống giám sát chất lượng nước real-time</li>
        <li>Ứng dụng IoT trong quản lý hệ thống cấp nước</li>
      </ul>
      
      <h2>Lợi ích đối với cộng đồng</h2>
      <p>Việc đảm bảo cấp nước sạch mang lại nhiều lợi ích:</p>
      <ul>
        <li>Bảo vệ sức khỏe cộng đồng</li>
        <li>Phát triển kinh tế bền vững</li>
        <li>Nâng cao chất lượng cuộc sống</li>
        <li>Bảo vệ môi trường</li>
      </ul>
      
      <p>Đây là một dự án quan trọng đòi hỏi sự hợp tác chặt chẽ giữa các cơ quan chức năng, doanh nghiệp và người dân để đảm bảo thành công.</p>
    `,
        image: "https://picsum.photos/1200/600?random=1",
        author: {
            name: "Nguyễn Văn An",
            avatar: "https://picsum.photos/100/100?random=author1",
            role: "Chuyên gia cấp nước"
        },
        publishedAt: "2024-07-04T10:00:00Z",
        category: "Công nghệ",
        tags: ["Nước sạch", "Mùa mưa", "Công nghệ", "Môi trường"],
        views: 1245,
        likes: 89,
        comments: 23
    };

    const mockComments = [
        {
            id: 1,
            user: {
                name: "Trần Thị Hoa",
                avatar: "https://picsum.photos/50/50?random=user1"
            },
            content: "Bài viết rất hay và bổ ích. Cảm ơn tác giả đã chia sẻ!",
            createdAt: "2024-07-04T14:30:00Z",
            likes: 5
        },
        {
            id: 2,
            user: {
                name: "Lê Minh Hoàng",
                avatar: "https://picsum.photos/50/50?random=user2"
            },
            content: "Thông tin rất cập nhật và thiết thực. Hy vọng sẽ có thêm nhiều bài viết như thế này.",
            createdAt: "2024-07-04T15:45:00Z",
            likes: 3
        },
        {
            id: 3,
            user: {
                name: "Phạm Thị Lan",
                avatar: "https://picsum.photos/50/50?random=user3"
            },
            content: "Các giải pháp công nghệ thực sự ấn tượng. Mong muốn được áp dụng trong thực tế sớm.",
            createdAt: "2024-07-04T16:20:00Z",
            likes: 7
        }
    ];

    const relatedArticles = [
        {
            id: 2,
            title: "Công nghệ lọc nước tiên tiến nhất hiện nay",
            image: "https://picsum.photos/300/200?random=related1",
            publishedAt: "2024-07-03T10:00:00Z",
            category: "Công nghệ"
        },
        {
            id: 3,
            title: "Hệ thống cấp nước thông minh cho thành phố",
            image: "https://picsum.photos/300/200?random=related2",
            publishedAt: "2024-07-02T10:00:00Z",
            category: "Công nghệ"
        },
        {
            id: 4,
            title: "Quy trình xử lý nước thải công nghiệp mới nhất",
            image: "https://picsum.photos/300/200?random=related3",
            publishedAt: "2024-07-01T10:00:00Z",
            category: "Môi trường"
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setArticle(mockArticle);
            setComments(mockComments);
            setLikeCount(mockArticle.likes);
            setIsLoading(false);
        }, 1000);
    }, [slug]);

    const handleLike = () => {
        if (!isLogin) {
            alert("Vui lòng đăng nhập để thích bài viết!");
            return;
        }

        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleSave = () => {
        if (!isLogin) {
            alert("Vui lòng đăng nhập để lưu bài viết!");
            return;
        }

        setIsSaved(!isSaved);
        // Here you would typically call API to save/unsave article
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (!isLogin) {
            alert("Vui lòng đăng nhập để bình luận!");
            return;
        }

        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                user: {
                    name: user?.name || "Anonymous",
                    avatar: user?.avatar || "https://picsum.photos/50/50?random=currentuser"
                },
                content: newComment,
                createdAt: new Date().toISOString(),
                likes: 0
            };

            setComments([comment, ...comments]);
            setNewComment("");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const handleImageError = (e) => {
        e.target.src = "data:image/svg+xml,%3Csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23374151' text-anchor='middle' dy='.3em'%3EHình ảnh%3C/text%3E%3C/svg%3E";
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
                    <a href="/" className="text-blue-600 hover:text-blue-700">
                        Về trang chủ
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm">
                    <ol className="flex items-center space-x-2 text-gray-500">
                        <li>
                            <a href="/" className="hover:text-blue-600">Trang chủ</a>
                        </li>
                        <li>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {article.category}
                            </span>
                        </li>
                    </ol>
                </nav>

                {/* Article Header */}
                <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="p-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {article.title}
                        </h1>

                        {/* Article Meta */}
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={article.author.avatar}
                                    alt={article.author.name}
                                    className="w-12 h-12 rounded-full"
                                    onError={handleImageError}
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{article.author.name}</p>
                                    <p className="text-sm text-gray-500">{article.author.role}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
                                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        {article.views}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        {likeCount}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                        {comments.length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Article Image */}
                        <div className="mb-8">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg"
                                onError={handleImageError}
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>

                        {/* Tags */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                {/* Action Buttons */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLike}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isLiked
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <svg
                                    className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                                    fill={isLiked ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{isLiked ? 'Đã thích' : 'Thích'}</span>
                                <span className="bg-white px-2 py-1 rounded-full text-xs">
                                    {likeCount}
                                </span>
                            </button>

                            <button
                                onClick={handleSave}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${isSaved
                                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <svg
                                    className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
                                    fill={isSaved ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                <span>Chia sẻ</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Bình luận ({comments.length})
                    </h3>

                    {/* Comment Form */}
                    {isLogin ? (
                        <form onSubmit={handleComment} className="mb-8">
                            <div className="flex space-x-4">
                                <img
                                    src={user?.avatar || "https://picsum.photos/50/50?random=currentuser"}
                                    alt="Your avatar"
                                    className="w-10 h-10 rounded-full flex-shrink-0"
                                    onError={handleImageError}
                                />
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Chia sẻ ý kiến của bạn..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        rows="3"
                                    />
                                    <div className="flex justify-end mt-3">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                        >
                                            Gửi bình luận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
                            <p className="text-gray-600">
                                <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Đăng nhập
                                </a>
                                {" "}để bình luận
                            </p>
                        </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-4">
                                <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    className="w-10 h-10 rounded-full flex-shrink-0"
                                    onError={handleImageError}
                                />
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-900">{comment.user.name}</h4>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{comment.content}</p>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                        <button className="hover:text-blue-600 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V9a2 2 0 00-2-2M5 20l7-7" />
                                            </svg>
                                            <span>Thích</span>
                                            <span>({comment.likes})</span>
                                        </button>
                                        <button className="hover:text-blue-600">Trả lời</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Bài viết liên quan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedArticles.map((article) => (
                            <div key={article.id} className="group cursor-pointer">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-75 transition-opacity"
                                    onError={handleImageError}
                                />
                                <div className="space-y-2">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                        {article.category}
                                    </span>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(article.publishedAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 