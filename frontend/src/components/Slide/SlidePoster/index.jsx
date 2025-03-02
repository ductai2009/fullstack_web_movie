// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import classNames from 'classnames/bind';
import style from './SlidePoster.module.css';
import { useState } from 'react';
import Button from '../../Button';
import Image from '../../Image';
import { NextIcon, PrevIcon } from '../../Icon';
import { Link } from 'react-router-dom';

import COMP_Skeleton from '../../COMP_Skeleton';
import config from '../../config';

function SlidePoster({ dsImg, urlImg, classPagination, classPrev, classNext, PropPrevIcon, PropNextIcon }) {
    const cx = classNames.bind(style);
    const [loading, setLoading] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);
    const [dataVideo, setDataVideo] = useState({});

    let COM_PrevIcon = PropPrevIcon ? PropPrevIcon : <PrevIcon />;
    let COM_NextIcon = PropNextIcon ? PropNextIcon : <NextIcon />;

    return (
        <div className={cx('wrapper')}>
            <Swiper
                slidesPerView="auto" // Số lượng slide hiển thị cùng lúc, 0.5 sẽ bị cắt sang 2 bên
                spaceBetween={10} // Khoảng cách giữa các slide
                pagination={{
                    clickable: true,
                    el: '.' + classPagination,
                    bulletClass: cx('pagination-movie'), // Class cho bullet không active
                    bulletActiveClass: cx('pagination-movie-active'), // Class cho bullet active
                }}
                navigation={{
                    nextEl: '.' + classNext, // Tùy chỉnh selector nút next
                    prevEl: '.' + classPrev, // Tùy chỉnh selector nút prev
                }}
                modules={[Navigation, Pagination]}
                className={cx('movie-slider')}
            >
                <div className={cx('slides')}>
                    {dsImg.map((item, index) => (
                        <SwiperSlide key={item._id} className={cx('swiper-slide', 'scale-hv')}>
                            <div className={cx('content-slide')}>
                                <div className={cx('name-movie', 'line-clamp')}>{item.name}</div>
                                <div className={cx('info-movie', 'line-clamp')}>
                                    <div className={cx('time')}>{item.time}</div>
                                    {/* <div className={cx('episode_current')}>{item.episode_current}</div> */}
                                    {item.category &&
                                        item.category.map((itemCategory, index) => {
                                            return (
                                                <div key={index} className={cx('category')}>
                                                    {itemCategory['name']}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            <Link
                                to={config.routes.InfoMovie + '/' + item.slug}
                                state={{
                                    // source: dsImg.name,
                                    name: item.name,
                                    poster_url: item.poster_url,
                                    slug: item.slug ? item.slug : '',
                                    soTap: 2,
                                }}
                                className={cx('img-wrapper')}
                            >
                                <Image
                                    className={cx('img')}
                                    onLoad={() => {}}
                                    src={urlImg + item.thumb_url}
                                    alt={item.name}
                                    loading="lazy"
                                    placeholder={<COMP_Skeleton className={cx('img', 'skeleton')} count={1} />}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            <div className={cx('pagination', { [classPagination]: classPagination })}></div>
            <div className={cx('prev', { [classPrev]: classPrev })}>{COM_PrevIcon}</div>
            <div className={cx('next', { [classNext]: classNext })}>{COM_NextIcon}</div>
        </div>
    );
}

export default SlidePoster;
