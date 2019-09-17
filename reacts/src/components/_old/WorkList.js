import React from "react";
//import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { fetchWorksAndUsers } from '../../actions';

import WorkCard from './WorkCard';

class WorkList extends React.Component {
    componentDidMount(){
        this.props.fetchWorksAndUsers();
    };

    render() {
        return this.props.works.map(work => 
            <WorkCard key={work.id} work={work}/>
        );
    };
};

const mapStateToProps = (state) => ({
    works: state.works
});

const mapDispatchToProps = {
    fetchWorksAndUsers: fetchWorksAndUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkList);

