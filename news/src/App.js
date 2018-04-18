import React, {Component} from 'react';
import Dashboard from './dashboard/Dashboard';
class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">News Feed</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    </div>
                </nav>
                <Dashboard/>
            </div>
        );
    }
}

export default App;
