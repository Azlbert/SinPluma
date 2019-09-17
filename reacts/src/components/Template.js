import React from 'react';

import AppBar from "./AppBar";
import NavBar from "./NavBar";
import Main from "./Main";
import useStyles from "./Style";

function Template(props){
    const { container } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const drawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const getMobileOpen = () => {
        console.log('Hola')
        return mobileOpen;
    }
    
    return(
        <React.Fragment>
            <AppBar 
                handleDrawerToggle={drawerToggle}
                position="fixed"
                className={classes.appBar}
            />
            <nav className={classes.drawer}>
                <NavBar
                    containera={container}
                    mobileOpen={getMobileOpen}
                    handleDrawerToggle={drawerToggle}
                />
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Main 
                />
            </main>
        </React.Fragment>
    );
};

export default Template;