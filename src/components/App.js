import React from 'react';
import Modal from 'react-modal';
import shortid from 'shortid';

import styled from 'styled-components';
import EmptyState from './EmptyState';
import LoanForm from './LoanForm';
import Totals from './Totals';
import LoanList from './LoanList';

function calculateSidebarTotals(loans, withAdditional = false) {
  return loans.reduce(
    (sidebarTotals, loan) => {
      const balance = Number(loan.balance);
      const rate = Number(loan.rate / 100 / 12);

      let payment = Number(loan.payment);
      if (withAdditional) {
        payment += Number(loan.additional);
      }

      const numerator = 1 / (1 - rate * balance / payment);
      const duration = Math.log(numerator) / Math.log(1 + rate);

      return {
        ...sidebarTotals,
        interest: sidebarTotals.interest + (payment * duration - balance),
        duration: Math.max(sidebarTotals.duration, duration),
      };
    },
    {
      interest: 0,
      duration: 0,
    },
  );
}

export default class App extends React.Component {
  // getInitialState
  state = {
    loans: [],
    totals: {},
    modalIsOpen: false,
    loanToEdit: undefined,
  };

  componentWillMount() {
    // check if there are loans in localStorage
    const loans = localStorage.getItem('loans');

    if (loans) {
      // update our App component's state
      this.setState(
        {
          loans: JSON.parse(loans),
        },
        this.calculateTotals,
      );
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('loans', JSON.stringify(nextState.loans));
  }

  addLoan = loan => {
    // make copy of existing loans
    const loans = [...this.state.loans];
    // push new loan in
    loans.push({
      id: shortid.generate(),
      ...loan,
    });
    // set state
    this.setState({ loans }, this.calculateTotals);
  };

  updateLoan = loanToUpdate => {
    const loanIndex = this.state.loans.findIndex(
      loan => loan.id === loanToUpdate.id,
    );
    const loans = [
      ...this.state.loans.slice(0, loanIndex),
      loanToUpdate,
      ...this.state.loans.slice(loanIndex + 1),
    ];
    this.setState({ loans }, this.calculateTotals);
  };

  removeLoan = loanId => {
    const loanIndex = this.state.loans.findIndex(loan => loan.id === loanId);
    const loans = [
      ...this.state.loans.slice(0, loanIndex),
      ...this.state.loans.slice(loanIndex + 1),
    ];
    this.setState({ loans }, this.calculateTotals);
  };

  calculateTotals = () => {
    // make a copy of existing totals
    const totals = { ...this.state.totals };
    // get totals for balance and payment
    const { loans } = this.state;
    totals.balance = loans.reduce(
      (balance, loan) => balance + Number(loan.balance),
      0,
    );
    totals.payment = loans.reduce(
      (payment, loan) => payment + Number(loan.payment),
      0,
    );

    // find highest duration of loans and total interest paid
    const { interest, duration } = calculateSidebarTotals(loans);
    totals.interest = interest;
    totals.duration = duration;

    const {
      interest: interestSavings,
      duration: durationSavings,
    } = calculateSidebarTotals(loans, true);
    totals.interestSavings = interest - interestSavings;
    totals.durationSavings = duration - durationSavings;

    // set state
    this.setState({ totals });
  };

  openModal = loanId => {
    this.setState({
      modalIsOpen: true,
      loanToEdit: this.state.loans.find(loan => loan.id === loanId),
    });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  renderLoans() {
    const loansExist = this.state.loans.length > 0;

    if (loansExist) {
      return (
        <PageWrapper>
          <div className="col col-1">
            <h2>Loans</h2>
            <LoanList
              loans={this.state.loans}
              totals={this.state.totals}
              openModal={this.openModal}
              updateLoan={this.updateLoan}
              removeLoan={this.removeLoan}
            />
          </div>
          <SideBar className="sidebar col col-2">
            <Totals {...this.state.totals} />
          </SideBar>
        </PageWrapper>
      );
    }

    return <EmptyState openModal={this.openModal} />;
  }

  render() {
    const formTitle = this.state.loanToEdit
      ? 'Edit existing loan'
      : 'Add new loan';
    const saveLoan = this.state.loanToEdit ? this.updateLoan : this.addLoan;
    return (
      <React.Fragment>
        <HeaderBlock>
          <h1>Loan Payoff Calculator</h1>
        </HeaderBlock>

        {this.renderLoans()}

        {this.state.modalIsOpen && (
          <Modal
            isOpen
            onRequestClose={this.closeModal}
            contentLabel={formTitle}
          >
            <LoanForm
              title={formTitle}
              saveLoan={saveLoan}
              closeModal={this.closeModal}
              loan={this.state.loanToEdit}
            />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
const PageWrapper = styled.div`
  max-width: 1000px;
  min-height: 500px;
  margin: -80px auto 2rem auto;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  display: flex;
  background: var(--white);
`;

const HeaderBlock = styled.div`
  background: var(--header-color);
  color: var(--white);
  width: 100%;
  text-align: center;
  z-index: -1;
  padding: 1rem 0 6rem 0;
  h1 {
    font-weight: 300;
  }
`;

const SideBar = styled.div`
  background-image: linear-gradient(
    var(--primary-pink) 0%,
    var(--secondary-orange) 100%
  );
  width: 250px;
`;
