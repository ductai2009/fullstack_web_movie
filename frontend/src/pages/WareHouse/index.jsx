import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './WareHouse.module.css';
import Button from '../../components/Button';
import apiHome from '../../services/service';
import SlideMovie from '../../components/Slide/SlideMovie';
import SlideMovieNumber from '../../components/Slide/SlideMovieNumber';
import apiPhimBo, { apiPhimMoiCapNhat, apiPhimLe, apiListMovieByType } from '../../services/serviceCallAPI';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import { NextIcon, NextSlickIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import SlidePoster from '../../components/Slide/SlidePoster';

function WareHouse() {
    const cx = classNames.bind(style);
    const [domainImage, setDomainImage] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [dsImg, setDsImg] = useState([]);
    document.title = 'Kho Phim';
    const [urlImgPhimBo, setUrlImgPhimBo] = useState('');
    const [dsPhimBo, setDsPhimBo] = useState([]);

    const [urlPhimLe, setUrlPhimLe] = useState('');
    const [dsPhimLe, setDsPhimLe] = useState([]);

    const [dsPhimBoDangChieu, setDsPhimBoDangChieu] = useState([]);
    const [dsPhimBoHoanThanh, setDsPhimBoHoanThanh] = useState([]);
    const [dsPhimThuyetMinh, setDsPhimThuyetMinh] = useState([]);
    const [dsPhimLongTieng, setDsPhimLongTieng] = useState([]);

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
        const getDataPhimLe = async () => {
            try {
                const resultSearch = await apiPhimLe();
                console.log('phim le: ', resultSearch);
                setDsPhimLe(resultSearch.dsItem);

                let urlImg = resultSearch.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
                console.log('urlImg', urlImg);
                setDomainImage(urlImg);
            } catch (error) {
                console.error('Failed to fetch getDataPhimLe:', error);
            }
        };
        const getDataMovie = async () => {
            try {
                const arr = ['phim-bo-dang-chieu', 'phim-bo-hoan-thanh', 'phim-thuyet-minh', 'phim-long-tieng'];

                arr.map(async (value, index) => {
                    const resultSearch = await apiListMovieByType(value);

                    if (value === 'phim-bo-dang-chieu') {
                        setDsPhimBoDangChieu(resultSearch.dsItem);
                    }
                    if (value === 'phim-bo-hoan-thanh') {
                        setDsPhimBoHoanThanh(resultSearch.dsItem);
                    }
                    if (value === 'phim-thuyet-minh') {
                        setDsPhimThuyetMinh(resultSearch.dsItem);
                    }
                    if (value === 'phim-long-tieng') {
                        setDsPhimLongTieng(resultSearch.dsItem);
                    }
                    if (domainImage) {
                        let urlImg = resultSearch.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
                        setDomainImage(urlImg);
                    }
                });
            } catch (error) {
                console.error('Failed to fetch getDataMovie:', error);
            }
        };
        getDataMovie();
        getDataPhimBo();
        getDataPhimMoiCapNhat();
        getDataPhimLe();
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
            <div className={cx('section', 'section-1')}>
                <div className={cx('section-title')}>
                    Phim Mới Thịnh Hành
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-1')}>
                <SlideMovie
                    classPagination="pagination-slide-1"
                    classNext="nav-next-slide-1"
                    classPrev="nav-prev-slide-1"
                    title="Phim Mới Thịnh Hành"
                    urlImg={urlImg}
                    dsImg={dsImg.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></SlideMovie>
            </div>
            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovieNumber
                    classPagination="pagination-slide-2"
                    classNext="nav-next-slide-2"
                    classPrev="nav-prev-slide-2"
                    urlImg={urlImgPhimBo}
                    dsImg={dsPhimBo.sort(() => Math.random() - 0.5).slice(0, 5)}
                ></SlideMovieNumber>
            </div>
            <div className={cx('section', 'section-3')}>
                <div className={cx('section-title')}>
                    Phim Lẻ
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-3')}>
                <SlideMovie
                    classPagination="pagination-slide-3"
                    classNext="nav-next-slide-3"
                    classPrev="nav-prev-slide-3"
                    urlImg={domainImage}
                    dsImg={dsPhimLe.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-1')}>
                <div className={cx('section-title')}>
                    Phim Mới Thịnh Hành Mới Nhất
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-1')}>
                <SlideMovie
                    classPagination="pagination-slide-4"
                    classNext="nav-next-slide-4"
                    classPrev="nav-prev-slide-4"
                    title="Phim Mới Thịnh Hành"
                    urlImg={urlImg}
                    dsImg={dsImg.sort(() => Math.random() - 0.5).slice(6, 12)}
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
                    classPagination="pagination-slide-5"
                    classNext="nav-next-slide-5"
                    classPrev="nav-prev-slide-5"
                    urlImg={urlImgPhimBo}
                    dsImg={dsPhimBo.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>
            <div className={cx('section', 'section-3')}>
                <div className={cx('section-title')}>
                    Phim Lẻ Mới Nhất
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-poster')}>
                <SlidePoster
                    classPagination="pagination-slide-6"
                    classNext="nav-next-slide-6"
                    classPrev="nav-prev-slide-6"
                    urlImg={domainImage}
                    dsImg={dsPhimLe.sort(() => Math.random() - 0.5).slice(6, 24)}
                ></SlidePoster>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Đang Chiếu
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-7"
                    classNext="nav-next-slide-7"
                    classPrev="nav-prev-slide-7"
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
                    classPagination="pagination-slide-8"
                    classNext="nav-next-slide-8"
                    classPrev="nav-prev-slide-8"
                    urlImg={domainImage}
                    dsImg={dsPhimBoHoanThanh.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Lồng Tiếng
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-9"
                    classNext="nav-next-slide-9"
                    classPrev="nav-prev-slide-9"
                    urlImg={domainImage}
                    dsImg={dsPhimLongTieng.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Thuyết Minh
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-10"
                    classNext="nav-next-slide-10"
                    classPrev="nav-prev-slide-10"
                    urlImg={domainImage}
                    dsImg={dsPhimThuyetMinh.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default WareHouse;
