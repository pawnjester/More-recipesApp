import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 *
 *
 * @export
 * 
 * @param {any} ComposedComponent
 *
 * @returns {void}
 */
export default function (ComposedComponent) {
/**
 *
 *
 * @class Authenticate
 *
 * @extends {Component}
 */
  class Authenticate extends Component {
    /**
 *
 *
 * @memberof Authenticate
 *
 * @returns {void}
 */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.history.push('/signin');
      }
    }
    /**
 * @description Component will update
 *
 * @param {any} nextProps
 *
 * @memberof Authenticate
 *
 * @returns {void}
 */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }
    /**
     * @description renders component
     *
     *
     * @memberof Authenticate
     *
     * @returns {void}
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStatetoProps)(Authenticate);
}
