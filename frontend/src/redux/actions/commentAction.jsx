import TypeAction from '../constantsType';
import { apiPostService, apiGetAuth, apiDeleteService, apiPutService } from '@/services/service';
export const getComment = (data) => {
    return {
        type: TypeAction.GET_COMMENT,
        payload: data,
    };
};
export const getCommentAsync = (data) => async (dispatch) => {
    try {
        const link_get_cmt = '/api/v1/comment/get';
        const param = { id_movie: data };
        const response = await apiGetAuth(link_get_cmt, param);

        dispatch(getComment(response));
    } catch (error) {
        console.error('getCommentAsync failed:', error);
        dispatch(getComment({ success: false }));
    }
};
export const addComment = (data) => {
    return {
        type: TypeAction.ADD_COMMENT,
        payload: data,
    };
};
export const addCommentAsync = (data, slug) => async (dispatch) => {
    try {
        const link_add_cmt = '/api/v1/comment/add';
        await apiPostService(link_add_cmt, {}, data);

        const link_get_cmt = '/api/v1/comment/get';
        const param = { id_movie: slug };
        const response_get = await apiGetAuth(link_get_cmt, param);

        dispatch(addComment(response_get));
    } catch (error) {
        console.error('addCommentAsync failed:', error);
        dispatch(addComment({ success: false }));
    }
};

export const addReplyComment = (data) => {
    return {
        type: TypeAction.ADD_REPLY_COMMENT,
        payload: data,
    };
};
export const addReplyCommentAsync = (data, slug) => async (dispatch) => {
    try {
        const link_reply_cmt = '/api/v1/comment/reply';
        await apiPostService(link_reply_cmt, {}, data);

        const link_get_cmt = '/api/v1/comment/get';
        const param = { id_movie: slug };
        const response_get = await apiGetAuth(link_get_cmt, param);

        dispatch(addReplyComment(response_get));
    } catch (error) {
        console.error('addReplyCommentAsync failed:', error);
        dispatch(addReplyComment({ success: false }));
    }
};
