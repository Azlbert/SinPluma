import React from "react";
import { connect } from 'react-redux';

class UserHeader extends React.PureComponent {
    render() {
        const { user } = this.props;
        if(!user) {
            return null
        }

        return <b>{user.name}</b>;
    };
};

const mapStateToProps = (state, ownProps) => ({
    user: state.users.find(user => user.id === ownProps.userId)
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);