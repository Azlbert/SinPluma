import React from "react";
import { connect } from 'react-redux';
import { fetchWorksAndUsers } from '../actions';

import UserHeader from './UserHeader';

class WorkList extends React.Component {
    componentDidMount(){
        this.props.fetchWorksAndUsers();
    };

    render() {
        return this.props.works.map(work => {
            return (
                <div key={work.id}>
                    {work.title + " "}
                    <UserHeader userId ={work.userId}/>
                </div>
            );
        });
    };
};

const mapStateToProps = (state) => ({
    works: state.works
});

const mapDispatchToProps = {
    fetchWorksAndUsers: fetchWorksAndUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkList);

