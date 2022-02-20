import { CHANGE_STATE } from "../actions/game.actions";

const initialState = {
    state: "MENU"
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_STATE:
            return {
                ...state,
                state: action.payload
            }
        default:
            return state;
    }
}