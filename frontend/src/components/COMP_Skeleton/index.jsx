import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import className from 'classnames/bind';
import style from './COMP_Skeleton.module.css';

let cx = className.bind(style);
function COMP_Skeleton({ count = 1, baseColor = '#202020', highlightColor = '#444', type = 'text', className }) {
    let classes = cx('wrapper', {
        [className]: className,
        [type]: type,
    });

    return (
        <Skeleton className={classes} count={count} baseColor={baseColor} highlightColor={highlightColor}></Skeleton>
    );
}

export default COMP_Skeleton;
