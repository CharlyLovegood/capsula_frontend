import { userConstants } from '../constants';

const initialState = {};

export function userpage(state = initialState, action) {
    switch (action.type) {
        case userConstants.USERPAGE_REQUEST:
            return {
                requestingUserInfo: true,
                user: action.user
            };
        case userConstants.USERPAGE_SUCCESS:
            return {
                userInfoRecieved: true,
                user: action.user
            };
        case userConstants.USERPAGE_FAILURE:
            return {
                userInfoRecieved: false,
                error: action.error
            };
        default:
            return state;
    }
}