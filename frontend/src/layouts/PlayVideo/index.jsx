import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import classNames from 'classnames/bind';
import style from './PlayVideo.module.css';

const cx = classNames.bind(style);
function PlayVideo({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__content')}>
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default PlayVideo;
