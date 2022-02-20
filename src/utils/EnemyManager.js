import React from 'react';
import { connect } from 'react-redux';
import { addEnemy, updateGeneration } from '../store/actions/enemy.actions';

class EnemyManager extends React.Component {

    newEnemy(){
        if(this.props.gameState === 'IN_PLAY'){
            this.props.addEnemy({
                hp: this.props.baseHP,
                x: Math.floor(Math.random() * 650) + 50,
                y: -50
            });
    
            if(this.props.score % this.props.changePoint === 0){
                if(this.props.score > this.props.lastScore){
                    this.props.updateGeneration({
                        fChange: (this.props.fChange - 0.01),
                        frequency: this.props.frequency * this.props.fChange,
                        lastScore: this.props.score
                    })
                }
            }
        }

        setTimeout(() => {
            this.newEnemy();
        }, this.props.frequency);
    }

    componentDidMount(){
        this.newEnemy();
    }

    render(){
        return <div></div>
    }
}

const mapStateToProps = (state) => ({ 
    enemies: state.enemies,
    frequency: state.enemies.frequency,
    changePoint: state.enemies.changePoint,
    lastScore: state.enemies.lastScore,
    fChange: state.enemies.fChange,
    baseHP: state.enemies.baseHP,
    gameState: state.game.state,
    score: state.player.score
});

const mapDispatchToProps = (dispatch) => {
    return {
        addEnemy: (payload) => {
            dispatch(addEnemy(payload))
        },
        updateGeneration: (payload) => {
            dispatch(updateGeneration(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnemyManager);