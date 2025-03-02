import TypeAction from '../constantsType';
import { apiPostService, apiGetAuth, apiDeleteService, apiPutService } from '@/services/service';
export const getSearchHis = (data) => {
    return {
        type: TypeAction.GET_SEARCH,
        payload: data,
    };
};
export const getSearchHisAsync = (data) => async (dispatch) => {
    try {
        const link_get_cmt = '/api/v1/search/get';
        const param = { email: data };

        const response = await apiGetAuth(link_get_cmt, param);
        dispatch(getSearchHis(response));
    } catch (error) {
        console.error('getSearchHisAsync failed:', error);
        dispatch(getSearchHis({ success: false }));
    }
};
export const addSearchHis = (data) => {
    return {
        type: TypeAction.ADD_SEARCH,
        payload: data,
    };
};
export const addSearchHisAsync = (data) => async (dispatch) => {
    try {
        const link_get_cmt = '/api/v1/search/add';

        const response = await apiPostService(link_get_cmt, {}, data);
        dispatch(getSearchHis(response));
    } catch (error) {
        console.error('addSearchHisAsync failed:', error);
        dispatch(getSearchHis({ success: false }));
    }
};

export const delSearchHis = (data) => {
    return {
        type: TypeAction.DEL_SEARCH,
        payload: data,
    };
};
export const delSearchHisAsync = (data) => async (dispatch) => {
    try {
        const link_del_cmt = '/api/v1/search/remove';
        const param = { email: data?.email, title: data.title };
        dispatch(delSearchHis(data));

        const res_del = await apiDeleteService(link_del_cmt, param);
        const link_get_cmt = '/api/v1/search/get';
        const response = await apiGetAuth(link_get_cmt, param);
        dispatch(getSearchHis(response));
    } catch (error) {
        console.error('delSearchHisAsync failed:', error);
        dispatch(getSearchHis({ success: false }));
    }
};
