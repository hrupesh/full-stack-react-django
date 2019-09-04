import React, { Component , Fragment } from 'react'
import { withAlert } from "react-alert";
import { connect }  from 'react-redux';
import PropTypes from 'prop-types'


export class Alerts extends Component {
  
    static propTypes = {
      error  : PropTypes.object.isRequired,
      message  : PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps){
      const { error , alert , message } = this.props;
      if(error !== prevProps.error){
        new Audio('http://www.wou.edu/~tbafarat06/1001%20Sound%20Effects/Transitional%20Elements/Whip%2004.wav').play();
        if(error.msg.name) alert.error("Name cannot be Blank");
        if(error.msg.username) alert.error(error.msg.username);
        if(error.msg.email) alert.error("Email : "+ error.msg.email)
        if(error.msg.message) alert.error("Message cannot be Blank");
        if(error.msg.detail) alert.error( error.msg.detail);
        if(error.msg.logout) alert.success( error.msg.logout);
        if(error.msg.non_field_errors) alert.error( error.msg.non_field_errors);
      }
      if(message !== prevProps.message){
        new Audio('http://www.wou.edu/~tbafarat06/1001%20Sound%20Effects/Transitional%20Elements/Whip%2004.wav').play();
        if(message.deleteLead) alert.success("Lead Deleted!");
        if(message.addLead) alert.success("Lead Added!");
        if(message.passwordNotMatch) alert.error(message.passwordNotMatch);
      }
        //console.log(error)
        //console.log(alert)
        //console.log(message)
    }
  
    render() {
    return (
      <Fragment  />
    )
  } 
}

const mapStateToProps = state =>({
  error : state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
