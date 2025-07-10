import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLogin, selectUser } from "../../redux/slice/useSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    FaEye,
    FaHeart,
    FaRegHeart,
    FaComment,
    FaBookmark,
    FaRegBookmark,
    FaShare,
    FaChevronRight,
    FaThumbsUp,
    FaReply,
    FaSpinner,
    FaPaperPlane,
    FaUser
} from 'react-icons/fa';

export default function DetailArticle() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [commentLikes, setCommentLikes] = useState({});

    const isLogin = useSelector(selectIsLogin);
    const user = useSelector(selectUser);

    // Cấu hình ReactQuill
    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    };

    const quillFormats = [
        'bold', 'italic', 'underline', 'link', 'list', 'bullet'
    ];

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
            content: "Bài viết rất hay và bổ ích. Cảm ơn tác giả đã chia sẻ thông tin quý báu này!",
            htmlContent: "<p>Bài viết rất hay và bổ ích. Cảm ơn tác giả đã chia sẻ thông tin quý báu này!</p>",
            createdAt: "2024-07-04T14:30:00Z",
            likes: 5,
            replies: [
                {
                    id: 11,
                    user: {
                        name: "Nguyễn Văn An",
                        avatar: "https://picsum.photos/50/50?random=author1"
                    },
                    content: "Cảm ơn bạn đã đọc và ủng hộ. Mình sẽ tiếp tục chia sẻ những thông tin hữu ích khác!",
                    htmlContent: "<p>Cảm ơn bạn đã đọc và ủng hộ. Mình sẽ tiếp tục chia sẻ những thông tin hữu ích khác!</p>",
                    createdAt: "2024-07-04T14:45:00Z",
                    likes: 2,
                    parentId: 1
                }
            ]
        },
        {
            id: 2,
            user: {
                name: "Lê Minh Hoàng",
                avatar: "https://picsum.photos/50/50?random=user2"
            },
            content: "Thông tin rất cập nhật và thiết thực. Hy vọng sẽ có thêm nhiều bài viết chuyên sâu như thế này.",
            htmlContent: "<p>Thông tin rất cập nhật và thiết thực. Hy vọng sẽ có thêm nhiều bài viết <strong>chuyên sâu</strong> như thế này.</p>",
            createdAt: "2024-07-04T15:45:00Z",
            likes: 3,
            replies: []
        },
        {
            id: 3,
            user: {
                name: "Phạm Thị Lan",
                avatar: "https://picsum.photos/50/50?random=user3"
            },
            content: "Các giải pháp công nghệ thực sự ấn tượng. Mong muốn được áp dụng trong thực tế sớm nhất có thể.",
            htmlContent: "<p>Các giải pháp công nghệ thực sự ấn tượng. Mong muốn được áp dụng trong thực tế <em>sớm nhất có thể</em>.</p>",
            createdAt: "2024-07-04T16:20:00Z",
            likes: 7,
            replies: [
                {
                    id: 31,
                    user: {
                        name: "Trần Văn Đức",
                        avatar: "https://picsum.photos/50/50?random=user4"
                    },
                    content: "Mình cũng mong chờ việc này. Đặc biệt là công nghệ AI trong xử lý nước.",
                    htmlContent: "<p>Mình cũng mong chờ việc này. Đặc biệt là công nghệ <strong>AI</strong> trong xử lý nước.</p>",
                    createdAt: "2024-07-04T16:35:00Z",
                    likes: 1,
                    parentId: 3
                }
            ]
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

            // Initialize comment likes
            const likes = {};
            mockComments.forEach(comment => {
                likes[comment.id] = comment.likes;
                comment.replies?.forEach(reply => {
                    likes[reply.id] = reply.likes;
                });
            });
            setCommentLikes(likes);
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
                content: newComment.replace(/<[^>]*>/g, ''), // Remove HTML tags for plain text
                htmlContent: newComment,
                createdAt: new Date().toISOString(),
                likes: 0,
                replies: []
            };

            setComments([comment, ...comments]);
            setCommentLikes(prev => ({ ...prev, [comment.id]: 0 }));
            setNewComment("");
        }
    };

    const handleReply = (commentId) => {
        if (!isLogin) {
            alert("Vui lòng đăng nhập để phản hồi!");
            return;
        }

        if (replyContent.trim()) {
            const reply = {
                id: Date.now(),
                user: {
                    name: user?.name || "Anonymous",
                    avatar: user?.avatar || "https://picsum.photos/50/50?random=currentuser"
                },
                content: replyContent.replace(/<[^>]*>/g, ''), // Remove HTML tags for plain text
                htmlContent: replyContent,
                createdAt: new Date().toISOString(),
                likes: 0,
                parentId: commentId
            };

            setComments(prevComments => {
                return prevComments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), reply]
                        };
                    }
                    return comment;
                });
            });

            setCommentLikes(prev => ({ ...prev, [reply.id]: 0 }));
            setReplyContent("");
            setReplyingTo(null);
        }
    };

    const handleCommentLike = (commentId) => {
        if (!isLogin) {
            alert("Vui lòng đăng nhập để thích bình luận!");
            return;
        }

        setCommentLikes(prev => ({
            ...prev,
            [commentId]: (prev[commentId] || 0) + 1
        }));
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
                    <FaSpinner className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
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
                            <FaChevronRight className="w-4 h-4" />
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
                                        <FaEye className="w-4 h-4 mr-1" />
                                        {article.views}
                                    </span>
                                    <span className="flex items-center">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        {likeCount}
                                    </span>
                                    <span className="flex items-center">
                                        <FaComment className="w-4 h-4 mr-1" />
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
                                {isLiked ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
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
                                {isSaved ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                                <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                                <FaShare className="w-5 h-5" />
                                <span>Chia sẻ</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <FaComment className="w-5 h-5 mr-2" />
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
                                    <ReactQuill
                                        theme="snow"
                                        value={newComment}
                                        onChange={setNewComment}
                                        placeholder="Chia sẻ ý kiến của bạn..."
                                        modules={quillModules}
                                        formats={quillFormats}
                                        className="bg-white"
                                    />
                                    <div className="flex justify-end mt-3">
                                        <button
                                            type="submit"
                                            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                        >
                                            <FaPaperPlane className="w-4 h-4" />
                                            <span>Gửi bình luận</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
                            <p className="text-gray-600 flex items-center justify-center">
                                <FaUser className="w-4 h-4 mr-2" />
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
                            <div key={comment.id} className="space-y-4">
                                {/* Main Comment */}
                                <div className="flex space-x-4">
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
                                            <div
                                                className="text-gray-700 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: comment.htmlContent }}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                            <button
                                                onClick={() => handleCommentLike(comment.id)}
                                                className="hover:text-blue-600 flex items-center space-x-1 transition-colors"
                                            >
                                                <FaThumbsUp className="w-4 h-4" />
                                                <span>Thích</span>
                                                <span>({commentLikes[comment.id] || comment.likes})</span>
                                            </button>
                                            <button
                                                onClick={() => setReplyingTo(comment.id)}
                                                className="hover:text-blue-600 flex items-center space-x-1 transition-colors"
                                            >
                                                <FaReply className="w-4 h-4" />
                                                <span>Trả lời</span>
                                            </button>
                                        </div>

                                        {/* Reply Form */}
                                        {replyingTo === comment.id && isLogin && (
                                            <div className="mt-4 ml-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex space-x-3">
                                                    <img
                                                        src={user?.avatar || "https://picsum.photos/50/50?random=currentuser"}
                                                        alt="Your avatar"
                                                        className="w-8 h-8 rounded-full flex-shrink-0"
                                                        onError={handleImageError}
                                                    />
                                                    <div className="flex-1">
                                                        <ReactQuill
                                                            theme="snow"
                                                            value={replyContent}
                                                            onChange={setReplyContent}
                                                            placeholder="Viết phản hồi..."
                                                            modules={quillModules}
                                                            formats={quillFormats}
                                                            className="bg-white"
                                                        />
                                                        <div className="flex justify-end space-x-2 mt-3">
                                                            <button
                                                                onClick={() => setReplyingTo(null)}
                                                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                                            >
                                                                Hủy
                                                            </button>
                                                            <button
                                                                onClick={() => handleReply(comment.id)}
                                                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                            >
                                                                <FaPaperPlane className="w-3 h-3" />
                                                                <span>Gửi</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="ml-14 space-y-4">
                                        {comment.replies.map((reply) => (
                                            <div key={reply.id} className="flex space-x-4">
                                                <img
                                                    src={reply.user.avatar}
                                                    alt={reply.user.name}
                                                    className="w-8 h-8 rounded-full flex-shrink-0"
                                                    onError={handleImageError}
                                                />
                                                <div className="flex-1">
                                                    <div className="bg-blue-50 rounded-lg p-3">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h5 className="font-semibold text-gray-900 text-sm">{reply.user.name}</h5>
                                                            <span className="text-xs text-gray-500">
                                                                {formatDate(reply.createdAt)}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="text-gray-700 prose prose-sm max-w-none"
                                                            dangerouslySetInnerHTML={{ __html: reply.htmlContent }}
                                                        />
                                                    </div>
                                                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                                        <button
                                                            onClick={() => handleCommentLike(reply.id)}
                                                            className="hover:text-blue-600 flex items-center space-x-1 transition-colors"
                                                        >
                                                            <FaThumbsUp className="w-3 h-3" />
                                                            <span>Thích</span>
                                                            <span>({commentLikes[reply.id] || reply.likes})</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
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