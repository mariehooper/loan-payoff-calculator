import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './LoanForm.css';

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

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.saveLoan(this.state);
    this.props.closeModal();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form className="loan-details-form" onSubmit={this.handleSubmit} noValidate>
        <h3 className="form-header">{this.props.title}</h3>

        <div className="row">
          <div className="column">
            <label htmlFor="loan-type">Loan Type</label>
            <select id="loan-type" name="type" value={this.state.type} onChange={this.handleChange}>
              <option />
              <option>Student Loan</option>
              <option>Auto Loan</option>
              <option>Mortgage</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="issuer">Issuer</label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={this.state.issuer}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="balance">Balance</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={this.state.balance}
              onChange={this.handleChange}
            />
          </div>
          <div className="column">
            <label htmlFor="rate">Interest Rate</label>
            <input
              type="number"
              id="rate"
              name="rate"
              value={this.state.rate}
              onChange={this.handleChange}
            />
          </div>
          <div className="column">
            <label htmlFor="payment">Monthly Payment</label>
            <input
              type="number"
              id="payment"
              name="payment"
              value={this.state.payment}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="button-row">
          <Button theme="submit" type="submit">Save</Button>
          <Button theme="link" onClick={this.props.closeModal}>Cancel</Button>
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
