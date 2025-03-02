import TypeAction from '@/redux/constantsType';
import { apiPostService, apiGetAuth } from '@/services/service';

const INITIAL_STATE = {
    success: false,
    data: {},
};

export const searchReducer = (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case TypeAction.GET_SEARCH:
            return { ...state, ...actions.payload };
        case TypeAction.DEL_SEARCH:
            const data_state = state.data.filter((item) => item.title !== actions.payload.title);
            return { ...state, data: data_state };
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
