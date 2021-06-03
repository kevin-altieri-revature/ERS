import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Menu } from 'semantic-ui-react'
import User from './User';

import LoginForm from './Login';
import EmployeeHome from './EmployeeHome';
import Logout from './Logout';
import ManagerHome from './ManagerHome';
import Update from './Update';
import Employee from './Employee';

function App() {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if(localStorage.getItem('user') != '') {
      setUser(JSON.parse(localStorage.getItem('user')!));
    }
  }, []);

  console.log(localStorage.getItem('user'))

  const home = () => {
  if(user ? user.manager : false) {
    return (<Menu.Item>
              <Link to="/ManagerHome">Home</Link>
            </Menu.Item>)
  }
    return (<Menu.Item>
          <Link to="/EmployeeHome">Home</Link>
          </Menu.Item>)
  }
 
  return (
    <div className="App">
      <Router>
        <nav className="Nav">
        <Menu>
        <Menu.Item header>
          Pawnee Civil Reimbursement
        </Menu.Item>
        {home()}
        <Menu.Item position='right'>
            {user ? <Link to="/Update">Update</Link> : ''}
        </ Menu.Item>
        <Menu.Item>
            {user ? <Link to="/Logout">Logout</Link> : <Link to="/Login">Login</Link>}
        </Menu.Item>
        </Menu>
        </nav>
        <Switch>
          <Route path="/" exact>
            {user ? user.manager ? <ManagerHome /> : <EmployeeHome /> : <LoginForm />}
          </Route>
          <Route path='/Login'>
            <LoginForm />
          </Route>
          <Route path='/Logout'>
            <Logout />
          </Route>
          <Route path='/EmployeeHome'>
            <EmployeeHome />
          </Route>
          <Route path='/ManagerHome'>
            <ManagerHome />
          </Route>
          <Route path='/Update'>
            <Update />
          </Route>
          <Route path={`/employee/:employeeId/:lastName/:firstName`} component={Employee} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
