/**
 * Created by cqian19 on 5/17/2017.
 */

import React from 'react'
import Search from './search'

class AppContainer extends React.Container {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }


    handleSubmit() {
        postRequest(this.state.value);
    }


    handleChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        return (
            <Search
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange.bind(this)}
                searchValue={this.state.value}
            />
        );
    }
}

export default AppComponent