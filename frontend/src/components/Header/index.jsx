import classNames from 'classnames/bind';
import style from './Header.module.css';
import images from '@/assets/image';
import Button from '@/components/Button';
import config from '@/components/config';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    SearchIcon,
    LogOutIcon,
    LanguageIcon,
    FeedBackIcon,
    AccountIcon,
    SettingIcon,
    MoreNavIcon,
} from '@/components/Icon';
import Search from '@/components/Search';

import Image from '@/components/Image';
import Menu from '@/components/Popper/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuthAsync, getSearchHisAsync, userLogoutAsync } from '@/redux/actions';
import ScrollToTopButton from '../ScrollToTopButton';

function Header() {
    const cx = classNames.bind(style);
    const dispatch = useDispatch();

    const [isAuth, setIsAuth] = useState(false);

    const link_avatar = '/src/assets/avatars';
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(checkAuthAsync());
    }, []);

    const handleLogout = () => {
        dispatch(userLogoutAsync());
        setIsAuth(false);
        navigate(config.routes.Home);
    };

    const MENU_NO_ACC = [
        {
            title: 'Ngôn Ngữ',
            icon: <LanguageIcon />,
            to: '',
            children: {
                title: 'Language',
                data: [
                    { code: 'vi', title: 'Tiếng Việt' },
                    { code: 'en', title: 'Tiếng Anh', type: false },
                ],
            },
        },
        {
            title: 'Hỗ trợ',
            icon: <FeedBackIcon />,
            to: '',
            type: false,
        },
    ];
    const MENU_ADMIN = [
        {
            title: 'Quản lý tài khoản',
            icon: <AccountIcon />,
            to: config.routes.UserManager,
        },
    ];
    const [MENU_ACC, setMENU_ACC] = useState([
        ...MENU_NO_ACC,
        {
            title: 'Tài khoản',
            icon: <AccountIcon />,
            to: config.routes.Account,
        },

        {
            title: 'Cài đặt',
            icon: <SettingIcon />,
            to: '',
            type: false,
        },
        {
            title: 'Log out',
            icon: <LogOutIcon />,
            to: '',
            onChange: () => {
                handleLogout();
            },
            separate: true,
        },
    ]);
    const authCheck = useSelector((state) => state.auth);

    const [currentUser, setCurrentUser] = useState(authCheck.user);
    const [avatar, setAvatar] = useState(authCheck?.user?.image ? authCheck?.user?.image : authCheck?.image);

    useEffect(() => {
        // console.log('authCheck <1>', authCheck);
        if (authCheck.success === true && authCheck.user && authCheck.isLogin === true) {
            setIsAuth(true);
            dispatch(getSearchHisAsync(authCheck?.user?.email));
            setCurrentUser(authCheck.user);
            setAvatar(authCheck?.user?.image ? authCheck?.user?.image : authCheck?.image);
            if (authCheck.success === true && authCheck.user.isAdmin === true && authCheck.isLogin === true) {
                setMENU_ACC([...MENU_ADMIN, ...MENU_ACC]);
            } else {
                setMENU_ACC([...MENU_ACC]);
            }
        } else {
            setIsAuth(false);
            dispatch(getSearchHisAsync(''));
            // console.log('Chưa đăng nhập');
        }
    }, [authCheck]);

    const MENU_NAV = [
        {
            title: 'Trang Chủ',
            icon: '',
            to: config.routes.Home,
        },
        {
            title: 'Kho Phim',
            icon: '',
            to: config.routes.WareHouse,
        },
        {
            title: 'Phim Điện Ảnh',
            icon: '',
            to: config.routes.PhimDienAnh,
        },
        {
            title: 'Phim Bộ',
            icon: '',
            to: config.routes.PhimBo,
        },
        {
            title: 'Phim Thuê',
            icon: '',
            to: config.routes.PhimThue,
        },
    ];
    const [isVisible, setIsVisible] = useState(false);
    const handleHoverAvatar = () => {
        setIsVisible(true);
    };
    return (
        <div className={cx('wrapper', 'fixed z-10 top-0 left-0 right-0 bg-[#101010] !p-[8px_4%] min-h-[72px] w-dvw ')}>
            <div className={cx('content', 'flex justify-between items-center')}>
                <div
                    className={cx(
                        'nav',
                        'w-fit  gap-12 flex justify-between items-center overflow-hidden z-2 max-lg:flex  max-lg:justify-between  max-lg:flex-1',
                    )}
                >
                    <div className={cx('logo', 'max-lg:order-2  max-lg:w-full max-lg:justify-center max-lg:flex')}>
                        <Link to={config.routes.Home} className={cx('logo-img')}>
                            <img className="w-[80px] h-[50px]" src={images.logo} alt="logo"></img>
                        </Link>
                    </div>
                    <div className={cx('item-nav', 'max-lg:order-1 max-lg:w-fit w-full flex items-center z-2')}>
                        <Menu item={MENU_NAV}>
                            <div className={cx('nav-icon-more', 'hidden cursor-pointer max-lg:flex max-lg:p-[12px]')}>
                                <MoreNavIcon className={cx('icon-more')} />
                            </div>
                        </Menu>

                        <div className={cx('nav-list', 'max-lg:hidden flex items-center justify-between w-fit gap-12')}>
                            <NavLink
                                end
                                className={(nav) =>
                                    cx('nav', 'group flex items-center justify-between overflow-hidden z-2', {
                                        active: nav.isActive,
                                    })
                                }
                                to={config.routes.Home}
                            >
                                <div
                                    className={cx(
                                        'item',
                                        'group-[.active]:text-white text-[hsla(0,0%,100%,0.6)] hover:text-white text-[16px] leading-[22px] block text-center transition ease-in-out duration-300 cursor-pointer px-4 py-2',
                                    )}
                                >
                                    Trang chủ
                                </div>
                            </NavLink>
                            <NavLink
                                end
                                className={(nav) =>
                                    cx('nav', ' group flex items-center justify-between overflow-hidden z-2', {
                                        active: nav.isActive,
                                    })
                                }
                                to={config.routes.WareHouse}
                            >
                                <div
                                    className={cx(
                                        'item',
                                        'group-[.active]:text-white text-[hsla(0,0%,100%,0.6)] hover:text-white text-[16px] leading-[22px] block text-center transition ease-in-out duration-300 cursor-pointer px-4 py-2',
                                    )}
                                >
                                    Kho Phim
                                </div>
                            </NavLink>
                            <NavLink
                                end
                                className={(nav) =>
                                    cx('nav', 'group flex items-center justify-between overflow-hidden z-2', {
                                        active: nav.isActive,
                                    })
                                }
                                to={config.routes.PhimDienAnh}
                            >
                                <div
                                    className={cx(
                                        'item',
                                        'group-[.active]:text-white text-[hsla(0,0%,100%,0.6)] hover:text-white text-[16px] leading-[22px] block text-center transition ease-in-out duration-300 cursor-pointer px-4 py-2',
                                    )}
                                >
                                    Phim Điện Ảnh
                                </div>
                            </NavLink>
                            <NavLink
                                end
                                className={(nav) =>
                                    cx('nav', 'group flex items-center justify-between overflow-hidden z-2', {
                                        active: nav.isActive,
                                    })
                                }
                                to={config.routes.PhimBo}
                            >
                                <div
                                    className={cx(
                                        'item',
                                        'group-[.active]:text-white text-[hsla(0,0%,100%,0.6)] hover:text-white text-[16px] leading-[22px] block text-center transition ease-in-out duration-300 cursor-pointer px-4 py-2',
                                    )}
                                >
                                    Phim Bộ
                                </div>
                            </NavLink>
                            <NavLink
                                end
                                className={(nav) =>
                                    cx('nav', 'group flex items-center justify-between overflow-hidden z-2', {
                                        active: nav.isActive,
                                    })
                                }
                                to={config.routes.PhimThue}
                            >
                                <div
                                    className={cx(
                                        'item',
                                        'group-[.active]:text-white text-[hsla(0,0%,100%,0.6)] hover:text-white text-[16px] leading-[22px] block text-center transition ease-in-out duration-300 cursor-pointer px-4 py-2',
                                    )}
                                >
                                    Phim Thuê
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className={cx('action', 'flex items-center gap-[16px] max-lg:w-fit')}>
                    {isAuth === false ? (
                        <Button
                            primary
                            className={cx('login', 'flex items-center w-fit flex-none !p-3 !pl-8 !pr-8')}
                            to={config.routes.Login}
                        >
                            Đăng Nhập
                        </Button>
                    ) : (
                        <>
                            <Search />

                            <Menu item={MENU_ACC} className="">
                                <div
                                    className={cx(
                                        'more-icon',
                                        'account-icon',
                                        'bg-transparent ml-[24px] cursor-pointer w-[40px]',
                                    )}
                                >
                                    <div className={cx('box-current-user')}>
                                        <Image
                                            className={cx(
                                                'current-user',
                                                'w-[33px] h-[33px] rounded-full object-cover',
                                            )}
                                            fallBack={link_avatar + avatar}
                                            src={link_avatar + avatar}
                                            alt="Account"
                                        ></Image>
                                    </div>
                                </div>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
            <ScrollToTopButton />
        </div>
    );
}

export default Header;
