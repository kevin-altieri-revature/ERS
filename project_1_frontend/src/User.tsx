interface User{
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    manager: boolean;
    reimbursements?: string[];
}

export default User;