import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <h3>Hi {user.firstName}!</h3>                                                
                
                <Link to="/login" className="btn btn-warning">خروج</Link>
                &nbsp;
                <input type="button" className="btn btn-info" value="ارسال پیام"/>

                <br/>
				<br/>
				<div className="row">
					<div className="col-3">
						<div className="listgroup" id="width">
                        <a href="#" className="list-group-item list-group-item-action">صندوق پیام</a>
							<a href="#" className="list-group-item list-group-item-action">ارسال شده ها</a>
							<a href="#" className="list-group-item list-group-item-action">پیش نویس ها</a>							
							<a href="#" className="list-group-item list-group-item-action">پیام های حذف شده</a>
						</div>
					</div>
					<div className="col-9"></div>
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