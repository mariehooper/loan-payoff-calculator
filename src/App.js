import React from 'react';
import Modal from 'react-modal';
import shortid from 'shortid';

import './App.css';
import LoanForm from './components/LoanForm';
import Totals from './components/Totals';
import LoanList from './components/LoanList';

export default class App extends React.Component {
  // getInitialState
  state = {
    loans: [],
    totals: {},
    modalIsOpen: false,
    loanToEdit: undefined,
  };

  addLoan = (loan) => {
    // make copy of existing loans
    const loans = [...this.state.loans];
    // push new loan in
    loans.push({
      id: shortid.generate(),
      ...loan,
    });
    // set state
    this.setState({ loans }, this.calculateTotals);
  }

  updateLoan = (loanToUpdate) => {
    const loanIndex = this.state.loans.findIndex(loan => loan.id === loanToUpdate.id);
    const loans = [
      ...this.state.loans.slice(0, loanIndex),
      loanToUpdate,
      ...this.state.loans.slice(loanIndex + 1),
    ];
    this.setState({ loans }, this.calculateTotals);
  }

  setLoanToEdit = (loanId) => {
    this.setState({
      loanToEdit: this.state.loans.find(loan => loan.id === loanId),
    });
  }

  calculateTotals = () => {
    // make a copy of existing totals
    const totals = { ...this.state.totals };
    // get totals for balance and payment
    const { loans } = this.state;
    totals.balance = loans.reduce((balance, loan) => balance + Number(loan.balance), 0);
    totals.payment = loans.reduce((payment, loan) => payment + Number(loan.payment), 0);

    // find highest duration of loans and total interest paid
    totals.duration = 0; // reset duraction before calc
    totals.interest = loans.reduce((interest, loan) => {
      const rate = Number((loan.rate / 100) / 12);
      const payment = Number(loan.payment);
      const balance = Number(loan.balance);

      const numerator = 1 / (1 - ((rate * balance) / payment));
      const duration = Math.log(numerator) / Math.log(1 + rate);
      totals.duration = Math.max(totals.duration || 0, duration);

      return interest + ((payment * duration) - balance);
    }, 0);
    // set state
    this.setState({ totals });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const formTitle = this.state.loanToEdit ? 'Edit existing loan' : 'Add new loan';
    const saveForm = this.state.loanToEdit ? this.updateLoan : this.addLoan;
    return (
      <div className="App">
        <div className="header-block">
          <h1>Loan Payoff Calculator</h1>
        </div>
        <div className="page-wrapper">
          <div className="col col-1">
            <h2>Loans</h2>
            <LoanList
              loans={this.state.loans}
              openModal={this.openModal}
              setLoanToEdit={this.setLoanToEdit}
            />
          </div>
          <div className="sidebar col col-2">
            <Totals {...this.state.totals} />
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel={formTitle}
        >
          <LoanForm
            title={formTitle}
            saveLoan={saveForm}
            closeModal={this.closeModal}
            loan={this.state.loanToEdit}
          />
        </Modal>
      </div>
    );
  }
}
