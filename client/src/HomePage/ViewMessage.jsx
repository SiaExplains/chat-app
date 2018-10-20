import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MailNavigation } from './MailNavigation'
import { userActions, messageActions } from '../_actions';

class ViewMessage extends React.Component {

    constructor(props){
        super(props);

        var msgId = this.props.history.location.state.id;
        this.props.dispatch(messageActions.getById(msgId));
        //console.log(this.props.msg.action.msg);
    }

    render(){

        //const {m} = this.props;
        console.log(this.props.msg);
        return (
            <div className="row">                                        
                    <div className="col-md-9 text-center">
                    <br /><br /><br /><br />
                    <div className="panel ">
                    <br /><br />
                            <h3>
                                نمایش پیام
                            </h3>

                            <br /><br />
                            <div>
                                {/* {m.msg.action.msg.title} */}
                            </div>
                            <div>
                                {/* {m.msg.action.msg.MessageContent} */}
                            </div>
                            <br /><br /><br /><br />
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
    const { users, authentication, msg } = state;
    const { user } = authentication;
    return {
        user,
        users,
        msg
    };
}

const connectedViewMessage = connect(mapStateToProps)(ViewMessage);
export { connectedViewMessage as ViewMessage };