import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './PhimThue.module.css';
import Button from '../../components/Button';
import apiHome from '../../services/service';
import SlideMovie from '../../components/Slide/SlideMovie';
import apiPhimBo, {
    apiPhimMoiCapNhat,
    apiPhimLe,
    apiCountries,
    apiSearchCountries,
    apiListMovieByType,
} from '../../services/serviceCallAPI';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import { NextIcon, NextSlickIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import COM_Select from '../../components/COM_Select';
import { useNavigate } from 'react-router-dom';
import config from '../../components/config';

function PhimThue() {
    const cx = classNames.bind(style);
    document.title = 'Phim Thuê';
    const [urlImg, setUrlImg] = useState('');
    const [domainImage, setDomainImage] = useState('');
    const [dsImg, setDsImg] = useState([]);

    const [urlImgPhimBo, setUrlImgPhimBo] = useState('');
    const [dsPhimBo, setDsPhimBo] = useState([]);

    const [urlPhimLe, setUrlPhimLe] = useState('');
    const [dsPhimLe, setDsPhimLe] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState({});

    const [optionSearch, setOptionSearch] = useState([]);

    const [countries, setCountries] = useState({});
    const navigate = useNavigate();
    const [dsPhimTrungQuoc, setDsPhimTrungQuoc] = useState([]);
    const [dsPhimHanQuoc, setDsPhimHanQuoc] = useState([]);
    const [dsPhimThaiLan, setDsPhimThaiLan] = useState([]);
    const [dsPhimNhatBan, setDsPhimNhatBan] = useState([]);
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
        const getDataMovie = async () => {
            try {
                const arr = ['trung-quoc', 'han-quoc', 'nhat-ban', 'thai-lan'];

                arr.map(async (value, index) => {
                    const resultSearch = await apiSearchCountries(value);

                    if (value === 'trung-quoc') {
                        setDsPhimTrungQuoc(resultSearch.dsItem);
                    }
                    if (value === 'han-quoc') {
                        setDsPhimHanQuoc(resultSearch.dsItem);
                    }
                    if (value === 'nhat-ban') {
                        setDsPhimNhatBan(resultSearch.dsItem);
                    }
                    if (value === 'thai-lan') {
                        setDsPhimThaiLan(resultSearch.dsItem);
                    }
                    if (domainImage === '') {
                        let urlImg = resultSearch.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
                        console.log('object', urlImg);
                        setDomainImage(urlImg);
                    }
                });
            } catch (error) {
                console.error('Failed to fetch getDataMovie:', error);
            }
        };

        const getCountries = async () => {
            try {
                const resultSearch = await apiCountries();
                setOptionSearch(resultSearch.dsItem);
                // console.log(resultSearch.dsItem);
            } catch (error) {
                console.error('Failed to fetch getCountries:', error);
            }
        };
        getDataMovie();
        getDataPhimBo();
        getCountries();
    }, []);
    useEffect(() => {
        const searchCountries = async (countries) => {
            try {
                if (!countries || !countries['slug']) {
                    // console.log('!countries || !countries', !countries, !countries['slug']);
                    return;
                }
                // console.log('searchCountries countries', countries);
                const slug_ = countries['slug'];
                // console.log('searchCategories slug_', slug_);

                const resultSearch = await apiSearchCountries(slug_);
                navigate(config.routes.PhimThueSearch, { state: resultSearch });
            } catch (error) {
                console.error('Failed to fetch searchCountries:', error);
            }
        };
        searchCountries(countries);
    }, [countries]);
    const handleSelectCountries = (countries) => {
        setCountries(countries);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-wrapper')}>
                <div className={cx('filter-wrapper')}>
                    <div className={cx('title')}>Quốc Gia</div>
                    <COM_Select
                        onChange={(e) => {
                            handleSelectCountries(e);
                        }}
                        placeholder={'Chọn Quốc Gia'}
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
                    urlImg={urlImgPhimBo}
                    dsImg={dsPhimBo.sort(() => Math.random() - 0.5).slice(0, 6)}
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
                    Phim Trung Quốc
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-TQ"
                    classNext="nav-next-slide-TQ"
                    classPrev="nav-prev-slide-TQ"
                    urlImg={domainImage}
                    dsImg={dsPhimTrungQuoc.sort(() => Math.random() - 0.5).slice(12, 18)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Hàn Quốc
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-HQ"
                    classNext="nav-next-slide-HQ"
                    classPrev="nav-prev-slide-HQ"
                    urlImg={domainImage}
                    dsImg={dsPhimHanQuoc.sort(() => Math.random() - 0.5).slice(18, 24)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Nhật Bản
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-NhatBan"
                    classNext="nav-next-slide-NhatBan"
                    classPrev="nav-prev-slide-NhatBan"
                    urlImg={domainImage}
                    dsImg={dsPhimNhatBan.sort(() => Math.random() - 0.5).slice(18, 24)}
                ></SlideMovie>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim Bộ Thái Lan
                    <NextIcon className={cx('section-icon')} />
                </div>
            </div>
            <div className={cx('section-slide', 'section-slide-2')}>
                <SlideMovie
                    classPagination="pagination-slide-ThaiLan"
                    classNext="nav-next-slide-ThaiLan"
                    classPrev="nav-prev-slide-ThaiLan"
                    urlImg={domainImage}
                    dsImg={dsPhimThaiLan.sort(() => Math.random() - 0.5).slice(18, 24)}
                ></SlideMovie>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default PhimThue;
