import driveOperations from "../constants/driveOperations";

const clear = () => ({
    type: driveOperations.CLEAR_DRIVE_LIST
})

const add = item => ({
    type: driveOperations.ADD_DRIVE, item
})

const select = item =>({
    type:driveOperations.SELECT_DRIVE, item
})

export default {
    clear, add, select
}
