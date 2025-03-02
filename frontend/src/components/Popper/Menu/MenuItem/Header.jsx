import className from 'classnames/bind';
import style from '../Menu.module.css';
import { PrevIcon } from '../../../Icon';

const cx = className.bind(style);
function Header({ title, onBack }) {
    return (
        <div className={cx('header-menu')}>
            <button onClick={onBack} className={cx('iconBack-menu')}>
                <PrevIcon width="2rem" height="2rem" />
            </button>
            <div className={cx('title-menu')}>{title}</div>
        </div>
    );
}

export default Header;
