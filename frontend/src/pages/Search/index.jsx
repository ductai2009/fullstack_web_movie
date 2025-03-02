import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './Search.module.css';
import Button from '../../components/Button';
import apiHome from '../../services/service';
import SlideMovie from '../../components/Slide/SlideMovie';
import apiPhimBo, { apiPhimMoiCapNhat, apiPhimLe } from '../../services/serviceCallAPI';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import { NextIcon, NextSlickIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import { Link, useLocation } from 'react-router-dom';
import config from '../../components/config';
import useMediaQuery from '../../hooks/useMediaQuery';

function Search() {
    const cx = classNames.bind(style);
    const location = useLocation();
    const data = location.state;
    const urlImg = data.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
    const isMobile = useMediaQuery('(max-width: 1024px)');
    let rows = chunkArray(data.dsItem, 5);
    if (isMobile) {
        rows = chunkArray(data.dsItem, 3);
    }

    useEffect(() => {
        document.title = data.titlePage ?? 'Galaxy Play';
    }, [data]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('section')}>
                {data.titlePage && <h1 className={cx('section-title')}>Kết quả {data.titlePage}</h1>}
                <div className={cx('grid')}>
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className={cx('row')}>
                            {row.map((item, index) => (
                                <Link
                                    key={item._id}
                                    to={config.routes.InfoMovie + '/' + item._id}
                                    className={cx('item-img', 'hv-scale')}
                                    state={{
                                        name: item.name,
                                        poster_url: item.poster_url,
                                        slug: item.slug ? item.slug : '',
                                        soTap: 1,
                                    }}
                                >
                                    <div className={cx('info-video')}>
                                        <div className={cx('name-video', 'line-clamp')}>{item.name}</div>
                                        <div className={cx('time-video')}>{item.time || 'Time'}</div>
                                    </div>
                                    <div className={cx('img', 'background-hv')}>
                                        <Image className={cx('img')} src={urlImg + item.poster_url} alt={item.name} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default Search;
