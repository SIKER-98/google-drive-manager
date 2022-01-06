import authOperations from "../constants/authOperations";

const clear = () => ({
    type: authOperations.CLEAR_TOKEN
})

const setToken = (item) => ({
    type: authOperations.SET_TOKEN, item
})

const setMessage = (item) => ({
    type: authOperations.SET_MESSAGE, item
})

const clearMessage = () => ({
    type: authOperations.CLEAR_MESSAGE
})


export default {
    clear, setToken, setMessage, clearMessage
}
