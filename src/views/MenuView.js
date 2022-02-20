import React, { Fragment } from 'react';

export function MenuView({ gameState, gameScore }) {
	return (
		<Fragment>
			<div
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					backgroundColor: 'rgb(192,192,192, 0.6)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{gameState === 'MENU' && (
					<div>
						<h1 style={{ textAlign: 'center' }}>Game Paused</h1>
						<h2 style={{ textAlign: 'center' }}>Press Enter to Start Game</h2>
						<p style={{ textAlign: 'center' }}>
							Press Left and Rright Arrows to Move
						</p>
						<p style={{ textAlign: 'center' }}>Press SpaceBar to Fire</p>
					</div>
				)}
				{gameState === 'GAME_OVER' && (
					<div>
						<h1 style={{ textAlign: 'center' }}>Game Over</h1>
						<h3 style={{ textAlign: 'center' }}>Your score is {gameScore}</h3>
					</div>
				)}
			</div>
		</Fragment>
	);
}
