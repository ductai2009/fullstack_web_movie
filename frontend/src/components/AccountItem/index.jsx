import classNames from 'classnames/bind';
import style from './AccountItem.module.css';
import images from '../../assets/image';
import { Link } from 'react-router-dom';
import Image from '../Image';
import PropTypes from 'prop-types';
const cx = classNames.bind(style);

function AccountItem({}) {
    return (
        <Link className={cx('content')}>
            <Image className={cx('img-account')} src={images.accountNhuY} />
            <div className={cx('info-account')}>
                <div className={cx('title')}>
                    <span> ds</span>
                </div>
                <div className={cx('desc')}></div>
            </div>
        </Link>
    );
}

export default AccountItem;
