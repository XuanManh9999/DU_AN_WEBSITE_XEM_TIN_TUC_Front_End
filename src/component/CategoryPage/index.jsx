import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination';

const CategoryPage = () => {
    const location = useLocation();
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const articlesPerPage = 9;

    // Parse category and subcategory from pathname
    useEffect(() => {
        const pathname = location.pathname;

        // Extract category and subcategory from pathname
        if (pathname.startsWith('/tin-tuc')) {
            setCategory('tin-tuc');
            if (pathname === '/tin-tuc/moi-nhat') setSubcategory('moi-nhat');
            else if (pathname === '/tin-tuc/tin-nong') setSubcategory('tin-nong');
            else if (pathname === '/tin-tuc/trong-nuoc') setSubcategory('trong-nuoc');
            else if (pathname === '/tin-tuc/quoc-te') setSubcategory('quoc-te');
            else setSubcategory('');
        } else if (pathname.startsWith('/the-thao')) {
            setCategory('the-thao');
            if (pathname === '/the-thao/bong-da') setSubcategory('bong-da');
            else if (pathname === '/the-thao/bong-ro') setSubcategory('bong-ro');
            else if (pathname === '/the-thao/tennis') setSubcategory('tennis');
            else if (pathname === '/the-thao/khac') setSubcategory('khac');
            else setSubcategory('');
        } else if (pathname.startsWith('/cong-nghe')) {
            setCategory('cong-nghe');
            if (pathname === '/cong-nghe/dien-thoai') setSubcategory('dien-thoai');
            else if (pathname === '/cong-nghe/laptop') setSubcategory('laptop');
            else if (pathname === '/cong-nghe/ai-tech') setSubcategory('ai-tech');
            else if (pathname === '/cong-nghe/gaming') setSubcategory('gaming');
            else setSubcategory('');
        } else if (pathname.startsWith('/kinh-doanh')) {
            setCategory('kinh-doanh');
            if (pathname === '/kinh-doanh/chung-khoan') setSubcategory('chung-khoan');
            else if (pathname === '/kinh-doanh/ngan-hang') setSubcategory('ngan-hang');
            else if (pathname === '/kinh-doanh/bat-dong-san') setSubcategory('bat-dong-san');
            else if (pathname === '/kinh-doanh/khoi-nghiep') setSubcategory('khoi-nghiep');
            else setSubcategory('');
        } else if (pathname.startsWith('/giai-tri')) {
            setCategory('giai-tri');
            if (pathname === '/giai-tri/phim-anh') setSubcategory('phim-anh');
            else if (pathname === '/giai-tri/am-nhac') setSubcategory('am-nhac');
            else if (pathname === '/giai-tri/sao-viet') setSubcategory('sao-viet');
            else if (pathname === '/giai-tri/thoi-trang') setSubcategory('thoi-trang');
            else setSubcategory('');
        } else if (pathname.startsWith('/doi-song')) {
            setCategory('doi-song');
            if (pathname === '/doi-song/suc-khoe') setSubcategory('suc-khoe');
            else if (pathname === '/doi-song/gia-dinh') setSubcategory('gia-dinh');
            else if (pathname === '/doi-song/am-thuc') setSubcategory('am-thuc');
            else if (pathname === '/doi-song/du-lich') setSubcategory('du-lich');
            else setSubcategory('');
        }
    }, [location.pathname]);

    // Mock data cho các bài viết theo danh mục
    const mockArticles = {
        'tin-tuc': [
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
                slug: "cap-nhat-tinh-hinh-cap-nuoc-mua-kho"
            },
            {
                id: 2,
                title: "Triển khai hệ thống cấp nước thông minh tại TP.HCM",
                excerpt: "Dự án hệ thống cấp nước thông minh được triển khai để tối ưu hóa việc quản lý và phân phối nước cho toàn thành phố...",
                image: "https://picsum.photos/400/250?random=2",
                date: "2024-01-14",
                author: "Trần Thị B",
                category: "Tin tức",
                subcategory: "Tin nóng",
                views: 2156,
                slug: "trien-khai-he-thong-cap-nuoc-thong-minh"
            },
            {
                id: 3,
                title: "Chất lượng nước sinh hoạt được kiểm soát chặt chẽ",
                excerpt: "Các chỉ số chất lượng nước được kiểm tra và báo cáo hàng ngày để đảm bảo sức khỏe người dân...",
                image: "https://picsum.photos/400/250?random=3",
                date: "2024-01-13",
                author: "Lê Văn C",
                category: "Tin tức",
                subcategory: "Trong nước",
                views: 1843,
                slug: "chat-luong-nuoc-sinh-hoat-duoc-kiem-soat"
            },
            {
                id: 4,
                title: "Đầu tư nâng cấp hạ tầng cấp nước năm 2024",
                excerpt: "Kế hoạch đầu tư 5000 tỷ đồng để nâng cấp hạ tầng cấp nước, đảm bảo nguồn nước chất lượng cao...",
                image: "https://picsum.photos/400/250?random=4",
                date: "2024-01-12",
                author: "Phạm Thị D",
                category: "Tin tức",
                subcategory: "Mới nhất",
                views: 2834,
                slug: "dau-tu-nang-cap-ha-tang-cap-nuoc-2024"
            },
            {
                id: 5,
                title: "Kỹ thuật xử lý nước thải tiên tiến",
                excerpt: "Áp dụng công nghệ mới trong xử lý nước thải để bảo vệ môi trường và tái sử dụng nước...",
                image: "https://picsum.photos/400/250?random=5",
                date: "2024-01-11",
                author: "Hoàng Văn E",
                category: "Tin tức",
                subcategory: "Quốc tế",
                views: 1567,
                slug: "ky-thuat-xu-ly-nuoc-thai-tien-tien"
            },
            {
                id: 6,
                title: "Tiết kiệm nước trong sinh hoạt hàng ngày",
                excerpt: "Hướng dẫn các cách tiết kiệm nước hiệu quả cho gia đình, góp phần bảo vệ nguồn nước...",
                image: "https://picsum.photos/400/250?random=6",
                date: "2024-01-10",
                author: "Nguyễn Thị F",
                category: "Tin tức",
                subcategory: "Mới nhất",
                views: 2145,
                slug: "tiet-kiem-nuoc-trong-sinh-hoat-hang-ngay"
            },
            {
                id: 7,
                title: "Dự báo tình hình nguồn nước mùa khô 2024",
                excerpt: "Các chuyên gia đưa ra dự báo về tình hình nguồn nước và các biện pháp ứng phó...",
                image: "https://picsum.photos/400/250?random=7",
                date: "2024-01-09",
                author: "Trần Văn G",
                category: "Tin tức",
                subcategory: "Tin nóng",
                views: 3245,
                slug: "du-bao-tinh-hinh-nguon-nuoc-mua-kho-2024"
            },
            {
                id: 8,
                title: "Công nghệ lọc nước mới nhất từ Nhật Bản",
                excerpt: "Hệ thống lọc nước tiên tiến giúp nâng cao chất lượng nước sinh hoạt...",
                image: "https://picsum.photos/400/250?random=8",
                date: "2024-01-08",
                author: "Lê Thị H",
                category: "Tin tức",
                subcategory: "Quốc tế",
                views: 1923,
                slug: "cong-nghe-loc-nuoc-moi-nhat-tu-nhat-ban"
            },
            {
                id: 9,
                title: "Hệ thống cấp nước khẩn cấp trong mùa mưa",
                excerpt: "Triển khai hệ thống cấp nước khẩn cấp để đảm bảo cung cấp nước liên tục...",
                image: "https://picsum.photos/400/250?random=9",
                date: "2024-01-07",
                author: "Phạm Văn I",
                category: "Tin tức",
                subcategory: "Tin nóng",
                views: 2756,
                slug: "he-thong-cap-nuoc-khan-cap-mua-mua"
            },
            {
                id: 10,
                title: "Chương trình giáo dục bảo vệ nguồn nước",
                excerpt: "Triển khai chương trình giáo dục về bảo vệ nguồn nước trong các trường học...",
                image: "https://picsum.photos/400/250?random=10",
                date: "2024-01-06",
                author: "Nguyễn Văn J",
                category: "Tin tức",
                subcategory: "Mới nhất",
                views: 1634,
                slug: "chuong-trinh-giao-duc-bao-ve-nguon-nuoc"
            },
            {
                id: 11,
                title: "Kiểm tra chất lượng nước định kỳ",
                excerpt: "Quy trình kiểm tra chất lượng nước được thực hiện định kỳ để đảm bảo an toàn...",
                image: "https://picsum.photos/400/250?random=11",
                date: "2024-01-05",
                author: "Trần Thị K",
                category: "Tin tức",
                subcategory: "Trong nước",
                views: 2456,
                slug: "kiem-tra-chat-luong-nuoc-dinh-ky"
            },
            {
                id: 12,
                title: "Dự án nâng cấp trạm bơm nước",
                excerpt: "Dự án nâng cấp các trạm bơm nước để tăng cường hiệu quả cấp nước...",
                image: "https://picsum.photos/400/250?random=12",
                date: "2024-01-04",
                author: "Lê Văn L",
                category: "Tin tức",
                subcategory: "Mới nhất",
                views: 1987,
                slug: "du-an-nang-cap-tram-bom-nuoc"
            },
            {
                id: 13,
                title: "Hệ thống theo dõi chất lượng nước online",
                excerpt: "Triển khai hệ thống theo dõi chất lượng nước trực tuyến 24/7 để đảm bảo an toàn...",
                image: "https://picsum.photos/400/250?random=25",
                date: "2024-01-03",
                author: "Võ Thị M",
                category: "Tin tức",
                subcategory: "Trong nước",
                views: 3421,
                slug: "he-thong-theo-doi-chat-luong-nuoc-online"
            },
            {
                id: 14,
                title: "Đổi mới công nghệ xử lý nước thải công nghiệp",
                excerpt: "Áp dụng công nghệ mới trong xử lý nước thải công nghiệp để giảm thiểu tác động môi trường...",
                image: "https://picsum.photos/400/250?random=26",
                date: "2024-01-02",
                author: "Đỗ Văn N",
                category: "Tin tức",
                subcategory: "Quốc tế",
                views: 2876,
                slug: "doi-moi-cong-nghe-xu-ly-nuoc-thai-cong-nghiep"
            },
            {
                id: 15,
                title: "Kế hoạch cải thiện chất lượng nước năm 2024",
                excerpt: "Phương án cải thiện chất lượng nước toàn diện với nhiều giải pháp hiện đại...",
                image: "https://picsum.photos/400/250?random=27",
                date: "2024-01-01",
                author: "Nguyễn Thị O",
                category: "Tin tức",
                subcategory: "Mới nhất",
                views: 3156,
                slug: "ke-hoach-cai-thien-chat-luong-nuoc-2024"
            }
        ],
        'the-thao': [
            {
                id: 16,
                title: "Giải bóng đá SAWACO Cup 2024",
                excerpt: "Giải đấu bóng đá thường niên của các đội tuyển nhân viên SAWACO với nhiều trận cầu hấp dẫn...",
                image: "https://picsum.photos/400/250?random=13",
                date: "2024-01-15",
                author: "Nguyễn Thể Thao",
                category: "Thể thao",
                subcategory: "Bóng đá",
                views: 3456,
                slug: "giai-bong-da-sawaco-cup-2024"
            },
            {
                id: 17,
                title: "Chương trình thể dục buổi sáng cho nhân viên",
                excerpt: "Khuyến khích nhân viên tham gia các hoạt động thể dục thể thao để nâng cao sức khỏe...",
                image: "https://picsum.photos/400/250?random=14",
                date: "2024-01-14",
                author: "Trần Thể Thao",
                category: "Thể thao",
                subcategory: "Khác",
                views: 2134,
                slug: "chuong-trinh-the-duc-buoi-sang-nhan-vien"
            },
            {
                id: 18,
                title: "Giải tennis nội bộ SAWACO",
                excerpt: "Giải tennis nội bộ với sự tham gia của hơn 50 nhân viên từ các phòng ban...",
                image: "https://picsum.photos/400/250?random=28",
                date: "2024-01-13",
                author: "Lê Thể Thao",
                category: "Thể thao",
                subcategory: "Tennis",
                views: 1987,
                slug: "giai-tennis-noi-bo-sawaco"
            },
            {
                id: 19,
                title: "Giải bóng rổ trẻ SAWACO League",
                excerpt: "Giải bóng rổ dành cho con em cán bộ nhân viên tạo sân chơi lành mạnh...",
                image: "https://picsum.photos/400/250?random=29",
                date: "2024-01-12",
                author: "Phan Thể Thao",
                category: "Thể thao",
                subcategory: "Bóng rổ",
                views: 2756,
                slug: "giai-bong-ro-tre-sawaco-league"
            },
            {
                id: 20,
                title: "Chương trình thể dục nhịp điệu cho nữ CBCNV",
                excerpt: "Lớp học thể dục nhịp điệu giúp chị em nhân viên giữ gìn sức khỏe và vóc dáng...",
                image: "https://picsum.photos/400/250?random=30",
                date: "2024-01-11",
                author: "Nguyễn Thể Thao",
                category: "Thể thao",
                subcategory: "Khác",
                views: 3245,
                slug: "chuong-trinh-the-duc-nhip-dieu-nu-cbcnv"
            }
        ],
        'cong-nghe': [
            {
                id: 21,
                title: "Ứng dụng AI trong quản lý cấp nước",
                excerpt: "Triển khai công nghệ trí tuệ nhân tạo để tối ưu hóa quy trình quản lý và phân phối nước...",
                image: "https://picsum.photos/400/250?random=15",
                date: "2024-01-15",
                author: "Nguyễn Công Nghệ",
                category: "Công nghệ",
                subcategory: "AI & Tech",
                views: 4567,
                slug: "ung-dung-ai-trong-quan-ly-cap-nuoc"
            },
            {
                id: 22,
                title: "Hệ thống IoT giám sát chất lượng nước",
                excerpt: "Mạng lưới cảm biến IoT giúp theo dõi chất lượng nước trong thời gian thực...",
                image: "https://picsum.photos/400/250?random=16",
                date: "2024-01-14",
                author: "Trần Công Nghệ",
                category: "Công nghệ",
                subcategory: "AI & Tech",
                views: 3245,
                slug: "he-thong-iot-giam-sat-chat-luong-nuoc"
            },
            {
                id: 23,
                title: "Ứng dụng mobile quản lý cấp nước",
                excerpt: "Phát triển ứng dụng di động giúp khách hàng quản lý việc sử dụng nước một cách tiện lợi...",
                image: "https://picsum.photos/400/250?random=31",
                date: "2024-01-13",
                author: "Lê Công Nghệ",
                category: "Công nghệ",
                subcategory: "Điện thoại",
                views: 2845,
                slug: "ung-dung-mobile-quan-ly-cap-nuoc"
            },
            {
                id: 24,
                title: "Hệ thống máy tính tại trung tâm điều hành",
                excerpt: "Nâng cấp hệ thống máy tính và phần mềm quản lý tại trung tâm điều hành...",
                image: "https://picsum.photos/400/250?random=32",
                date: "2024-01-12",
                author: "Phạm Công Nghệ",
                category: "Công nghệ",
                subcategory: "Laptop",
                views: 2156,
                slug: "he-thong-may-tinh-trung-tam-dieu-hanh"
            }
        ],
        'kinh-doanh': [
            {
                id: 25,
                title: "Kết quả kinh doanh Q4/2023 của SAWACO",
                excerpt: "Báo cáo kết quả kinh doanh quý 4 năm 2023 với những thành tích đáng kể...",
                image: "https://picsum.photos/400/250?random=17",
                date: "2024-01-15",
                author: "Nguyễn Kinh Doanh",
                category: "Kinh doanh",
                subcategory: "Chứng khoán",
                views: 5678,
                slug: "ket-qua-kinh-doanh-q4-2023-sawaco"
            },
            {
                id: 26,
                title: "Thương hiệu SAWACO trong lĩnh vực cấp nước",
                excerpt: "Nỗ lực xây dựng thương hiệu SAWACO trong ngành cấp nước tại Việt Nam...",
                image: "https://picsum.photos/400/250?random=33",
                date: "2024-01-14",
                author: "Trần Kinh Doanh",
                category: "Kinh doanh",
                subcategory: "Khởi nghiệp",
                views: 3456,
                slug: "thuong-hieu-sawaco-linh-vuc-cap-nuoc"
            },
            {
                id: 27,
                title: "Đầu tư dự án nhà máy nước mới",
                excerpt: "Kế hoạch đầu tư xây dựng nhà máy nước mới với công suất 500.000 m3/ngày...",
                image: "https://picsum.photos/400/250?random=34",
                date: "2024-01-13",
                author: "Lê Kinh Doanh",
                category: "Kinh doanh",
                subcategory: "Bất động sản",
                views: 4234,
                slug: "dau-tu-du-an-nha-may-nuoc-moi"
            }
        ],
        'giai-tri': [
            {
                id: 28,
                title: "Chương trình văn nghệ chào mừng năm mới",
                excerpt: "Đêm văn nghệ với sự tham gia của các nghệ sĩ nổi tiếng để chào mừng năm mới...",
                image: "https://picsum.photos/400/250?random=18",
                date: "2024-01-15",
                author: "Nguyễn Giải Trí",
                category: "Giải trí",
                subcategory: "Văn hóa",
                views: 3456,
                slug: "chuong-trinh-van-nghe-chao-mung-nam-moi"
            },
            {
                id: 29,
                title: "Liên hoan phim tài liệu về nước",
                excerpt: "Tổ chức liên hoan phim tài liệu về tài nguyên nước và môi trường...",
                image: "https://picsum.photos/400/250?random=35",
                date: "2024-01-14",
                author: "Trần Giải Trí",
                category: "Giải trí",
                subcategory: "Phim ảnh",
                views: 2345,
                slug: "lien-hoan-phim-tai-lieu-ve-nuoc"
            },
            {
                id: 30,
                title: "Cuộc thi ảnh đẹp về nước",
                excerpt: "Cuộc thi chụp ảnh với chủ đề 'Nước trong cuộc sống' thu hút nhiều tác phẩm...",
                image: "https://picsum.photos/400/250?random=36",
                date: "2024-01-13",
                author: "Lê Giải Trí",
                category: "Giải trí",
                subcategory: "Văn hóa",
                views: 2867,
                slug: "cuoc-thi-anh-dep-ve-nuoc"
            }
        ],
        'doi-song': [
            {
                id: 31,
                title: "Sử dụng nước sinh hoạt an toàn",
                excerpt: "Hướng dẫn cách sử dụng nước sinh hoạt an toàn cho sức khỏe của cả gia đình...",
                image: "https://picsum.photos/400/250?random=19",
                date: "2024-01-15",
                author: "Nguyễn Đời Sống",
                category: "Đời sống",
                subcategory: "Sức khỏe",
                views: 2345,
                slug: "su-dung-nuoc-sinh-hoat-an-toan"
            },
            {
                id: 32,
                title: "Tác dụng của nước đối với làn da",
                excerpt: "Uống đủ nước mỗi ngày giúp da khỏe mạnh, tươi trẻ và căng bóng tự nhiên...",
                image: "https://picsum.photos/400/250?random=37",
                date: "2024-01-14",
                author: "Trần Đời Sống",
                category: "Đời sống",
                subcategory: "Sức khỏe",
                views: 3456,
                slug: "tac-dung-cua-nuoc-doi-voi-lan-da"
            },
            {
                id: 33,
                title: "Nước và sức khỏe gia đình",
                excerpt: "Tầm quan trọng của nước sạch đối với sức khỏe các thành viên trong gia đình...",
                image: "https://picsum.photos/400/250?random=38",
                date: "2024-01-13",
                author: "Lê Đời Sống",
                category: "Đời sống",
                subcategory: "Gia đình",
                views: 4567,
                slug: "nuoc-va-suc-khoe-gia-dinh"
            },
            {
                id: 34,
                title: "Món ăn từ nước sạch an toàn",
                excerpt: "Các món ăn chế biến từ nước sạch đảm bảo an toàn vệ sinh thực phẩm...",
                image: "https://picsum.photos/400/250?random=39",
                date: "2024-01-12",
                author: "Phạm Đời Sống",
                category: "Đời sống",
                subcategory: "Ẩm thực",
                views: 2345,
                slug: "mon-an-tu-nuoc-sach-an-toan"
            }
        ]
    };

    const categoryNames = {
        'tin-tuc': 'Tin tức',
        'the-thao': 'Thể thao',
        'cong-nghe': 'Công nghệ',
        'kinh-doanh': 'Kinh doanh',
        'giai-tri': 'Giải trí',
        'doi-song': 'Đời sống'
    };

    const subcategoryNames = {
        'moi-nhat': 'Mới nhất',
        'tin-nong': 'Tin nóng',
        'trong-nuoc': 'Trong nước',
        'quoc-te': 'Quốc tế',
        'bong-da': 'Bóng đá',
        'bong-ro': 'Bóng rổ',
        'tennis': 'Tennis',
        'khac': 'Khác',
        'dien-thoai': 'Điện thoại',
        'laptop': 'Laptop',
        'ai-tech': 'AI & Tech',
        'gaming': 'Gaming',
        'chung-khoan': 'Chứng khoán',
        'ngan-hang': 'Ngân hàng',
        'bat-dong-san': 'Bất động sản',
        'khoi-nghiep': 'Khởi nghiệp',
        'phim-anh': 'Phim ảnh',
        'am-nhac': 'Âm nhạc',
        'sao-viet': 'Sao Việt',
        'thoi-trang': 'Thời trang',
        'suc-khoe': 'Sức khỏe',
        'gia-dinh': 'Gia đình',
        'am-thuc': 'Ẩm thực',
        'du-lich': 'Du lịch'
    };

    useEffect(() => {
        if (!category) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            let filteredArticles = mockArticles[category] || [];

            if (subcategory) {
                filteredArticles = filteredArticles.filter(article =>
                    article.subcategory.toLowerCase().replace(/\s+/g, '-') === subcategory
                );
            }

            setArticles(filteredArticles);
            setLoading(false);
        }, 500);
    }, [category, subcategory]);

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
                        <a href={`/${category}`} className="hover:text-blue-600 transition-colors">
                            {categoryNames[category]}
                        </a>
                        {subcategory && (
                            <>
                                <span>›</span>
                                <span className="text-gray-900 font-medium">{subcategoryNames[subcategory]}</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {subcategory ? subcategoryNames[subcategory] : categoryNames[category]}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {articles.length} bài viết được tìm thấy
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {articles.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Chưa có bài viết nào</h3>
                        <p className="text-gray-500">Danh mục này chưa có bài viết nào được đăng.</p>
                    </div>
                ) : (
                    <>
                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentArticles.map((article) => (
                                <article key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
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
                                    <div className="p-4">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                {article.subcategory}
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
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

export default CategoryPage; 