import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './Home.module.css';
import Button from '../../components/Button';
import apiHome from '@/services/service';
// import apiHome from '../../services/service';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import Footer from '../../components/Footer/Footer';

import { store } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, checkAuthAsync } from '@/redux/actions';
import config from '@/components/config';

function Home() {
    const cx = classNames.bind(style);
    const [urlImg, setUrlImg] = useState('');
    const [dsImg, setDsImg] = useState([]);
    const [apiData, setApiData] = useState({});
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const [loadedImages, setLoadedImages] = useState({});

    const authUser_store = useSelector((state) => state.auth);
    const isLogin = authUser_store?.isLogin;
    document.title = 'Galaxy Play';
    // console.log('authUser ', authUser);

    const handleImageLoad = (id) => {
        setLoadedImages((prevState) => {
            const newState = {
                ...prevState,
                [id]: true,
            };
        });
    };

    useEffect(() => {
        // dispatch(checkAuthAsync());
        const fetchApi = async (type = 'home', link) => {
            const resultSearch = await apiHome(link);
            console.log(resultSearch);
            let urlImg = '';
            // console.log(resultSearch.data.items);
            if (type === 'phimBo') {
                urlImg = resultSearch.data.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
                setDsImg(resultSearch.data.items);
                setUrlImg(urlImg);
                setApiData(resultSearch.data);
            }
            if (type === 'phim-moi-cap-nhat') {
                urlImg = resultSearch.pathImage;
                setDsImg(resultSearch.items);
                setUrlImg(urlImg);
                setApiData(resultSearch);
            }

            return resultSearch;
        };
        // fetchApi('/v1/api/home');
        // fetchApi('phimBo', '/v1/api/danh-sach/phim-bo');
        fetchApi('phim-moi-cap-nhat', '/danh-sach/phim-moi-cap-nhat');
    }, []);
    // const authUser_store = useSelector((state) => state.auth);
    // if (authUser_store) {
    //     console.log('authUser_store ', authUser_store);
    //     setAuthUser(data.user);
    //     setIsAuth(data.user.success);
    // }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide')}>
                <Slide urlImg={urlImg} dsImg={dsImg.sort(() => Math.random() - 0.5).slice(0, 6)}></Slide>
            </div>
            <div className={cx('section', 'section-1')}>
                <div className={cx('section-left')}>
                    <div className={cx('section-left-title')}>
                        {/* {apiData?.seoOnPage?.descriptionHead || <COMP_Skeleton count={1} />} */}
                        Giải trí online không giới hạn hàng nghìn giờ nội dung đậm chất Việt
                    </div>
                    <div className={cx('section-left-content')}>
                        {/* <div className={cx('item')}>{apiData?.seoOnPage?.titleHead || <COMP_Skeleton count={1} />}</div>
                        <div className={cx('item')}>{apiData?.seoOnPage?.titleHead || <COMP_Skeleton count={1} />}</div>
                        <div className={cx('item')}>{apiData?.seoOnPage?.titleHead || <COMP_Skeleton count={1} />}</div> */}
                        <div className={cx('item')}>Bom tấn Việt chiếu rạp độc quyền và sớm nhất</div>
                        <div className={cx('item')}>Thư viện phim Việt lớn nhất Việt Nam</div>
                        <div className={cx('item')}>Phim Bộ độc quyền Galaxy Play</div>
                        <div className={cx('item')}>Phim Bộ Hot Châu Á</div>
                        <div className={cx('item')}>Siêu phẩm điện ảnh Hollywood và Disney</div>
                    </div>
                    {isLogin ? (
                        <>
                            <Button to={config.routes.WareHouse} className={cx('btn-register', 'primary-btn')} primary>
                                Xem ngay
                            </Button>
                        </>
                    ) : (
                        <Button to={config.routes.Login} className={cx('btn-register', 'primary-btn')} primary>
                            Đăng nhập ngay
                        </Button>
                    )}

                    {/* <COMP_Skeleton className={cx('btn-register', 'skeleton')} count={1} /> */}
                    <div className={cx('section-left-footer')}>
                        <div className={cx('title')}>100+ đối tác sản xuất phim trong nước và quốc tế</div>
                        <div className={cx('list-partner')}>
                            <div className={cx('partner-1')}>
                                {<Image className={cx('partner', 'sony')} src={images.sony}></Image> || (
                                    <COMP_Skeleton count={1} />
                                )}
                                <Image className={cx('partner', 'universal')} src={images.universal}></Image>
                                <Image className={cx('partner', 'disney')} src={images.disney}></Image>
                                <Image className={cx('partner', 'MGM')} src={images.MGM}></Image>
                            </div>
                            <div className={cx('partner-2')}>
                                <Image className={cx('partner', 'studio_dragon')} src={images.studio_dragon}></Image>
                                <Image
                                    className={cx('partner', 'hk_entertainment')}
                                    src={images.hk_entertainment}
                                ></Image>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('section-right')}>
                    {dsImg.slice(0, 6).map((data, index) => {
                        return (
                            <div className={cx('slide-img')} key={data._id}>
                                <div className={cx('bg', 'background-hv')}></div>
                                <Image
                                    className={cx('img', { index: [1, 4].includes(index) })}
                                    src={urlImg + data.thumb_url}
                                    alt={data.thumb_url}
                                    onLoad={() => {
                                        handleImageLoad(data._id);
                                    }}
                                    placeholder={<COMP_Skeleton className={cx('img', 'skeleton')} count={1} />}
                                ></Image>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-left')}>
                    <div className={cx('section-left-title')}>Chia sẻ từng khoảnh khắc cùng người thân và bạn bè</div>
                    <div className={cx('wrap-super-text')}>
                        <div className={cx('super-text')}>
                            <div className={cx('number')}>1</div>
                            <div className={cx('text')}>
                                Tài khoản <br /> Galaxy Play Cao Cấp
                            </div>
                        </div>
                        <div className={cx('desc-text')}>Đăng nhập</div>
                        <div className={cx('super-text')}>
                            <div className={cx('number')}>5</div>
                            <div className={cx('text')}>Thiết bị</div>
                        </div>
                        <div className={cx('desc-text')}>Xem trên</div>
                        <div className={cx('super-text')}>
                            <div className={cx('number')}>4</div>
                            <div className={cx('text')}>
                                Thiết bị song song <br /> cùng lúc
                            </div>
                        </div>
                    </div>
                    {isLogin ? (
                        <>
                            <Button to={config.routes.WareHouse} className={cx('btn-register', 'primary-btn')} primary>
                                Xem ngay
                            </Button>
                        </>
                    ) : (
                        <Button to={config.routes.Login} className={cx('btn-register', 'primary-btn')} primary>
                            Đăng nhập ngay
                        </Button>
                    )}
                </div>
                <div className={cx('section-right')}>
                    <Image className={cx('img')} src={images.Spotlight_on_Device} alt="Spotlight_on_Device"></Image>
                </div>
            </div>

            <div className={cx('section', 'section-3')}>
                <div className={cx('section-left')}>
                    <Image
                        className={cx('img')}
                        src={images.home_page_iphone_12_pro_max}
                        alt="home_page_iphone_12_pro_max"
                    ></Image>
                </div>
                <div className={cx('section-right')}>
                    <div className={cx('section-right-title', 'section-title')}>
                        Nội dung đặc sắc, trải nghiệm mượt mà trên thiết bị di động
                    </div>
                    <div className={cx('section-desc')}>1 tài khoản Galaxy Play Mobile</div>
                    <div className={cx('section-desc')}>1 Smartphone hoặc máy tính bảng</div>
                    <div className={cx('section-desc')}>Xem mọi lúc, mọi nơi!</div>
                    {isLogin ? (
                        <>
                            <Button to={config.routes.WareHouse} className={cx('btn-register', 'primary-btn')} primary>
                                Xem ngay
                            </Button>
                        </>
                    ) : (
                        <Button to={config.routes.Login} className={cx('btn-register', 'primary-btn')} primary>
                            Đăng nhập ngay
                        </Button>
                    )}
                </div>
            </div>

            <div className={cx('section', 'section-4')}>
                <div className={cx('section-left')}>
                    <div className={cx('section-right-title', 'section-title', 'margin-bottom-mobile')}>
                        Nội dung đặc sắc, trải nghiệm mượt mà trên thiết bị di động
                    </div>
                    <div className={cx('section-desc')}>
                        Tận hưởng trọn vẹn, không gián đoạn mỗi phút giây cảm xúc khi thưởng thức bộ phim yêu thích.
                    </div>

                    {isLogin ? (
                        <>
                            <Button to={config.routes.WareHouse} className={cx('btn-register', 'primary-btn')} primary>
                                Xem ngay
                            </Button>
                        </>
                    ) : (
                        <Button to={config.routes.Login} className={cx('btn-register', 'primary-btn')} primary>
                            Đăng nhập ngay
                        </Button>
                    )}
                </div>
                <div className={cx('section-right')}>
                    <Image className={cx('img')} src={images.TV_KID_500x460} alt="TV_KID_500x460"></Image>
                </div>
            </div>

            <div className={cx('section', 'section-5')}>
                <div className={cx('wrapper')}>
                    <div className={cx('section-title')}>Thoải mái xem phim trên TV tại nhà</div>

                    <div className={cx('section-desc', 'text-center')}>
                        Đắm chìm trong từng thước phim cùng công nghệ hình ảnh 4K sắc nét và dải âm thanh Dolby 5.1 sống
                        động duy nhất tại Việt Nam.
                    </div>

                    {isLogin ? (
                        <>
                            <Button to={config.routes.WareHouse} className={cx('btn-register', 'primary-btn')} primary>
                                Xem ngay
                            </Button>
                        </>
                    ) : (
                        <Button to={config.routes.Login} className={cx('btn-register', 'primary-btn')} primary>
                            Đăng nhập ngay
                        </Button>
                    )}

                    <div className={cx('box-img')}>
                        <Image className={cx('img')} src={images.TV_tizen} alt="TV_tizen"></Image>
                    </div>
                    <div className={cx('section-title', 'text-center')}>
                        Vũ trụ giải trí điện ảnh, đậm màu sắc Việt. Chất lượng tuyệt đỉnh, trải nghiệm mượt mà.
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
