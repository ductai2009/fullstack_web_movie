import { useState, useRef, useEffect } from 'react';
import HeadLessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import style from './Search.module.css';
import useDebounce from '../../hooks/useDebounce';
import { toast } from 'react-toastify';
import { CloseIcon, SearchIcon, SpinnerIcon } from '../Icon';
import { apiCategories, apiPhimMoiCapNhat, apiSearch, apiSearchCategories } from '../../services/serviceCallAPI';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';
import Image from '../Image';
import images from '@/assets/image';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchHisAsync, delSearchHisAsync, getSearchHisAsync } from '@/redux/actions';
import Tippy from '@tippyjs/react';
import SearchPopup from '../Popup/SearchPopup';
import { Button } from '../ui/button';

// import 'tippy.js/dist/tippy.css'; // optional

const categories = [
    { name: 'Gia đình', image: images.search_giadinh, slug: 'gia-dinh' },
    { name: 'Tâm lý', image: images.search_tamly, slug: 'tam-ly' },
    { name: 'Hành động', image: images.search_hanhdong, slug: 'hanh-dong' },
    { name: 'Hài', image: images.search_hai, slug: 'hai-huoc' },
    { name: 'Âm nhạc', image: images.search_phimviet, slug: 'am-nhac' },
    { name: 'Võ thuật', image: images.search_kiemhiep, slug: 'vo-thuat' },
];

const cx = className.bind(style);

