import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './PhimBo.module.css';
import Button from '../../components/Button';
import apiHome from '../../services/service';
import SlideMovie from '../../components/Slide/SlideMovie';
import apiPhimBo, { apiPhimMoiCapNhat, apiPhimLe, apiListMovieByType } from '../../services/serviceCallAPI';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import { NextIcon, NextSlickIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';

function PhimBo() {
    const cx = classNames.bind(style);
    const [domainImage, setDomainImage] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [dsImg, setDsImg] = useState([]);
    document.title = 'Phim Bộ';
    const [urlImgPhimBo, setUrlImgPhimBo] = useState('');
    const [dsPhimBo, setDsPhimBo] = useState([]);
    const [dsPhimBoDangChieu, setDsPhimBoDangChieu] = useState([]);
    const [dsPhimBoHoanThanh, setDsPhimBoHoanThanh] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        const getDataPhimBo = async () => {
            try {
                const resultSearch = await apiPhimBo();

                setDsPhimBo(resultSearch.dsItem);
                let urlImgPhimBo = resultSearch.urlImg;
                setUrlImgPhimBo(urlImgPhimBo);
            } catch (error) {
                console.error('Failed to fetch getDataPhimBo:', error);
            }
        };
        const getDataMovie = async (type) => {
            try {
                if (['phim-bo-dang-chieu', 'phim-bo-hoan-thanh'].includes(type)) {
                    const resultSearch = await apiListMovieByType(type);
                    if (type === 'phim-bo-dang-chieu') {
                        setDsPhimBoDangChieu(resultSearch.dsItem);
                    }
                    if (type === 'phim-bo-hoan-thanh') {
                        setDsPhimBoHoanThanh(resultSearch.dsItem);
                    }

                    let urlImg = resultSearch.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
                    setDomainImage(urlImg);
                }
            } catch (error) {
                console.error('Failed to fetch getDataMovie:', error);
            }
        };
        const getDataPhimMoiCapNhat = async () => {
            try {
                const resultSearch = await apiPhimMoiCapNhat();
                setDsImg(resultSearch.dsItem);
                let urlImg = resultSearch.urlImg;
                setUrlImg(urlImg);
            } catch (error) {
                console.error('Failed to fetch getDataPhimMoiCapNhat:', error);
            }
        };
        getDataMovie('phim-bo-dang-chieu');
        getDataMovie('phim-bo-hoan-thanh');
        getDataPhimBo();
        getDataPhimMoiCapNhat();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-wrapper')}>
                <Slide
                    classPagination="pagination-wareHouse"
                    classPrev="prev-wareHouse"
                    classNext="next-wareHouse"
                    PropPrevIcon={<PrevSlickIcon />}
                    PropNextIcon={<NextSlickIcon />}
                    urlImg={urlImg}
                    dsImg={dsImg.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></Slide>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-1"
                    classNext="nav-next-slide-1"
                    classPrev="nav-prev-slide-1"
                    urlImg={urlImgPhimBo}
                    dsImg={dsPhimBo.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Mới Nhất
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-2"
                    classNext="nav-next-slide-2"
                    classPrev="nav-prev-slide-2"
                    urlImg={urlImgPhimBo}
                    dsImg={dsPhimBo.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Đang Chiếu
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-3"
                    classNext="nav-next-slide-3"
                    classPrev="nav-prev-slide-3"
                    urlImg={domainImage}
                    dsImg={dsPhimBoDangChieu.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Hoàn Thành
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-4"
                    classNext="nav-next-slide-4"
                    classPrev="nav-prev-slide-4"
                    urlImg={domainImage}
                    dsImg={dsPhimBoHoanThanh.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Đang Chiếu
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-5"
                    classNext="nav-next-slide-5"
                    classPrev="nav-prev-slide-5"
                    urlImg={domainImage}
                    dsImg={dsPhimBoDangChieu.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Hoàn Thành
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-6"
                    classNext="nav-next-slide-6"
                    classPrev="nav-prev-slide-6"
                    urlImg={domainImage}
                    dsImg={dsPhimBoHoanThanh.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default PhimBo;
