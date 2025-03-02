import Home from '../pages/Home';
import Video from '../components/Video';
import WareHouse from '../pages/WareHouse';
import Movie from '../pages/Movie';
import PhimBo from '../pages/PhimBo';
import PhimThue from '../pages/PhimThue';
import Search from '../pages/Search';
import Categories from '../pages/Categories';
import Countries from '../pages/Countries';
import InfoMovie from '../pages/InfoMovie';
import PlayVideo from '../layouts/PlayVideo';

import Login from '@/pages/Auth/login';
import Register from '@/pages/Auth/Register';
import Form from '@/pages/Auth/form';
import Logout from '@/pages/Auth/logout';
import PageManager from '@/pages/Auth/PageManager';
import Account from '@/pages/Auth/Account';

import config from '../components/config';
// import config from '~/components/config';

const publicRoutes = [
    { path: config.routes.Home, component: Home },
    { path: config.routes.WareHouse, component: WareHouse },
    { path: config.routes.InfoMovieUrl, component: InfoMovie },
    { path: config.routes.Movie, component: Movie },
    { path: config.routes.PhimBo, component: PhimBo },
    { path: config.routes.PhimThue, component: PhimThue },
    { path: config.routes.PhimDienAnhSearch, component: Categories },
    { path: config.routes.PhimThueSearch, component: Countries },
    { path: config.routes.Login, component: Login, layout: null },
    { path: config.routes.Logout, component: Logout, layout: null },
    { path: config.routes.Register, component: Register, layout: null },
];

const privateRoutes = [
    { path: config.routes.PlayerUrl, component: Video, layout: PlayVideo, componentPubic: Login },
    { path: config.routes.Search, component: Search, componentPubic: Login },
    { path: config.routes.UserManager, component: PageManager, componentPubic: Login },
    { path: config.routes.Account, component: Account, componentPubic: Login },
];
export { publicRoutes, privateRoutes };
