import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const redirectTo = '/cards';

export default function (ComposedComponent) {
    class NotAuthentication extends Component {
        UNSAFE_componentWillMount() {
            if (this.props.authenticated) {
                this.props.history.push(redirectTo);
            }
        }

        UNSAFE_componentWillUpdate(nextProps) {
            if (nextProps.authenticated) {
                this.props.history.push(redirectTo);
            }
        }

        PropTypes = {
            router: PropTypes.object,
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(NotAuthentication);
}