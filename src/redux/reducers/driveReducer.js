import driveOperations from '../constants/driveOperations'

const INITIAL_STATE = {
    gdriveList: [],
    selectedDrive: null
}

const driveReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case driveOperations.CLEAR_DRIVE_LIST:
            return {
                ...state,
                gdriveList: [],
                selectedDrive: null
            }

        case driveOperations.ADD_DRIVE:
            state.gdriveList.push(action.item)
            return {
                ...state,
                selectedDrive: state.gdriveList[0]
            }

        case driveOperations.SELECT_DRIVE:
            return {
                ...state,
                selectedDrive: state.gdriveList.includes(action.item) ? action.item : state.gdriveList[0]
            }

        default:
            return state
    }
}

export default driveReducer
