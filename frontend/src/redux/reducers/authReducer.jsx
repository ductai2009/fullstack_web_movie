import TypeAction from '@/redux/constantsType';

const INITIAL_STATE_AUTH = {
    success: false,
    isLogin: false,
};
const INITIAL_STATE_USER = {
    success: false,
    user: {},
};
const INITIAL_STATE_ALL_USER = {
    success: false,
    user: {},
};

export const authReducer = (state = INITIAL_STATE_AUTH, actions) => {
    switch (actions.type) {
        case TypeAction.RESET_STORE:
            return { ...INITIAL_STATE_AUTH };
        case TypeAction.AUTH_CHECK:
            if (actions.payload?.user?.status !== 'active') {
                state.isLogin = false;
            } else if (actions.payload?.user?.status === 'active') {
                state.isLogin = actions.payload.success;
            }

            return { ...state, ...actions.payload, ...actions.payload.user };
        case TypeAction.AUTH_LOGIN:
            if (actions.payload?.user?.status !== 'active') {
                state.isLogin = false;
            } else if (actions.payload?.user?.status === 'active') {
                state.isLogin = actions.payload.success;
            }
            return { ...state, ...actions.payload, ...actions.payload.user };
        case TypeAction.AUTH_LOGOUT:
            state.isLogin = !actions.payload?.success;
            return { ...INITIAL_STATE_AUTH };
        case TypeAction.AUTH_REGISTER:
            state.isLogin = actions.payload?.success;

            if (actions.payload.success === true) {
                return { ...state, ...actions.payload.user, ...actions.payload };
            }
            return { ...actions.payload };
        default:
            return state;
    }
};
export const userReducer = (state = INITIAL_STATE_USER, actions) => {
    switch (actions.type) {
        case TypeAction.GET_USER:
            return { ...state, ...actions.payload };

        default:
            return state;
    }
};
export const allUserReducer = (state = INITIAL_STATE_ALL_USER, actions) => {
    switch (actions.type) {
        case TypeAction.GET_ALL_USER:
            return { ...state, ...actions.payload };

        default:
            return state;
    }
};
// trong reducers thì phải có 2 tham số, state và actions, ko đc chứa async nếu ko nó sẽ trả về obj dạng promise gây khó trong xử lý dữ liệu, nên dùng thunk để tạo async trong actions
