'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search.component';
import Details from './components/details.component';
import Player from './components/player.component';

class App extends React.Component {

    render() {
        return (
            <div>
                <Search />
                <Details title={'Track Title'} />
                <Player />
            </div>
        );
    }
}

// Render to ID content in the DOM
ReactDOM.render(
    <App />,
    document.getElementById('content')
);