import apiHome from './service';

const apiPhimBo = async () => {
    try {
        const resultSearch = await apiHome('/v1/api/danh-sach/phim-bo');
        const dsItem = resultSearch.data.items;
        const urlImg = resultSearch.data.APP_DOMAIN_CDN_IMAGE + '/uploads/movies/';
        const data = { dsItem, urlImg };
        return data;
    } catch (error) {
        console.error('Error fetching phim bo data:', error);
        throw error;
    }
};

const apiPhimMoiCapNhat = async () => {
    try {
        const resultSearch = await apiHome('/danh-sach/phim-moi-cap-nhat');

        const dsItem = resultSearch.items;
        const urlImg = resultSearch.pathImage;
        const data = { dsItem, urlImg };

        return data;
    } catch (error) {
        console.error('Error fetching phim bo data:', error);
        throw error;
    }
};
const apiPhimLe = async () => {
    try {
        const resultSearch = await apiHome('/v1/api/danh-sach/phim-le');

        const seoOnPage = resultSearch.data.seoOnPage;
        const dsItem = resultSearch.data.items;
        const urlImg = resultSearch.pathImage;
        const APP_DOMAIN_FRONTEND = resultSearch.data.APP_DOMAIN_FRONTEND;
        const APP_DOMAIN_CDN_IMAGE = resultSearch.data.APP_DOMAIN_CDN_IMAGE;
        const data = { dsItem, urlImg, seoOnPage, APP_DOMAIN_FRONTEND, APP_DOMAIN_CDN_IMAGE };

        return data;
    } catch (error) {
        console.error('Error fetching phim apiPhimLe:', error);
        throw error;
    }
};

const apiListMovieByType = async (type) => {
    try {
        if (
            ![
                'hoat-hinh',
                'tv-shows',
                'phim-vietsub',
                'phim-thuyet-minh',
                'phim-long-tieng',
                'phim-bo-dang-chieu',
                'phim-bo-hoan-thanh',
                'phim-sap-chieu',
                'subteam',
            ].includes(type)
        ) {
            return {};
        }
        const resultSearch = await apiHome('/v1/api/danh-sach/' + type);

        const seoOnPage = resultSearch.data.seoOnPage;
        const dsItem = resultSearch.data.items;
        // const urlImg = resultSearch.pathImage;
        const titlePage = resultSearch.data.titlePage;
        const params = resultSearch.data.params;
        const APP_DOMAIN_FRONTEND = resultSearch.data.APP_DOMAIN_FRONTEND;
        const APP_DOMAIN_CDN_IMAGE = resultSearch.data.APP_DOMAIN_CDN_IMAGE;
        const data = { dsItem, titlePage, params, seoOnPage, APP_DOMAIN_FRONTEND, APP_DOMAIN_CDN_IMAGE };

        return data;
    } catch (error) {
        console.error(`Error fetching phim apiListMovieByType: type = ${type} || error = ${error}`);

        throw error;
    }
};

const getInfoVideo = async (slug) => {
    try {
        const resultSearch = await apiHome('/v1/api/phim/' + slug);
        console.log('getInfoVideo: ', resultSearch);
        const seoOnPage = resultSearch.data.seoOnPage;
        const breadCrumb = resultSearch.data.breadCrumb;

        const dsItem = resultSearch.data.item;

        const data = { dsItem, seoOnPage, breadCrumb };

        return data;
    } catch (error) {
        console.error('Error fetching getInfoVideo:', error);
        throw error;
    }
};
const apiCategories = async () => {
    try {
        const resultSearch = await apiHome('/v1/api/the-loai');

        // console.log('apiCategories: ', resultSearch);
        const dsItem = resultSearch.data.items;

        const data = { dsItem };

        return data;
    } catch (error) {
        console.error('Error fetching apiCategories:', error);
        throw error;
    }
};
const apiCountries = async () => {
    try {
        const resultSearch = await apiHome('/v1/api/quoc-gia');

        // console.log('apiCategories: ', resultSearch);
        const dsItem = resultSearch.data.items;

        const data = { dsItem };

        return data;
    } catch (error) {
        console.error('Error fetching apiCountries:', error);
        throw error;
    }
};
const apiSearchCategories = async (slug) => {
    try {
        const resultSearch = await apiHome('/v1/api/the-loai/' + slug);
        console.log('apiSearchCategories: ', resultSearch);
        const dsItem = resultSearch.data.items;
        const seoOnPage = resultSearch.data.seoOnPage;
        const titlePage = resultSearch.data.titlePage;
        const params = resultSearch.data.params;

        const APP_DOMAIN_FRONTEND = resultSearch.data.APP_DOMAIN_FRONTEND;
        const APP_DOMAIN_CDN_IMAGE = resultSearch.data.APP_DOMAIN_CDN_IMAGE;
        const data = { dsItem, seoOnPage, titlePage, params, APP_DOMAIN_FRONTEND, APP_DOMAIN_CDN_IMAGE };

        return data;
    } catch (error) {
        console.error('Error fetching apiSearchCategories:', error);
        throw error;
    }
};
const apiSearchCountries = async (slug) => {
    try {
        const resultSearch = await apiHome('/v1/api/quoc-gia/' + slug);
        console.log('apiSearchCountries: ', resultSearch);
        const dsItem = resultSearch.data.items;
        const seoOnPage = resultSearch.data.seoOnPage;
        const titlePage = resultSearch.data.titlePage;
        const params = resultSearch.data.params;

        const APP_DOMAIN_FRONTEND = resultSearch.data.APP_DOMAIN_FRONTEND;
        const APP_DOMAIN_CDN_IMAGE = resultSearch.data.APP_DOMAIN_CDN_IMAGE;
        const data = { dsItem, seoOnPage, titlePage, params, APP_DOMAIN_FRONTEND, APP_DOMAIN_CDN_IMAGE };

        return data;
    } catch (error) {
        console.error('Error fetching apiSearchCountries:', error);
        throw error;
    }
};
const apiSearch = async (slug) => {
    try {
        const encodedSlug = encodeURIComponent(slug);
        const resultSearch = await apiHome('/v1/api/tim-kiem?keyword=' + encodedSlug);

        const seoOnPage = resultSearch.data.seoOnPage;
        const breadCrumb = resultSearch.data.breadCrumb;
        // console.log('apiSearch: ', resultSearch);
        const dsItem = resultSearch.data.items;
        const titlePage = resultSearch.data.titlePage;
        const APP_DOMAIN_FRONTEND = resultSearch.data.APP_DOMAIN_FRONTEND;
        const APP_DOMAIN_CDN_IMAGE = resultSearch.data.APP_DOMAIN_CDN_IMAGE;
        const data = { dsItem, seoOnPage, breadCrumb, titlePage, APP_DOMAIN_FRONTEND, APP_DOMAIN_CDN_IMAGE };

        return data;
    } catch (error) {
        console.error('Error fetching apiSearch:', error);
        throw error;
    }
};
export default apiPhimBo;
export {
    apiPhimMoiCapNhat,
    apiPhimLe,
    getInfoVideo,
    apiSearch,
    apiCategories,
    apiSearchCategories,
    apiCountries,
    apiSearchCountries,
    apiListMovieByType,
};
