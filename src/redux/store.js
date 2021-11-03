import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import api from '../config/api'

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunk.withExtraArgument(api)
        )
    )
)


export default store