function Search() {
    const [searchResult, setSearchResult] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const searchHis_store = useSelector((state) => state.search);
    const [hisSearch, setHisSearch] = useState([]);
    const user_store = useSelector((state) => state.auth);
    const [showSearchResult, setShowSearchResult] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const notify = (message) => toast(message);
    const inputSearch = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();
    const searchRef = useRef();
    const [dsPhim, setDsPhim] = useState([]);
    const handleClearSearch = () => {
        setSearchResult('');
        inputSearch.current.focus();
    };

    const searchInput = useDebounce(searchResult, 600);
    const handleInputSearch = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchResult(value);
        }
    };
    useEffect(() => {
        const getDataPhimMoiCapNhat = async () => {
            try {
                const resultSearch = await apiPhimMoiCapNhat();
                setDsPhim(resultSearch.dsItem.sort(() => Math.random() - 0.5).slice(0, 10));
                let urlImg = resultSearch.urlImg;
                // setUrlImg(urlImg);
                // console.log('resultSearch ', resultSearch.dsItem);
            } catch (error) {
                console.error('Failed to fetch getDataPhimMoiCapNhat:', error);
            }
        };
        getDataPhimMoiCapNhat();
    }, []);

    useEffect(() => {
        if (isSearch) {
            dispatch(getSearchHisAsync(user_store.user.email));
            setHisSearch(searchHis_store?.data || []);
        }
    }, [isSearch]);
    useEffect(() => {
        if (isSearch) {
            setHisSearch(searchHis_store?.data || []);
        }
    }, [searchHis_store]);
    const handleNavSearch = async (searchInput) => {
        notify(`Đang tìm kiếm ${searchInput}...`);
        setLoading(true);
        const resultSearch = await apiSearch(searchInput);
        // let urlImg = resultSearch.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
        setLoading(false);
        setIsSearch(false);
        setSearchResult('');
        dispatch(addSearchHisAsync({ title: searchInput }));
        navigate(config.routes.Search, { state: resultSearch });
    };
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (searchInput === '') return;
                handleNavSearch(searchInput);
            } catch (error) {
                console.error('Failed to fetch apiSearch:', error);
            }
        };
        fetchApi();
    }, [searchInput]);
    const handleClickOutside = (e) => {
        if (isMobile) return;
        setIsSearch(false);
    };
    const handleClickSearch = async (slug_) => {
        try {
            setIsSearch(false);
            notify(`Đang tìm kiếm ${searchInput}...`);
            const resultSearch = await apiSearchCategories(slug_);
            navigate(config.routes.PhimDienAnhSearch, { state: resultSearch });
        } catch (error) {
            console.error('Failed to fetch searchCategories:', error);
        }
    };
    const handleSelectHisSearch = (movie) => {
        handleNavSearch(movie);
    };

    const handleRemoveHisSearch = (title) => {
        dispatch(delSearchHisAsync({ title: title, email: user_store.user.email }));
    };
    var clsTagHisSearch = 'relative hover:cursor-pointer bg-gray-800 text-white p-2 rounded-lg pr-10';
    var clsTagHisSearchRemove =
        'absolute top-1/2 right-1 -translate-y-1/2 hover:bg-red-900 text-white w-8 h-8 rounded-full flex items-center justify-center';
    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadLessTippy
                interactive={true}
                appendTo={document.body}
                onClickOutside={(e) => handleClickOutside(e)}
                // visible={true}
                visible={isSearch}
                placement="top-end"
                render={(attrs) => (
                    <div
                        className={cx(
                            'bg-black text-white min-w-[500px] max-lg:w-full  absolute right-0 animate-scaleIn ',
                        )}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <div className="p-4 flex flex-col gap-4 max-md:hidden">
                            <div className="flex justify-start gap-4 items-start flex-col">
                                <div>Lịch sử tìm kiếm</div>
                                <div className="flex flex-row gap-4 text-[0.9vw] flex-wrap">
                                    {(Array.isArray(hisSearch) ? hisSearch : []).map((his, index) => {
                                        return (
                                            <div key={index} className={clsTagHisSearch}>
                                                <Tippy content={his.title}>
                                                    <div
                                                        key={index}
                                                        className="line-clamp-1 max-w-[150px]"
                                                        onClick={() => handleSelectHisSearch(his.title)}
                                                    >
                                                        {his.title}
                                                    </div>
                                                </Tippy>
                                                <div
                                                    onClick={() => handleRemoveHisSearch(his.title)}
                                                    className={clsTagHisSearchRemove}
                                                >
                                                    <CloseIcon width="0.5vw" height="0.5vw" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleClickSearch(category.slug)}
                                        className="hover:cursor-pointer relative flex items-center justify-center bg-gray-700 overflow-hidden rounded-lg"
                                    >
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            className="!transition-transform duration-500 ease-in-out hover:scale-125 !overflow-hidden inset-0 w-full h-full  object-cover opacity-80"
                                        />
                                        <span className="absolute bottom-4 left-4 font-bold">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Danh sách phim gợi ý */}
                            <h3 className="mt-6 text-[1.1vw]">Có thể bạn quan tâm</h3>
                            <div className="grid grid-cols-2 mt-3 text-[0.9vw] ">
                                {dsPhim.map((movie, index) => (
                                    <div key={index} className="flex space-x-2 text-[0.9vw] font-[900]">
                                        <span className="text-gray-400">{index + 1}</span>
                                        <Tippy content={movie.name}>
                                            <Link
                                                to={config.routes.InfoMovie + '/' + movie.slug}
                                                state={{
                                                    name: movie.name,
                                                    poster_url: movie.poster_url,
                                                    slug: movie.slug ? movie.slug : '',
                                                    soTap: 1,
                                                }}
                                                onClick={() => {
                                                    setIsSearch(false);
                                                    handleNavSearch(movie.name);
                                                }}
                                                className="hover:underline hover:cursor-pointer line-clamp-1"
                                            >
                                                {movie.name}
                                            </Link>
                                        </Tippy>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            >
                <div className={cx('search', { active: isSearch }, '')} ref={searchRef}>
                    <HeadLessTippy content="Tìm kiếm">
                        <button
                            className={cx('iconSearch')}
                            onMouseDown={(e) => {
                                e.preventDefault();
                            }}
                            onClick={() => {
                                setIsSearch(!isSearch);
                            }}
                        >
                            <SearchIcon className={cx('icon')} />
                        </button>
                    </HeadLessTippy>
                    {/* <div className={cx('wrapper-searchResult')}>wrapper-searchResult</div> */}
                    <input
                        className={cx('input_search', 'w-full')}
                        ref={inputSearch}
                        placeholder="Tìm kiếm tên phim ..."
                        onChange={(e) => handleInputSearch(e)}
                        value={searchResult}
                        onClick={() => setShowSearchResult(true)}
                    />
                    {searchResult && !loading && (
                        <button className={cx('iconClear')} onClick={handleClearSearch}>
                            <CloseIcon />
                        </button>
                    )}
                    {loading && (
                        <button className={cx('iconLoading')}>
                            <SpinnerIcon className={cx('icon')} />
                        </button>
                    )}
                </div>
            </HeadLessTippy>

            <SearchPopup isOpen={isMobile && isSearch} setOpen={setIsSearch}>
                <div className="flex justify-between items-center gap-6 w-full">
                    <div className={cx('search', { active: isSearch }, '!w-full')} ref={searchRef}>
                        <HeadLessTippy content="Tìm kiếm">
                            <button
                                className={cx('iconSearch')}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                }}
                                onClick={() => {
                                    setIsSearch(!isSearch);
                                }}
                            >
                                <SearchIcon className={cx('icon')} />
                            </button>
                        </HeadLessTippy>
                        {/* <div className={cx('wrapper-searchResult')}>wrapper-searchResult</div> */}
                        <input
                            className={cx('input_search', 'w-full')}
                            ref={inputSearch}
                            placeholder="Tìm kiếm tên phim ..."
                            onChange={(e) => handleInputSearch(e)}
                            value={searchResult}
                            onClick={() => setShowSearchResult(true)}
                        />
                        {searchResult && !loading && (
                            <button className={cx('iconClear')} onClick={handleClearSearch}>
                                <CloseIcon />
                            </button>
                        )}
                        {loading && (
                            <button className={cx('iconLoading')}>
                                <SpinnerIcon className={cx('icon')} />
                            </button>
                        )}
                    </div>
                    <div
                        className="text-white hover:bg-slate-500 bg-gray-800 px-6 py-2 cursor-pointer rounded-[5px] h-full flex items-center justify-center"
                        onClick={() => setIsSearch(false)}
                    >
                        Đóng
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex justify-start gap-4 items-start flex-col">
                        <div className="text-white">Lịch sử tìm kiếm</div>
                        <div className="flex flex-row items-center gap-4 text-[1.7vw] flex-wrap font-[300]">
                            {(Array.isArray(hisSearch) ? hisSearch : []).map((his, index) => {
                                return (
                                    <div key={index} className={clsTagHisSearch}>
                                        <div
                                            key={index}
                                            className="line-clamp-1 max-w-[100px] "
                                            onClick={() => handleSelectHisSearch(his.title)}
                                        >
                                            {his.title}
                                        </div>

                                        <div
                                            onClick={() => handleRemoveHisSearch(his.title)}
                                            className={clsTagHisSearchRemove}
                                        >
                                            <CloseIcon width="1.6vw" height="1.6vw" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => handleClickSearch(category.slug)}
                                className="hover:cursor-pointer relative flex items-center justify-center bg-gray-700 overflow-hidden rounded-lg"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    className="!transition-transform duration-500 ease-in-out hover:scale-125 !overflow-hidden inset-0 w-full h-full  object-cover opacity-80"
                                />
                                <span className="absolute bottom-4 left-4 font-bold text-white">{category.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Danh sách phim gợi ý */}
                    <div className=" text-white">Có thể bạn quan tâm</div>
                    <div className="grid grid-cols-2 mt-1 text-[0.9vw] ">
                        {dsPhim.map((movie, index) => (
                            <div key={index} className="flex space-x-2 text-[1.2vw] font-[600] ">
                                <span className="text-gray-400">{index + 1}</span>

                                <Link
                                    to={config.routes.InfoMovie + '/' + movie.slug}
                                    state={{
                                        name: movie.name,
                                        poster_url: movie.poster_url,
                                        slug: movie.slug ? movie.slug : '',
                                        soTap: 1,
                                    }}
                                    onClick={() => {
                                        setIsSearch(false);
                                        handleNavSearch(movie.name);
                                    }}
                                    className="hover:underline hover:cursor-pointer !text-[1.7vw] line-clamp-1 text-white"
                                >
                                    {movie.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </SearchPopup>
        </div>
    );
}

export default Search;
