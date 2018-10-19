import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class MailNavigation extends React.Component {
    render(){
        const { user, users } = this.props;

        return(
            <div className="text-right">
                <div className="row">
                    <div className="col-md-12">
                    <h3>سلام {user.firstName}</h3> 
                    <br />
                    </div>                            
                </div>
                <div className="row">
                    <div className="col-md-6">
                    <Link to="/login" className="btn btn-warning btn-default btn-block">خروج</Link>                           
                    </div>
                    <div className="col-md-6">
                    <Link to="/compose" className="btn btn-success  btn-default btn-block">پیام جدید +</Link>
            
                    </div>
                </div>                   
            
                <br/>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="listgroup">
                            <Link to="/inbox" className="list-group-item list-group-item-action">صندوق پیام</Link>
                            <Link to="/sent" className="list-group-item list-group-item-action">ارسال شده ها</Link>
                            <Link to="/draft" className="list-group-item list-group-item-action">پیش نویس ها</Link>							
                            <Link to="/trash" className="list-group-item list-group-item-action">پیام های حذف شده</Link>
                        </div>
                    </div>
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

const connectedMailNavigation = connect(mapStateToProps)(MailNavigation);
export { connectedMailNavigation as MailNavigation };