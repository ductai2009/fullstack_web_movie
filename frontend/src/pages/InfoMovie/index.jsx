import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './InfoMovie.module.css';
import Button from '../../components/Button';

import SlideMovie from '../../components/Slide/SlideMovie';
import apiPhimBo, { getInfoVideo } from '../../services/serviceCallAPI';

import Image from '../../components/Image';

import { NextIcon, NextSlickIcon, PlayIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import { Link, useLocation } from 'react-router-dom';
import config from '../../components/config';
import ClipLoader from 'react-spinners/ClipLoader';

import CommentSection from '@/components/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentAsync } from '@/redux/actions';

import LoginPopup from '../Auth/loginPopup';
import clsx from 'clsx';
import TrailerPopup from '@/components/Popup/TrailerPopup';

function InfoMovie() {
    const dispatch = useDispatch();
    const cx = classNames.bind(style);
    const [domainImage, setDomainImage] = useState('https://img.ophim.live/uploads/movies/');

    const [urlImgPhimBo, setUrlImgPhimBo] = useState('');
    const [dsPhimBo, setDsPhimBo] = useState([]);
    const [isSeeMore, setIsSeeMore] = useState(false);

    const dataVideo = useLocation().state;

    const [srcVideo, setSrcVideo] = useState('');
    const [poster, setPoster] = useState('');
    const [nameVideo, setNameVideo] = useState('nameVideo');
    const [year, setYear] = useState('');

    const [slug, setSlug] = useState('');
    // const [tapPhim, setTapPhim] = useState(0);
    // const [infoVideo, setInfoVideo] = useState({});
    // const [source, setSource] = useState([]);
    const [resultSearchData, setResultSearchData] = useState({});

    const user_store = useSelector((state) => state.auth);
    const [isLogin, setIsLogin] = useState(user_store?.isLogin);
    useEffect(() => {
        setIsLogin(user_store.isLogin);
    }, [user_store]);
    useEffect(() => {
        document.title = nameVideo ?? 'Glaxy play - Xem phim online';
    }, [resultSearchData]);
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

        getDataPhimBo();
    }, []);

    useEffect(() => {
        if (dataVideo) {
            dispatch(getCommentAsync(dataVideo?.slug));
            // console.log('dataVideo?.slug ', dataVideo?.slug);
            const slug = dataVideo.slug;
            setSlug(slug);
            let soTap = dataVideo.soTap ? dataVideo.soTap - 1 : 0;

            const apiInfoVideo = async (slug) => {
                try {
                    const resultSearch = await getInfoVideo(slug);
                    const sourceResult = resultSearch.dsItem.episodes[0].server_data;
                    // setSource(() => {
                    //     const value = resultSearch.dsItem.episodes[0].server_data;
                    //     return value;
                    // });

                    setResultSearchData(resultSearch);
                    console.log('resultSearchData ', resultSearchData);
                    // setYear(resultSearch.dsItem.created['time']);

                    const slug_ = resultSearch.dsItem.slug;
                    setSlug(slug_);
                    if (sourceResult.length - 1 < soTap) {
                        soTap = sourceResult.length - 1;
                    }
                    // setTapPhim(soTap);
                    // console.log('data 1: ', sourceResult);
                    // console.log('data 2: ', resultSearch);

                    const type = resultSearch.seoOnPage.seoSchema['@type'];

                    if (['TvSeries', 'Movie'].includes(type)) {
                        const poster_ = resultSearch.dsItem.poster_url;
                        const source_ = resultSearch.dsItem.episodes[0].server_data[soTap]['link_m3u8'];
                        const name_ = resultSearch.seoOnPage.titleHead;
                        // console.log('sotâpp ', soTap);
                        // setInfoVideo({
                        //     soTap: sourceResult[soTap].slug == '' ? sourceResult[soTap].name : sourceResult[soTap].slug,
                        //     TongSoTap: sourceResult.length,
                        // });

                        setPoster(() => {
                            const url = domainImage + poster_;
                            return url;
                        });

                        setSrcVideo(source_);
                        setNameVideo(name_);
                    }
                } catch (error) {
                    console.error('Failed to fetch apiInfoVideo:', error);
                }
            };
            apiInfoVideo(slug);
            return () => {};
        } else {
            console.log('No dataVideo');
        }
    }, [dataVideo]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-wrapper')}>
                <div className={cx('poster-img')}>
                    <div className={cx('bg')}></div>
                    <div className={cx('loading')}>
                        <ClipLoader size={50} color="white" loading={true} className={cx('icon-loading')} />
                    </div>
                    <Image
                        key={slug}
                        alt={resultSearchData?.dsItem?.origin_name}
                        className={cx('img-movie')}
                        src={poster}
                    />
                </div>
                <div className={cx('content-info')} key={slug}>
                    <div className={cx('name', 'animation-delay-1')}>{nameVideo}</div>
                    <div className={cx('origin_name', 'animation-delay-1')}>
                        {resultSearchData?.dsItem?.origin_name}
                    </div>
                    <div className={cx('list-episode', 'animation-delay-2')}>
                        <div className={cx('year')}>{resultSearchData?.dsItem?.year}</div>
                        <div className={cx('episode_current', 'bg-border')}>
                            {resultSearchData?.dsItem?.episode_current}
                        </div>
                        <div className={cx('tong-so-tap')}>{resultSearchData?.dsItem?.episode_total}</div>
                        <div className={cx('status', 'bg-border')}>{resultSearchData?.dsItem?.status}</div>
                        <div className={cx('time')}>{resultSearchData?.dsItem?.time}</div>
                        <div className={cx('sub_docquyen', 'bg-border')}>
                            Sub độc quyền: {resultSearchData?.dsItem?.sub_docquyen === true ? 'Có' : 'Không'}
                        </div>
                        <div className={cx('view')}>Lượt xem {resultSearchData?.dsItem?.view}</div>
                        <div className={cx('quality', 'bg-border')}>{resultSearchData?.dsItem?.quality}</div>
                    </div>

                    <div className={cx('description', 'animation-delay-3', { hidden: isSeeMore })}>
                        {resultSearchData?.seoOnPage?.descriptionHead}
                        <div onClick={() => setIsSeeMore(true)} className={cx('see-more')}>
                            Xem thêm...
                        </div>
                    </div>
                    <div className={cx('description', 'animation-delay-3', { hidden: !isSeeMore })}>
                        {resultSearchData?.dsItem?.content}
                        <div onClick={() => setIsSeeMore(false)} className={cx('see-more')}>
                            Ẩn đi...
                        </div>
                    </div>

                    <div className={cx('list-type', 'animation-delay-3')}>
                        <div className={cx('actor')}>
                            Đạo diễn
                            {resultSearchData?.dsItem?.director?.map((item, index) => {
                                return (
                                    <p key={index} className={cx('text-actor')}>
                                        {item}
                                        {index !== resultSearchData?.dsItem?.actor?.length - 1 ? ', ' : '.'}
                                    </p>
                                );
                            })}
                        </div>
                        <div className={cx('actor')}>
                            Diễn viên
                            {resultSearchData?.dsItem?.actor?.map((item, index) => {
                                return (
                                    <p key={index} className={cx('text-actor')}>
                                        {item}
                                        {index !== resultSearchData?.dsItem?.actor?.length - 1 ? ', ' : '.'}
                                    </p>
                                );
                            })}
                        </div>
                        <div className={cx('actor')}>
                            Thể loại
                            {resultSearchData?.dsItem?.category?.map((item, index) => {
                                return (
                                    <p key={index} className={cx('text-actor')}>
                                        {item['name']}
                                        {index !== resultSearchData?.dsItem?.category?.length - 1 ? ', ' : '.'}
                                    </p>
                                );
                            })}
                        </div>
                        <div className={cx('actor')}>
                            Quốc gia
                            {resultSearchData?.dsItem?.country?.map((item, index) => {
                                return (
                                    <p key={index} className={cx('text-actor')}>
                                        {item['name']}
                                        {index !== resultSearchData?.dsItem?.country?.length - 1 ? ', ' : '.'}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-row gap-6">
                        {isLogin ? (
                            <Button
                                to={config.routes.Player + '/' + slug}
                                className={cx('btn-register', 'watch-video', 'animation-delay-4')}
                                state={dataVideo}
                                leftIcon={<PlayIcon />}
                            >
                                Xem phim
                            </Button>
                        ) : (
                            <div className={cx('btn-register', 'watch-video', 'animation-delay-4')}>
                                <LoginPopup></LoginPopup>
                            </div>
                        )}
                        {resultSearchData?.dsItem?.trailer_url && (
                            <div className={cx('btn-register', 'watch-video', 'animation-delay-4', 'flex gap-2')}>
                                <PlayIcon />
                                <TrailerPopup
                                    url={resultSearchData?.dsItem?.trailer_url}
                                    nameMovie={nameVideo}
                                ></TrailerPopup>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('section', 'section-2')}>
                <div className={cx('section-title')}>
                    Phim liên quan
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
            <CommentSection slug={slug} />
            <Footer></Footer>
        </div>
    );
}

export default InfoMovie;
