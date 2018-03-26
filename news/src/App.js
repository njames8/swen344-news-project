import React, {Component} from 'react';
import Dashboard from './dashboard/Dashboard';
class App extends Component {
    render() {
        return (
            <div>
                <nav class="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">News Feed</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a class="nav-link bg-dark" >NPR</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link bg-dark" >AP</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Dashboard/>
            </div>
        );
    }
}

export default App;
