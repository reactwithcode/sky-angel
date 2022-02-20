import React, { createRef } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import { updateEnemies } from '../store/actions/enemy.actions';
import { changeState } from '../store/actions/game.actions';
import {
	bulletsUpdate,
	damagePlayer,
	setScore,
} from '../store/actions/player.actions';
import { drawBullet, drawEnemy, drawHero } from '../utils/drawManager';

class GameView extends React.Component {
	constructor(props) {
		super(props);
		this.gameCanvas = createRef();
		this.state = {
			x: 375,
			y: 590,
			xz: 395,
			xy: 610,
			enemySpd: 3,
			changePoint: 250,
			lastScore: 0,
		};
	}

	update = () => {
		// Update Locations
		if (this.props.keyState === 2 && this.state.x > 5) {
			this.setState({
				...this.state,
				x: this.state.x - 3,
				xy: this.state.xy - 3,
			});
		}
		if (this.props.keyState === 1 && this.state.x < 745) {
			this.setState({
				...this.state,
				x: this.state.x + 3,
				xz: this.state.xz + 3,
			});
		}

		let bullets = [];
		let enemies = [];

		this.props.bullets.forEach((b) => {
			let x = b.x,
				y = b.y - 3;
			if (y > 585) {
				x = this.state.x + 25;
			}

			if (y > 0) {
				bullets.push({ x, y });
			}
		});

		this.props.enemies.forEach((b) => {
			let x = b.x,
				y = b.y + this.state.enemySpd;

			if (y < 600 && b.hp > 0) {
				enemies.push({ x, y, hp: b.hp });
			}

			if (b.y > 600) {
				this.props.updateScore(this.props.score - 3);
			}
		});

		// Check for collisions
		if (enemies.length >= 1) {
			for (let e = 0; e < enemies.length; e++) {
				// Check Bullets
				if (bullets.length >= 1) {
					for (let i = 0; i < bullets.length; i++) {
						if (
							bullets[i] &&
							enemies[e] &&
							bullets[i].x >= enemies[e].x &&
							bullets[i].x <= enemies[e].x + 45 &&
							bullets[i].y >= enemies[e].y &&
							bullets[i].y <= enemies[e].y + 45
						) {
							enemies[e].hp = enemies[e].hp - 10;
							bullets.splice(i, 1);
							if (enemies[e].hp === 0) {
								enemies.splice(e, 1);
								this.props.updateScore(this.props.score + 5);
							}
						}
					}
				}

				// Check Player
				if (
					enemies[e] &&
					this.state.x + 25 >= enemies[e].x &&
					this.state.x + 25 <= enemies[e].x + 45 &&
					this.state.y - 10 >= enemies[e].y &&
					this.state.y - 10 <= enemies[e].y + 45
				) {
					this.props.damagePlayer();
					enemies.splice(e, 1);
				}
			}
		}

		this.props.updateBullets(bullets);
		this.props.updateEnemies(enemies);

		if (this.props.score % this.state.changePoint === 0) {
			if (this.props.score > this.props.lastScore) {
				this.setState({
					...this.state,
					enemySpd: this.state.enemySpd * 1.2,
					lastScore: this.props.score,
				});
			}
		}

		if (this.props.score < 0 || this.props.lives === 0) {
			this.props.gameOver();
		}
	};

	draw = () => {
		if (this.gameCanvas.current && this.gameCanvas.current.getContext('2d')) {
			const ctx = this.gameCanvas.current.getContext('2d');
			ctx.clearRect(0, 0, this.props.width, this.props.height);
			drawHero(ctx, this.state.x, this.state.y);
			this.props.bullets.forEach((b) => drawBullet(ctx, b.x, b.y));
			this.props.enemies.forEach((e) => drawEnemy(ctx, e.x, e.y));
		}
	};

	gameLoop = () => {
		if (this.props.gameState === 'IN_PLAY') {
			this.update();
			this.draw();
		}
		requestAnimationFrame(this.gameLoop);
	};

	componentDidMount() {
		this.gameLoop();
	}

	render() {
		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h1>SCORE: {this.props.score}</h1>
					<h1>Fuel: {this.props.lives}</h1>
				</div>
				<canvas
					ref={this.gameCanvas}
					id="game-canvas"
					width={this.props.width}
					height={this.props.height}
					style={{
						border: '1px solid black',
					}}
				/>
				<Sound
					autoLoad
					url="https://soundimage.org/wp-content/uploads/2020/03/Ancient-Game-Open.mp3"
					playStatus={Sound.status.PLAYING}
					onLoading={this.handleSongLoading}
					onPlaying={this.handleSongPlaying}
					onFinishedPlaying={this.handleSongFinishedPlaying}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	lives: state.player.lives,
	score: state.player.score,
	gameState: state.game.state,
	keyState: state.player.keyState,
	bullets: state.player.bullets,
	enemies: state.enemies.enemies,
});

const mapDispatchToProps = (dispatch) => {
	return {
		gameOver: () => {
			dispatch(changeState('GAME_OVER'));
		},
		updateBullets: (bullets) => {
			dispatch(bulletsUpdate(bullets));
		},
		updateEnemies: (enemies) => {
			dispatch(updateEnemies(enemies));
		},
		updateScore: (val) => {
			dispatch(setScore(val));
		},
		damagePlayer: () => {
			dispatch(damagePlayer());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
