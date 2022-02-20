import {
	SET_KEY,
	FIRE_BULLET,
	BULLETS_UPDATE,
	SET_SCORE,
	DAMAGE_PLAYER,
	RESET_PLAYER,
} from '../actions/player.actions';

const initialState = {
	lives: 10,
	score: 0,
	keyState: 0,
	bullets: [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SCORE:
			return {
				...state,
				score: action.payload,
			};
		case SET_KEY:
			return {
				...state,
				keyState: action.payload,
			};
		case FIRE_BULLET:
			return {
				...state,
				bullets: [...state.bullets, action.payload],
			};
		case BULLETS_UPDATE:
			return {
				...state,
				bullets: action.payload,
			};
		case DAMAGE_PLAYER:
			return {
				...state,
				lives: state.lives - 1,
			};
		case RESET_PLAYER:
			return initialState;
		default:
			return state;
	}
};
