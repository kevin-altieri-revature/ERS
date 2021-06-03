import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './App.css';
import {
    Table,
    Checkbox,
    Button,
    Icon,
    Grid,
    Header,
    Modal,
    Form,
    Segment,
  } from 'semantic-ui-react'
import './Login';
import User from './User';
import Reimbursement from './Reimbursement';
import axios, {AxiosResponse} from 'axios';

class Service {

    checkUser(user: User): boolean {
        this.checkEmail(user.email);
        return false;
    }

    checkEmail(email: String): boolean {
        return false;
    }

    checkPassword(password: String): boolean {
        return false;
    }

    checkReimbursement(reimbursement: Reimbursement): boolean {
        return false;
    }
}

const service = new Service()

export default service;