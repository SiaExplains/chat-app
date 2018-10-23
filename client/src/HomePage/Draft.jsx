import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MailNavigation } from './MailNavigation'
import { userActions, messageActions } from '../_actions';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../styles/index.css"
import {history} from '../_helpers'

class Draft extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){
                      
        this.props.dispatch(messageActions.getDraft());

    }
    
    render(){
        const { draft } = this.props;
 
        const columns = [     
              
            {
                Header: 'کد',
                accessor: 'id', 
                width: 50,
                Cell: row => (
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        backgroundColor: "#fefefe",
                        borderRadius: "2px"
                      }}
                    >
                    {row.value}
                    </div>
                )
            },
            {
                Header: 'عنوان',
                accessor: 'title', 
                minWidth: 250,
                width: 500,
                Cell: row => (
                    <div
                      style={{
                        width: "50%",
                        height: "100%",
                        borderRadius: "2px"                        
                      }}
                    >
                    {row.value}
                    </div>
                )
            },
            {
                Header: 'تاریخ',
                accessor: 'date', 
                // width: 150,
                Cell: row => (
                    <div
                      style={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: "#fefefe",
                        borderRadius: "2px"
                      }}
                    >
                    {row.value}
                    </div>
                )
            },
            {
                Header: 'گیرنده',
                accessor: 'to', 
                // width: 200,
                Cell: row => (
                    <div
                      style={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: "#fefefe",
                        borderRadius: "2px"
                      }}
                    >
                    {row.value}
                    </div>
                )
            }              
        ];

    

      return (
          <div className="row">                                        
                  <div className="col-md-9 text-center">
                  <br /><br /><br /><br />
                  <div className="panel text-right">
                      <br /><br />
                      <div style={{fontSize: "18pt", marginRight: "30px"}}>
                          پیش نویس ها
                          </div>
                          <br /><br />
                          <ReactTable 
                          style={{direction: "rtl"}}
                              defaultPageSize={10}
                              className="-striped -highlight text-right"

                              data={draft.items}
                              columns={columns}
                          
                              getTdProps={(state, rowInfo, column, instance) => {
                                  return {
                                    onClick: (e, handleOriginal) => {

                      
                                      if (handleOriginal) {

                                        handleOriginal();
                                        history.push('/view', {id : rowInfo.row.id});
                                      }
                                    }
                                  };
                                }}
                          
                          />
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
    const { users, authentication ,draft } = state;
    const { user } = authentication;
    return {
        user,
        users,
        draft
    };
}

const connectedDraft = connect(mapStateToProps)(Draft);
export { connectedDraft as Draft };