import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slide from '../../components/Slide/SlideBase';
import classNames from 'classnames/bind';
import style from './Countries.module.css';
import Button from '../../components/Button';
import apiHome from '../../services/service';
import SlideMovie from '../../components/Slide/SlideMovie';
import apiPhimBo, {
    apiPhimMoiCapNhat,
    apiPhimLe,
    apiCountries,
    apiSearchCountries,
} from '../../services/serviceCallAPI';

import Image from '../../components/Image';
import images from '../../assets/image';
import COMP_Skeleton from '../../components/COMP_Skeleton';
import { NextIcon, NextSlickIcon, PrevIcon, PrevSlickIcon } from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../../components/config';
import COM_Select from '../../components/COM_Select';

function Countries() {
    const cx = classNames.bind(style);
    const location = useLocation();

    const [optionSearch, setOptionSearch] = useState([]);
    const [slugCountries, setSlugCountries] = useState('');

    const [data, setData] = useState(location.state);

    const navigate = useNavigate();
    const [countries, setCountries] = useState({});
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
        const getCountries = async () => {
            try {
                const resultSearch = await apiCountries();
                setOptionSearch(resultSearch.dsItem);
                // console.log(resultSearch.dsItem);
            } catch (error) {
                console.error('Failed to fetch getCountries:', error);
            }
        };
        getCountries();
        const newData = location.state;
        setData(newData);
        const rows_ = chunkArray(newData.dsItem, 5);
        setRows(rows_);
        console.log('newData: ', newData);
    }, [location.state]);

    useEffect(() => {
        const searchCountries = async (Countries) => {
            try {
                if (!countries || !countries['slug']) return;

                const slug_ = countries['slug'];
                console.log('searchCountries');
                const resultSearch = await apiSearchCountries(slug_);
                navigate(config.routes.PhimThueSearch, { state: resultSearch });
            } catch (error) {
                console.error('Failed to fetch searchCountries:', error);
            }
        };
        searchCountries(Countries);
    }, [countries]);
    const handleSelectCountries = (countries) => {
        setCountries(countries);
    };
    console.log('data: ', data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('section')}>
                <div className={cx('section-title')}>
                    <Link to={config.routes.PhimThue} className={cx('icon-back')}>
                        <PrevIcon className={cx('icon')} />
                    </Link>
                    <div className={cx('title')}>Quốc Gia</div>
                    <COM_Select
                        defaultValue={data?.params?.slug || ''}
                        // defaultValue={'tinh-cam'}
                        onChange={(e) => {
                            handleSelectCountries(e);
                        }}
                        placeholder={'Chọn quốc gia'}
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

export default Countries;
