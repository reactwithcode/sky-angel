export const CHANGE_STATE = "Change State";

export const changeState = (payload) => {
    return {
        type: CHANGE_STATE,
        payload
    }
}