import React from 'react';

class KeyManager extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            eventsAdded: false
        }
    }

    componentDidMount(){
        if(!this.state.eventsAdded){
            window.addEventListener('keydown', (e) => {this.handleKeyDown(e.keyCode)},false);
            window.addEventListener('keyup', (e) => {this.handleKeyUp(e.keyCode)}, false);
            this.setState({
                ...this.state,
                eventsAdded: true
            })
        }
    }

    handleKeyDown(key){
        switch(key){
            case 37:
                this.props.move(this.props.keyState | 2);
                break;
            case 39:
                this.props.move(this.props.keyState | 1);
                break;
            default:break;
        }
    }

    handleKeyUp(key){
        switch(key){
            case 37:
                this.props.stopMove(this.props.keyState &~ 2);
                break;
            case 39:
                this.props.stopMove(this.props.keyState &~ 1);
                break;
            case 32:
                this.props.fire();
                break;
            case 13:
                this.props.pause();
                break;
            default:break;
        }
    }

    render(){
        return <div></div>
    }
}

export default KeyManager;