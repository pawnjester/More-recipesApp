import React, { Component } from 'react';
import  { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessages'



 export default function(ComposedComponent) {

   class Authenticate extends Component {
     componentWillMount() {
       if(!this.props.isAuthenticated){
         this.props.addFlashMessage({
           type: 'error',
           text: 'you need to log in to access this page'
         });
         this.context.router.history.push('/signin');

       }
     }

     componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }
  render() {
    return (
      <ComposedComponent {...this.props}/>
    )
  }
}

Authenticate.propTypes ={
  isAuthenticated: PropTypes.bool.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

Authenticate.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStatetoProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

return connect(mapStatetoProps, { addFlashMessage })(Authenticate);

 }

