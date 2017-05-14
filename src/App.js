import React from 'react';
import Modal from 'react-modal';
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
  };

  addLoan = (loan) => {
    // make copy of existing loans
    const loans = [...this.state.loans];
    // push new loan in
    loans.push(loan);
    // set state
    this.setState({ loans }, this.calculateTotals);
  }

  calculateTotals = () => {
    // make a copy of existing totals
    const totals = { ...this.state.totals };
    // get totals for balance and payment
    const { loans } = this.state;
    totals.balance = loans.reduce((balance, loan) => balance + Number(loan.balance), 0);
    totals.payment = loans.reduce((payment, loan) => payment + Number(loan.payment), 0);

    // find highest duration of loans and total interest paid
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
    return (
      <div className="App">
        <div className="header-block">
          <h1>Loan Payoff Calculator</h1>
        </div>
        <div className="page-wrapper">
          <div className="col col-1">
            <h2>Loans</h2>
            <LoanList loans={this.state.loans} openModal={this.openModal} />
          </div>
          <div className="sidebar col col-2">
            <Totals {...this.state.totals} />
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add New Loan Modal"
        >
          <LoanForm addLoan={this.addLoan} closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
}
