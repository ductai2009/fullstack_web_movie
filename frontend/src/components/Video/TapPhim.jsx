import Image from '@/components/Image';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import style from './Video.module.css';
import config from '@/components/config';
import ClipLoader from 'react-spinners/ClipLoader';
import { PrevIcon, WatchingIcon } from '@/components/Icon';

function TapPhim({ rows, nameVideo, source, poster, slug, urlImg }) {
    const [isTapPhim, setIsTapPhim] = useState(false);
    const cx = classNames.bind(style);
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className={cx('wrapper__soTap', { active: isTapPhim })}>
            <div className={cx('header')}>
                <div
                    className={cx('box-icon')}
                    onClick={() => {
                        setIsTapPhim(false);
                    }}
                >
                    <PrevIcon className={cx('icon')} />
                </div>
                <div className={cx('name')}>{nameVideo + ' - (' + source.length + ' tập)'}</div>
            </div>
            <div className={cx('box-gird')}>
                <div className={cx('grid')}>
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className={cx('row')}>
                            {row.map((item, index) => (
                                <Link
                                    key={index}
                                    onClick={() => setIsTapPhim(false)}
                                    to={config.routes.Player + '/' + slug}
                                    className={cx('item-img')}
                                    state={{
                                        name: item.filename,
                                        poster_url: poster,
                                        slug: slug ? slug : '',
                                        soTap: item.slug ? item.name - 1 : 0,
                                    }}
                                >
                                    <Image className={cx('img')} src={urlImg + poster} alt={item.name} />
                                    <div className={cx('desc')}>
                                        <div className={cx('name-video', 'line-clamp')}>{item.filename}</div>
                                        <div className={cx('tap-phim')}>
                                            {'Tập ' + item.slug ? 'Tập ' + item.name : item.slug || 'Tập Phim'}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TapPhim;
