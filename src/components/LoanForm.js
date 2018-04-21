import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { SubmitButton, LinkButton } from './Button';

const initialState = {
  type: '',
  issuer: '',
  rate: '',
  balance: '',
  payment: '',
  additional: '0',
};

export default class LoanForm extends React.Component {
  state = { ...initialState, ...this.props.loan };

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveLoan(this.state);
    this.props.closeModal();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <form className="loan-details-form" onSubmit={this.handleSubmit}>
        <FormHeader>{this.props.title}</FormHeader>

        <FormRow>
          <FormColumn>
            <label htmlFor="loan-type">Loan Type</label>
            <select
              id="loan-type"
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
              required
            >
              <option />
              <option>Student Loan</option>
              <option>Auto Loan</option>
              <option>Mortgage</option>
            </select>
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <label htmlFor="issuer">Issuer</label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={this.state.issuer}
              onChange={this.handleChange}
              required
            />
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <label htmlFor="balance">Balance</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={this.state.balance}
              onChange={this.handleChange}
              required
              min="0"
            />
          </FormColumn>
          <FormColumn>
            <label htmlFor="rate">Interest Rate</label>
            <input
              type="number"
              id="rate"
              name="rate"
              value={this.state.rate}
              onChange={this.handleChange}
              required
              min="0"
              max="100"
            />
          </FormColumn>
          <FormColumn>
            <label htmlFor="payment">Monthly Payment</label>
            <input
              type="number"
              id="payment"
              name="payment"
              value={this.state.payment}
              onChange={this.handleChange}
              required
              min="0"
            />
          </FormColumn>
        </FormRow>

        <div className="button-row">
          <SubmitButton type="submit">Save</SubmitButton>
          <LinkButton onClick={this.props.closeModal}>Cancel</LinkButton>
        </div>
      </form>
    );
  }
}

LoanForm.propTypes = {
  saveLoan: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  loan: PropTypes.shape({
    type: PropTypes.string,
    issuer: PropTypes.string,
    rate: PropTypes.string,
    balance: PropTypes.string,
    payment: PropTypes.string,
  }),
};

LoanForm.defaultProps = {
  loan: undefined,
};

const FormHeader = styled.h3`
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 0;
  background: var(--primary-pink);
  padding: 1.5rem 1rem;
  margin: -20px -20px 20px -20px;
`;

const FormColumn = styled.div`
  flex: 1;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const FormRow = styled.div`
  display: flex;
`;
