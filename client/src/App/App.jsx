import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {Inbox} from '../HomePage/Inbox'
import {Sent} from '../HomePage/Sent'
import {Draft} from '../HomePage/Draft'
import {Trash} from '../HomePage/Trash'
import {Compose} from '../HomePage/Compose'
import {ViewMessage} from '../HomePage/ViewMessage'

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div className="col-sm-10 col-sm-offset-1 container-fluid">
                    <div>
                        {
                            alert.message
                            &&
                            <div className={`alert ${alert.type}`}>
                                {alert.message}
                            </div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute path="/inbox" component={Inbox} />
                                <PrivateRoute path="/sent" component={Sent} />
                                <PrivateRoute path="/draft" component={Draft} />
                                <PrivateRoute path="/trash" component={Trash} />
                                <PrivateRoute path="/compose" component={Compose} />
                                <PrivateRoute path="/view" component={ViewMessage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 