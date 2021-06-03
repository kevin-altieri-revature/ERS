import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import './App.css';
import { Table, Button, Icon, Grid, Header, Segment} from 'semantic-ui-react'
import './Login';
import User from './User';
import Reimbursement from './Reimbursement';
import axios, {AxiosResponse} from 'axios';
import Tables from './Tables';

const Employee = () => {
  console.log(useParams())

  //@ts-ignore
  const { employeeId } = useParams();
  const history = useHistory();

  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [pending, setPending] = useState(false)

  if(localStorage.getItem('user') == '') {
    history.push('./Login')
  }
  const [loggedUser, setLoggedUser] = useState<User>(JSON.parse(localStorage.getItem('user')!));
  if(!loggedUser.manager) {
    history.push('./EmployeeHome');
  }
  
  const getReimbursements = (): Promise<AxiosResponse<Reimbursement[]>> => {
    return axios.get("http://localhost:8080/api/reimbursements/" + employeeId, {headers: { 'Content-Type': 'application/json'}});
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('user')!));
    (async () => {
      const reimbursementResponse = await getReimbursements();
      setReimbursements(reimbursementResponse.data);
    })()
  }, []);

  const toggleButton = (event : any) => {
    setPending(!pending);
  }

  return(
    <div>
      <React.Fragment>
      <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
          <Grid.Column style={{ width: '90%' }}>
          <Header>Welcome {loggedUser.firstName} {loggedUser.lastName}</Header>
          <Header></Header>
          <Segment>
          <Grid>
            <Grid.Column width="9">
              <Button id='pending' toggle active={pending} onClick={toggleButton}>
                Pending
              </Button>
              <Button id='resolved' toggle active={!pending} onClick={toggleButton}>
                Resolved
              </Button>
          </Grid.Column>
          <Grid.Column width="7">
              <Button id='back' onClick={history.goBack} content='Back'/>
          </Grid.Column>
          </Grid>
          </Segment>
          {Tables.assembleReimbursementTable(reimbursements, pending)}
          </Grid.Column>
      </Grid>
  </React.Fragment>
  </div>
  );
}

export default Employee;