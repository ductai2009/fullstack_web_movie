import className from 'classnames/bind';
import style from './Wrapper.module.css';

const cx = className.bind(style);
function Wrapper({ children, className, ...passProps }) {
    return (
        <div {...passProps} className={cx('wrapper', className)}>
            {children}
        </div>
    );
}

export default Wrapper;
