/**
 * Created by cqian19 on 5/17/2017.
 */
'use strict';

import React from 'react';

import ClassNames from 'classnames';

class Player extends React.Component {

    render() {
        const playPauseClass = ClassNames({
            'fa fa-play': this.props.playStatus == 'PLAYING' ? false : true,
            'fa fa-pause': this.props.playStatus == 'PLAYING' ? true : false
        });

        return(
            <div className="player">
                {/*Rewind Button*/}
                <div className="player__backward">
                    <button onClick={this.props.backward}><i className="fa fa-backward"></i></button>
                </div>
                <div className="player__main">
                    {/*Play/Pause Button*/}
                    <button onClick={this.props.togglePlay}><i className={playPauseClass}></i></button>
                    {/*Stop Button*/}
                    <button onClick={this.props.stop}><i className="fa fa-stop"></i></button>
                    {/*Random Track Button*/}
                    <button onClick={this.props.random}><i className="fa fa-random"></i></button>
                </div>
                <div className="player__forward">
                    <button onClick={this.props.forward}><i className="fa fa-forward"></i></button>
                </div>
            </div>
        )
    }
}

export default Player