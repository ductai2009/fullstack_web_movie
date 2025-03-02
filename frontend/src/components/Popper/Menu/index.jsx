import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless'; // different import path!

import className from 'classnames/bind';
import style from './Menu.module.css';

import { Wrapper as WrapperLayout } from '../../Popper';
import MenuItem from './MenuItem';
import Header from './MenuItem/Header';
import { useEffect, useState } from 'react';

const cx = className.bind(style);
function Menu({ children, item = [], onChange }) {
    const [history, setHistory] = useState([{ data: item }]);
    const current = history[history.length - 1];
    const handleClickBack = () => {
        setHistory(history.splice(0, history.length - 1));
    };

    const itemData = current.data;
    const [isVisible, setIsVisible] = useState(false);

    const renderItem = () => {
        return itemData.map((item, index) => {
            let isParent = !!item.children;
            const handleMenuClick = (item) => {
                if (isParent) {
                    setHistory([...history, item.children]);
                } else if (item.onChange) {
                    item.onChange(item);
                    if (item.type !== false) setIsVisible(false);
                } else {
                    if (item.type !== false) setIsVisible(false);
                }
            };
            // console.log('children: ', item.to);
            return <MenuItem to={item.to} key={index} data={item} onClick={() => handleMenuClick(item)}></MenuItem>;
        });
    };
    return (
        <TippyHeadless
            interactive
            visible={isVisible}
            appendTo={document.body}
            onClickOutside={() => {
                setIsVisible(false);
            }}
            placement="bottom-end"
            delay={[0, 500]}
            render={(attrs) => (
                <div className={cx('menu-item')} tabIndex="-1" {...attrs}>
                    <WrapperLayout
                        onMouseLeave={() => {
                            setIsVisible(false);
                        }}
                    >
                        {history.length > 1 && <Header onBack={handleClickBack} title="Language" />}
                        <div className={cx('menu-item__item')}>{renderItem()}</div>
                    </WrapperLayout>
                </div>
            )}
            onHide={() => {
                setHistory((his) => his.slice(0, 1));
            }}
        >
            <div
                onMouseEnter={() => {
                    setIsVisible(true);
                }}
            >
                {children}
            </div>
        </TippyHeadless>
    );
}

export default Menu;
