import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/loginActions';
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
      if (this.props.isAuthenticated) {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          jwt.verify(token, process.env.SECRET_KEY, (error) => {
            if (error) {
              this.context.router.history.push('/signin');
              this.props.logout();
            }
          });
        } else {
          this.context.router.history.push('/signin');
        }
      } else {
        this.context.router.history.push('/signin');
      }
    }
    /**
     *
     *
     * @param {any} nextProps
     *
     * @memberof Authenticate
     *
     * @returns {void}
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        const token = localStorage.jwtToken;
        jwt.verify(token, process.env.SECRET_KEY, () => {
          this.context.router.history.push('/');
        });
        this.context.router.history.push('/');
      }
    }
    /**
 *
 * @description renders the jsx element
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

  return connect(mapStatetoProps, { logout })(Authenticate);
}
