import { ADD_ENEMY, UPDATE_ENEMIES, UPDATE_GENERATION, RESET_ENEMIES } from '../actions/enemy.actions';

const initialState = {
    started: false,
    enemies: [],
    frequency: 3000,
    changePoint: 100,
    lastScore: 0,
    fChange: 1,
    baseHP: 3
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_ENEMY:
            return {
                ...state,
                started: true,
                enemies: [...state.enemies, action.payload]
            }
        case UPDATE_ENEMIES:
            return {
                ...state,
                enemies: action.payload
            }
        case UPDATE_GENERATION:
            return {
                ...state,
                fChange: action.payload.fChange,
                frequency: action.payload.frequency,
                lastScore: action.payload.lastScore
            }
        case RESET_ENEMIES:
            return initialState;
        default:
            return state;
    }
}