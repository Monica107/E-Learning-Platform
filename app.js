import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '/Login';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login} />
                    {/* Add other routes here */}
                </Switch>
            </div>
        </Router>
    );
};

export default App;
