import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './App.css';
import {Table, Button, Icon, Grid, Header, Modal, Form, Segment} from 'semantic-ui-react'
import './Login';
import User from './User';
import Reimbursement from './Reimbursement';
import axios, {AxiosResponse} from 'axios';

class Tables {
    static assembleReimbursementTable(reimbursements: Reimbursement[], pending: boolean) {
      throw new Error('Method not implemented.');
    }

    resolvedTable(reimbursements: Reimbursement[]) {
        return reimbursements.filter(reimbursement => reimbursement.pending == false)
        .map((reimbursement) => (
          <Table.Row>
            <Table.Cell>{reimbursement._id}</Table.Cell>
            <Table.Cell>${reimbursement.money}</Table.Cell>
            <Table.Cell>{reimbursement.message}</Table.Cell>
            <Table.Cell>{reimbursement.date}</Table.Cell>
            {reimbursement.approved ? <Table.Cell positive><Icon name='checkmark' />Approved</Table.Cell> : 
                                      <Table.Cell negative><Icon name='close' />Denied</Table.Cell>
            }
            <Table.Cell>{reimbursement.manager}</Table.Cell>
          </Table.Row>
        ))
    }
    
    pendingTable (reimbursements: Reimbursement[]) {
        return reimbursements.filter(reimbursement => reimbursement.pending == true)
        .map((reimbursement) => (
          <Table.Row>
            <Table.Cell>{reimbursement._id}</Table.Cell>
            <Table.Cell>${reimbursement.money}</Table.Cell>
            <Table.Cell>{reimbursement.message}</Table.Cell>
            <Table.Cell>{reimbursement.date}</Table.Cell>
          </Table.Row>
        ))
    }
    
    assembleReimbursementTable(reimbursements: Reimbursement[], pending: boolean) {
        return (
          <Table striped> 
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Reason</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                {pending? null : <Table.HeaderCell>Approved</Table.HeaderCell>}
                {pending? null : <Table.HeaderCell>Manager</Table.HeaderCell>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {pending ? this.pendingTable(reimbursements) : this.resolvedTable(reimbursements)}
            </Table.Body>
          </Table>
        )
    }

}

const tables = new Tables();

export default tables;