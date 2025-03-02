import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react/headless'; // different import path!

import className from 'classnames/bind';
import style from '../Menu.module.css';
import Button from '../../../Button';

const cx = className.bind(style);
function MenuItem({ data, onClick, to, onChange }) {
    return (
        <Button
            to={to}
            onChange={onChange}
            onClick={onClick}
            className={cx('item-menu', { separate: data.separate }, { inactive: data.type == false })}
            text
            leftIcon={data.icon}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
