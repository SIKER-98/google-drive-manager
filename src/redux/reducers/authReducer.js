import authOperations from "../constants/authOperations";

const INITIAL_STATE = {
    id: '',
    username: '',
    email: '',
    accessToken: '',
    refreshToken: '',
    message: ''
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authOperations.SET_TOKEN:
            return {
                ...state,
                ...action.item
            }

        case authOperations.CLEAR_TOKEN:
            return {
                ...INITIAL_STATE
            }

        case authOperations.SET_MESSAGE:
            return {
                ...state,
                message: action.item
            }

        case authOperations.CLEAR_MESSAGE:
            return {
                ...state,
                message: ''
            }

        default:
            return state
    }
}

export default authReducer
