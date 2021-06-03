interface Reimbursement{
    _id?: string;
    employee: string;
    money: string;
    message: string;
    date: string;
    pending: boolean;
    approved: boolean;
    manager: string;
}
export default Reimbursement;