import TypeAction from '@/redux/constantsType';
import { apiPostService, apiGetAuth } from '@/services/service';

const INITIAL_STATE = {
    success: false,
    message: '',
    comment: {},
};

export const commentReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case TypeAction.GET_COMMENT:
            console.log('GET_COMMENT reducer: ', actions);
            return { ...state, ...actions.payload };
        case TypeAction.ADD_COMMENT:
            console.log('ADD_COMMENT reducer: ', actions);
            return { ...state, ...actions.payload };
        case TypeAction.ADD_REPLY_COMMENT:
            console.log('ADD_REPLY_COMMENT reducer: ', actions);
            return { ...state, ...actions.payload };
        default:
            return state;
    }
};

// export const addCommentReducer = async (state = INITIAL_STATE_COMMENT, actions) => {
//     switch (actions.type) {
//         case TypeAction.ADD_COMMENT:
//             return { ...state, ...actions.payload };
//         default:
//             return state;
//     }
// };
