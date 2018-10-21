import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { MailNavigation } from './MailNavigation'
import {Inbox} from './Inbox'
import { Router, Route } from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        const { history, location, user, users } = this.props;
        
        return (
            <div className="row">                                        
                    <div className="col-md-9 text-center">
                    <br /><br /><br /><br />
                    <div className="panel">
                        <br /><br />
                            <h1>
                                به سامانه ارسال پیام خوش آمدید
                            </h1>
                            <br /><br /><br /><br /><br /><br />
                            <br /><br /><br /><br /><br /><br />
                            <br /><br /><br /><br />
                    </div>
                        
                    </div>
                    <div className="col-md-3">
                        <MailNavigation history={this.history} location={this.location} />                        
                    </div>                    
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };