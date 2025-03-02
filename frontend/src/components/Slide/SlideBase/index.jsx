import React, { useEffect, useMemo, useRef, useState } from 'react';

import Button from '../../Button';
import COMP_Skeleton from '../../COMP_Skeleton';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

import classNames from 'classnames/bind';
import style from './SlideBase.module.css';

import { NextIcon, PrevIcon } from '../../Icon';
import Image from '../../Image';

import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '@/components/config';
function Slide({ urlImg, dsImg, classPagination, classPrev, classNext, PropPrevIcon, PropNextIcon }) {
    const cx = classNames.bind(style);
    const [isSlideIcon, setIsSlideIcon] = useState(false);

    const user_store = useSelector((state) => state.auth);
    const [isLogin, setIsLogin] = useState(user_store?.isLogin);

    let COM_PrevIcon = PropPrevIcon ? PropPrevIcon : <PrevIcon />;
    let COM_NextIcon = PropNextIcon ? PropNextIcon : <NextIcon />;

    const [loading, setLoading] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);

    const handleImageLoad = (id) => {
        setLoading(false);
        setLoadedImages((prevState) => ({
            ...prevState,
            [id]: true, // Đánh dấu ảnh với id tương ứng đã load xong
        }));
    };
    useEffect(() => {
        setIsLogin(user_store.isLogin);
        console.log('dsImg ', dsImg);
    }, [user_store]);

    return (
        <div className={cx('wrapper')}>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                onSlideChange={(swiper) => {
                    setLoading(true);
                    setActiveIndex(swiper.realIndex);
                }}
                effect={'fade'}
                centeredSlides={false} // nếu là true thì phải tác động slide mới bắt đầu chạy
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                speed={500} // Tốc độ mờ của slide
                fadeEffect={{
                    crossFade: true, // Mờ chồng giữa các slide
                }}
                loop={true}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination', // Tùy chỉnh selector pagination
                    bulletClass: cx('pagination-bullet'), // Class cho bullet không active
                    bulletActiveClass: cx('pagination-bullet-active'), // Class cho bullet active
                }}
                navigation={{
                    nextEl: '.custom-next', // Tùy chỉnh selector nút next
                    prevEl: '.custom-prev', // Tùy chỉnh selector nút prev
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className={cx('slide-home')}
            >
                <div className={cx('slides')}>
                    {dsImg.map((item, index) => (
                        <SwiperSlide key={item._id}>
                            <div className={cx('loading')}>
                                <ClipLoader size={50} color="white" loading={true} className={cx('icon-loading')} />
                            </div>
                            <div className={cx('bg')}></div>
                            <div className={cx('content-slide')}>
                                <div
                                    className={cx('name', 'content-1', {
                                        visible: index === activeIndex && loadedImages[item._id], // Thêm class 'visible' khi điều kiện đúng
                                    })}
                                >
                                    {item.name} <div className="text-amber-700 text-[2vw]">({item.origin_name})</div>
                                </div>
                                <div
                                    className={cx('content-2', {
                                        visible: index === activeIndex && loadedImages[item._id],
                                    })}
                                >
                                    {isLogin ? (
                                        <Button
                                            to={config.routes.InfoMovie + '/' + item.slug}
                                            state={{
                                                name: item.name,
                                                poster_url: item.poster_url,
                                                slug: item.slug ? item.slug : '',
                                                soTap: 1,
                                            }}
                                            className={cx('btn-register')}
                                            primary
                                        >
                                            <div className={cx('title-register')}>Xem ngay</div>
                                        </Button>
                                    ) : (
                                        <Button to={config.routes.Login} className={cx('btn-register')} primary>
                                            <div className={cx('title-register')}>Đăng nhập ngay</div>
                                        </Button>
                                    )}
                                </div>
                                <div
                                    className={cx('content-3', {
                                        visible: index === activeIndex && loadedImages[item._id],
                                    })}
                                >
                                    {!isLogin && (
                                        <div className={cx('decs')}>
                                            {' '}
                                            Bạn chưa có tài khoản,{' '}
                                            <Link className={cx('decs', 'hv-underline')} to={config.routes.Register}>
                                                đăng ký tại đây
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Image
                                onLoad={() => {
                                    handleImageLoad(item._id);
                                }}
                                src={urlImg + item.poster_url}
                                alt={item.name}
                                loading="lazy"
                                placeholder={<COMP_Skeleton className={cx('img', 'skeleton')} count={1} />}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>

            <div className={cx('custom-pagination', 'pagination', { [classPagination]: classPagination })}></div>
            <div className={cx('custom-prev', 'prev', { [classPrev]: classPrev })}>{COM_PrevIcon}</div>
            <div className={cx('custom-next', 'next', { [classNext]: classNext })}>{COM_NextIcon}</div>
        </div>
    );
}
export default Slide;
