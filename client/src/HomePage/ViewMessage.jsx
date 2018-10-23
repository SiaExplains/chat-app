import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MailNavigation } from './MailNavigation'
import { userActions, messageActions } from '../_actions';

class ViewMessage extends React.Component {

    constructor(props) {
        super(props);


        var msgId = this.props.history.location.state.id;
        this.props.dispatch(messageActions.getById(msgId));
        //this.setState()
    }

    render() {

        const { msg } = this.props;
        console.log(msg);
        return (
            <div className="row">
                <div className="col-md-9 text-center">
                    <br /><br /><br /><br />
                    <div className="panel ">
                        <br />
                
                        {
                            msg.items && 
                            <div>
                                <div className="row">
                                <div className="col-md-2">
                                        <div style={{fontSize: "10pt", textAlign: "center"}}>
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div style={{fontSize: "10pt", textAlign: "center"}}>
                                             تاریخ : {msg.items.date}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div style={{fontSize: "10pt",textAlign: "center"}}>
                                         به : {msg.items.to}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div style={{fontSize: "10pt", textAlign: "center"}}>
                                         از : {msg.items.from}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div style={{fontSize: "10pt",  textAlign: "center"}}>
                                         عنوان : {msg.items.title}
                                        </div>
                                    </div>
                                </div>
                            <br /><br /><br /><br />
                                <div className="row text-right">
                                    <div className="col-md-12 text-right">
                                        <div style={{fontSize: "10pt", margin: "30px", direction:"rtl", textAlign: "right"}}>
                                            {msg.items.messageContent}
                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br />
                            </div>
                        }
                    </div>
                    <br /><br /><br /><br />
                    <br /><br /><br /><br />
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