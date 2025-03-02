import TypeAction from '../constantsType';
import { apiPostService, apiGetAuth, apiDeleteService, apiPutService } from '@/services/service';
export const userLogin = (data) => {
    return {
        type: TypeAction.AUTH_LOGIN,
        payload: data,
    };
};

export const userLoginAsync = (data) => async (dispatch) => {
    try {
        const link_login = '/api/v1/auth/login';
        const response = await apiPostService(link_login, {}, data);

        dispatch(userLogin(response));
    } catch (error) {
        console.error('userLoginAsync failed:', error);
    }
};

export const checkAuth = (data) => {
    return {
        type: TypeAction.AUTH_CHECK,
        payload: data,
    };
};

export const checkAuthAsync = () => async (dispatch) => {
    try {
        const link_check = '/api/v1/auth/check';
        const response = await apiGetAuth(link_check);

        dispatch(checkAuth(response));
    } catch (error) {
        console.error('checkAuthAsync failed:', error);
        dispatch(checkAuth({ success: false }));
    }
};
export const userLogout = (data) => {
    return {
        type: TypeAction.AUTH_LOGOUT,
        payload: data,
    };
};
export const userLogoutAsync = () => async (dispatch) => {
    try {
        const link_logout = '/api/v1/auth/logout';
        const response = await apiGetAuth(link_logout);
        dispatch(userLogout(response));
    } catch (error) {
        console.error('userLogoutAsync failed:', error);
        dispatch(userLogout({ success: false }));
    }
};
export const userRegister = (data) => {
    return {
        type: TypeAction.AUTH_REGISTER,
        payload: data,
    };
};
export const userRegisterAsync =
    (data, isAdmin = false) =>
    async (dispatch) => {
        try {
            const link_register = '/api/v1/auth/register';
            const dataBody = { ...data, isCookie: isAdmin };
            const response = await apiPostService(link_register, {}, dataBody);

            if (isAdmin) return;
            dispatch(userRegister(response));
        } catch (error) {
            console.error('userRegisterAsync failed:', error);
            if (isAdmin) return;
            dispatch(userRegister({ success: false }));
        }
    };

export const getAllUser = (data) => {
    return {
        type: TypeAction.GET_ALL_USER,
        payload: data,
    };
};
export const getUser = (data) => {
    return {
        type: TypeAction.GET_USER,
        payload: data,
    };
};
export const getAllUserAsync = () => async (dispatch) => {
    try {
        const link_get_user = '/api/v1/auth/getall';
        const response = await apiGetAuth(link_get_user);
        dispatch(getAllUser(response));
    } catch (error) {
        console.error('getAllUserAsync failed:', error);
    }
};
export const updateUser = (data) => {
    return {
        type: TypeAction.UPDATE_USER,
        payload: data,
    };
};
export const updateUserAsync =
    (data, isGetAll = false) =>
    async (dispatch) => {
        try {
            const link_put_user = '/api/v1/auth/update';
            const update = await apiPutService(link_put_user, {}, data);

            if (isGetAll) {
                const link_get_user = '/api/v1/auth/getall';
                const response = await apiGetAuth(link_get_user);

                dispatch(getAllUser(response));
            } else {
                dispatch(getUser(update));
            }
        } catch (error) {
            console.error('updateUserAsync failed:', error);
        }
    };

export const changePasswordUserAsync = async (data) => {
    try {
        const link_put_user = '/api/v1/auth/change-pw';
        const paramBody = {
            id: data.id ? data.id : data._id,
            password: data.password,
            newPassword: data.newPassword,
        };
        const res = await apiPutService(link_put_user, {}, paramBody);
        return res;
    } catch (error) {
        console.error('changePasswordUserAsync failed:', error);
    }
};
export const deleteUser = (data) => {
    return {
        type: TypeAction.DELETE_USER,
        payload: data,
    };
};
export const deleteUserAsync =
    (data, isGetAll = false) =>
    async (dispatch) => {
        try {
            const link_get_user = '/api/v1/auth/delete';
            const deleteUser = await apiDeleteService(link_get_user, {}, data);

            if (isGetAll) {
                const link_get_user = '/api/v1/auth/getall';
                const response = await apiGetAuth(link_get_user);
                dispatch(getAllUser(response));
            }
            return deleteUser;
        } catch (error) {
            console.error('deleteUserAsync failed:', error);
        }
    };
