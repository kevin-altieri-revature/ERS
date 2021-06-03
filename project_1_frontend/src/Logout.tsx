import React from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LoginForm from './Login';

const LogoutForm = () => {
    
    localStorage.setItem('user', '');

    return (
    <React.Fragment>
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
                You are now logged out.
            </Header>
            <Segment>
                <span>
                    <Link to="/Login">Login</Link>
                </span>
                <Route path='/Login'>
                    <LoginForm />
                </Route>
            </Segment>
            </Grid.Column>
        </Grid>
    </React.Fragment>
    );
};

export default LogoutForm