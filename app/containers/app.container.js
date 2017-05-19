/**
 * Created by cqian19 on 5/17/2017.
 */
"use strict";

import React from 'react';

import Axios from 'axios';

import Sound from 'react-sound';
import {formatMilliseconds} from '../utils/utils';

import Search from '../components/search.component';
import Player from '../components/player.component';
import Details from '../components/details.component';
import Progress from '../components/progress.component';
import Footer from '../components/footer.component';

// Sound object play statuses
const SOUNDS = {
    STOPPED: Sound.status.STOPPED,
    PAUSED: Sound.status.PAUSED,
    PLAYING: Sound.status.PLAYING
};

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.client_id = '2f98992c40b8edf17423d93bda2e04ab';

        this.state = {
            autoCompleteValue: '', // Search Bar value
            track: {stream_url: '', title: '', artwork_url: ''},
            tracks: [],
            playStatus: SOUNDS.STOPPED,
            time_elapsed: 0, // Audio time elapsed
            elapsed: '00:00', // Audio time elapsed formatted
            total: '00:00', // Audio length
            position: 0, // Progress bar
            playFromPosition: 0 // Point in audio to continue from, set to time_elapsed
        }
    }

    componentDidMount() {
        this.randomTrack();
    }

    /* Utility method to make Soundcloud's audio artwork larger*/
    xlArtwork(url) {
        if (url != null) {
            return url.replace(/large/, 't500x500');
        }
    }

    prepareUrl = (url) => {
        return `${url}?client_id=${this.client_id}`;
    };

    randomTrack = () => {
        let _this = this;

        //Request for a playlist via Soundcloud using a client id
        Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
            .then(function (response) {
                const trackLength = response.data.tracks.length;
                const randomNumber = Math.floor((Math.random() * trackLength) + 1);
                // Set the track state with a random track from the playlist
                _this.setState({track: response.data.tracks[randomNumber]});
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    /* Search bar searches for music */
    handleChange = (event, value) => {
        // Update input box
        this.setState({autoCompleteValue: event.target.value});
        const _this = this;
        // Search for song with entered value
        Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
            .then(function(response) {
                _this.setState({tracks: response.data});
            })
            .catch(function (err) {
                console.log(err);
            }
        );
    };

    handleSelect = (value, item) => {
        this.setState({ autoCompleteValue: value, track:item });
    };

    handleSongPlaying = (audio) => {
        this.setState({
            time_elapsed: audio.position,
            elapsed: formatMilliseconds(audio.position),
            total: formatMilliseconds(audio.duration),
            position: audio.position / audio.duration
        })
    };

    handleSongFinished = () => {
        this.randomTrack();
    };

    togglePlay = () => {
        if (this.state.playStatus === SOUNDS.PLAYING) {
            // Pause if playing
            this.setState({playStatus: SOUNDS.PAUSED})
        } else {
            // Resume if paused
            this.setState({playStatus: SOUNDS.PLAYING, playFromPosition: this.state.time_elapsed})
        }
    };

    stop = () => {
        this.setState({playStatus: SOUNDS.STOPPED, playFromPosition: 0, time_elapsed: 0})
    };

    /* Fast forwards by 10 seconds */
    forward = () => {
        this.setState({playFromPosition: this.state.time_elapsed + 1000 * 10})
    };

    /* Rewinds by 10 seconds */
    backward = () => {
        this.setState({playFromPosition: this.state.time_elapsed - 1000 * 10})
    };

    render() {
        const scotchStyle = {
            width: '500px',
            height: '500px',
            backgroundImage: `linear-gradient(
                                  rgba(0, 0, 0, 0.7),
                                  rgba(0, 0, 0, 0.7)
                              ),
                              url(${this.xlArtwork(this.state.track.artwork_url)})`
        };
        return (
            <div className="scotch_music" style={scotchStyle}>
                <Search
                    autoCompleteValue={this.state.autoCompleteValue}
                    tracks={this.state.tracks}
                    handleSelect={this.handleSelect}
                    handleChange={this.handleChange}
                />
                <Sound
                    url={this.prepareUrl(this.state.track.stream_url)}
                    playStatus={this.state.playStatus}
                    onPlaying={this.handleSongPlaying} // Passes parameter with position and duration
                    playFromPosition={this.state.playFromPosition} // Video start time
                    onFinishedPlaying={this.handleSongFinished} // Called upon finishing video
                />
                <Player
                    togglePlay={this.togglePlay}
                    stop={this.stop}
                    playStatus={this.state.playStatus}
                    forward={this.forward}
                    backward={this.backward}
                    random={this.randomTrack}
                />
                <Details
                    title={this.state.track.title}
                />
                <Progress
                    elapsed={this.state.elapsed}
                    total={this.state.total}
                    position={this.state.position}
                />
                <Footer />
            </div>
        );
    }
}

export default AppContainer