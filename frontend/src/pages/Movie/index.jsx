import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './Movie.module.css';
import Button from '../../components/Button';
import apiHome from '../../services/service';
import SlideMovie from '../../components/Slide/SlideMovie';
import SlideMovieNumber from '../../components/Slide/SlideMovieNumber';
import { ToastContainer, toast } from 'react-toastify';
import apiPhimBo, {
    apiPhimMoiCapNhat,
    apiPhimLe,
    apiCategories,
    apiSearchCategories,
} from '../../services/serviceCallAPI';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import { NextIcon, NextSlickIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import COM_MultipleSelect from '../../components/COM_MultipleSelect';
import Select from '../../components/COM_Select';
import { useNavigate } from 'react-router-dom';
import config from '../../components/config';

function Movie() {
    const cx = classNames.bind(style);
    const notify = (message) => toast(message);
    const [urlImg, setUrlImg] = useState('');
    const [dsImg, setDsImg] = useState([]);

    const [urlImgPhimBo, setUrlImgPhimBo] = useState('');
    const [dsPhimBo, setDsPhimBo] = useState([]);

    const [urlPhimLe, setUrlPhimLe] = useState('');
    const [dsPhimLe, setDsPhimLe] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState({});
    const [optionSearch, setOptionSearch] = useState([]);

    const [categories, setCategories] = useState({});
    const navigate = useNavigate();

    document.title = 'Phim Điện Ảnh';

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
                // console.log('phim le: ', resultSearch);
                setDsPhimLe(resultSearch.dsItem);
                let urlImg = resultSearch.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
                setUrlPhimLe(urlImg);
            } catch (error) {
                console.error('Failed to fetch getDataPhimLe:', error);
            }
        };
        const getCategories = async () => {
            try {
                const resultSearch = await apiCategories();
                setOptionSearch(resultSearch.dsItem);
                // console.log(resultSearch.dsItem);
            } catch (error) {
                console.error('Failed to fetch getCategories:', error);
            }
        };

        getDataPhimBo();
        getDataPhimMoiCapNhat();
        getDataPhimLe();
        getCategories();
    }, []);
    useEffect(() => {
        const searchCategories = async (categories) => {
            try {
                if (!categories || !categories['slug']) return;
                notify('Searching...');
                // console.log('searchCategories categories', categories);
                const slug_ = categories['slug'];
                // console.log('searchCategories slug_', slug_);
                const resultSearch = await apiSearchCategories(slug_);

                navigate(config.routes.PhimDienAnhSearch, { state: resultSearch });
            } catch (error) {
                console.error('Failed to fetch searchCategories:', error);
            }
        };
        searchCategories(categories);
    }, [categories]);

    const handleSelectCategory = (category) => {
        setCategories(category);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-wrapper')}>
                <div className={cx('filter-wareHouse')}>
                    <div className={cx('title')}>Phim Điện Ảnh</div>
                    <Select
                        onChange={(e) => {
                            handleSelectCategory(e);
                        }}
                        placeholder={'Chọn thể loại'}
                        options={optionSearch}
                        keyLabel={'name'}
                        keyValue={'slug'}
                    />
                </div>
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
                <SlideMovie
                    classPagination="pagination-slide-2"
                    classNext="nav-next-slide-2"
                    classPrev="nav-prev-slide-2"
                    urlImg={urlImgPhimBo}
                    dsImg={dsPhimBo.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></SlideMovie>
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
                    urlImg={urlPhimLe}
                    dsImg={dsPhimLe.sort(() => Math.random() - 0.5).slice(0, 6)}
                ></SlideMovie>
            </div>

            {/* x2 */}

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
            <div className={cx('section-slide', 'section-slide-3')}>
                <SlideMovie
                    classPagination="pagination-slide-6"
                    classNext="nav-next-slide-6"
                    classPrev="nav-prev-slide-6"
                    urlImg={urlPhimLe}
                    dsImg={dsPhimLe.sort(() => Math.random() - 0.5).slice(6, 12)}
                ></SlideMovie>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Movie;
