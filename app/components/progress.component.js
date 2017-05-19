/**
 * Created by cqian19 on 5/17/2017.
 */
import React from 'react';

class Progress extends React.Component {

    render() {
        return (
            <div className="progress">
                <span className="player__time-elapsed">{this.props.elapsed}</span>
                <progress
                    value={this.props.position}
                    max="1"
                />
                <span className="player__time-total">{this.props.total}</span>
            </div>
        )
    }
}

export default Progress