import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './Categories.module.css';
import Button from '../../components/Button';
import apiHome from '../../services/service';
import SlideMovie from '../../components/Slide/SlideMovie';
import apiPhimBo, {
    apiPhimMoiCapNhat,
    apiPhimLe,
    apiCategories,
    apiSearchCategories,
} from '../../services/serviceCallAPI';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import { NextIcon, NextSlickIcon, PrevIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../../components/config';
import COM_Select from '../../components/COM_Select';

function Categories() {
    const cx = classNames.bind(style);
    const location = useLocation();
    const [optionSearch, setOptionSearch] = useState([]);
    const [data, setData] = useState(location.state);
    const navigate = useNavigate();
    const [categories, setCategories] = useState({});
    const urlImg = data.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
    const [rows, setRows] = useState(chunkArray(data.dsItem, 5));
    useEffect(() => {
        const getCategories = async () => {
            try {
                const resultSearch = await apiCategories();
                setOptionSearch(resultSearch.dsItem);
                // console.log(resultSearch.dsItem);
            } catch (error) {
                console.error('Failed to fetch getCategories:', error);
            }
        };
        getCategories();
        const newData = location.state;
        setData(newData);
        const rows_ = chunkArray(newData.dsItem, 5);
        setRows(rows_);
    }, [location.state]);

    useEffect(() => {
        const searchCategories = async (categories) => {
            try {
                if (!categories || !categories['slug']) return;
                const slug_ = categories['slug'];

                const resultSearch = await apiSearchCategories(slug_);
                navigate(config.routes.PhimDienAnhSearch, { state: resultSearch });
            } catch (error) {
                console.error('Failed to fetch searchCategories:', error);
            }
        };
        searchCategories(categories);
    }, [categories]);
    const handleSelectCategory = (e) => {
        setCategories(e);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('section')}>
                <div className={cx('section-title')}>
                    <Link to={config.routes.PhimDienAnh} className={cx('icon-back')}>
                        <PrevIcon className={cx('icon')} />
                    </Link>
                    <div className={cx('title')}>Phim Điện Ảnh</div>
                    <COM_Select
                        defaultValue={data?.params?.slug || ''}
                        // defaultValue={'tinh-cam'}
                        onChange={(e) => {
                            handleSelectCategory(e);
                        }}
                        placeholder={'Chọn thể loại'}
                        options={optionSearch}
                        keyLabel={'name'}
                        keyValue={'slug'}
                    />
                </div>
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

                                    <Image className={cx('img')} src={urlImg + item.poster_url} alt={item.name} />
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

export default Categories;
