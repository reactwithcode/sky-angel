import { combineReducers } from 'redux';
import { reducer as player } from './player.reducer';
import { reducer as enemies } from './enemy.reducer';
import { reducer as game } from './game.reducer';

const rootReducer = combineReducers({
	game,
	player,
	enemies,

});

export default rootReducer;
