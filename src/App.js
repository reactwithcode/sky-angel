import KeyManager from './utils/KeyManager';
import GameView from './views/GameView';
import { changeState } from './store/actions/game.actions';
import { useDispatch, useSelector } from 'react-redux';
import {
	setKey,
	fireBullet,
	resetPlayer,
} from './store/actions/player.actions';
import { resetEnemies } from './store/actions/enemy.actions';
import EnemyManager from './utils/EnemyManager';
import { MenuView } from './views/MenuView';
import './App.css';

function App() {
	const HEIGHT = 600,
		WIDTH = 800;
	const dispatch = useDispatch();
	const gameState = useSelector((state) => state.game.state);
	const gameScore = useSelector((state) => state.player.score)
	const keyState = useSelector((state) => state.player.keyState);

	const audio = new Audio(
		'https://www.soundjay.com/mechanical/gun-gunshot-01.mp3'
	);

	const handleMove = (direction) => {
		dispatch(setKey(direction));
	};

	const handleStopMove = (direction) => {
		dispatch(setKey(direction));
	};

	const handleFire = () => {
		dispatch(fireBullet({ x: 375, y: 590 }));
		dispatch(audio.play());
	};

	const handlePause = () => {
		if (gameState === 'GAME_OVER') {
			dispatch(resetEnemies());
			dispatch(resetPlayer());
			dispatch(changeState('IN_PLAY'));
		}

		if (gameState === 'IN_PLAY') {
			dispatch(changeState('MENU'));
		} else {
			dispatch(changeState('IN_PLAY'));
		}
	};

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<KeyManager
				move={handleMove}
				stopMove={handleStopMove}
				fire={handleFire}
				pause={handlePause}
				keyState={keyState}
			/>
			<EnemyManager />
			<GameView height={HEIGHT} width={WIDTH} />
			{gameState !== 'IN_PLAY' && <MenuView gameState={gameState} gameScore={gameScore} />}
		</div>
	);
}

export default App;
