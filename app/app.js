'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search.component';
import Details from './components/details.component';
import Player from './components/player.component';
import Progress from './components/progress.component';

class App extends React.Component {

    render() {
        return (
            <div>
                <Search />
                <Details title={'Track Title'} />
                <Player />
                <Progress
                    position={'0.3'}
                    elapsed={'00:00'}
                    total={'0:40'}
                />
            </div>
        );
    }
}

// Render to ID content in the DOM
ReactDOM.render(
    <App />,
    document.getElementById('content')
);