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

  state = {
    fields: { ...initialState, ...this.props.loan },
    errors: {
      type: null,
      issuer: null,
      rate: null,
      balance: null,
      payment: null,
    },
  };

  validateForm(afterValidation) {
    const errors = { ...this.state.errors };
    Object.keys(errors).forEach((field) => {
      if (this.state.fields[field].trim().length === 0) {
        errors[field] = 'This field is required';
      } else if (
        (field === 'balance' || field === 'rate' || field === 'payment') &&
        Number(this.state.fields[field]) < 0
      ) {
        errors[field] = 'A positive value is required';
      } else {
        errors[field] = null;
      }
    });
    this.setState({ errors }, afterValidation);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateForm(() => {
      const { errors, fields } = this.state;
      if (Object.keys(errors).every(field => errors[field] === null)) {
        this.props.saveLoan(fields);
        this.props.closeModal();
      }
    });
  }

  handleChange = (event) => {
    const fields = { ...this.state.fields };
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
  }

  render() {
    const { errors, fields } = this.state;
    return (
      <form className="loan-details-form" onSubmit={this.handleSubmit} noValidate>
        <h3 className="form-header">{this.props.title}</h3>

        <div className="row">
          <div className="column">
            <label htmlFor="loan-type">Loan Type</label>
            <select id="loan-type" name="type" value={fields.type} onChange={this.handleChange}>
              <option />
              <option>Student Loan</option>
              <option>Auto Loan</option>
              <option>Mortgage</option>
            </select>
            <p className="error">{errors.type}</p>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="issuer">Issuer</label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={fields.issuer}
              onChange={this.handleChange}
            />
            <p className="error">{errors.issuer}</p>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="balance">Balance</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={fields.balance}
              onChange={this.handleChange}
            />
            <p className="error">{errors.balance}</p>
          </div>
          <div className="column">
            <label htmlFor="rate">Interest Rate</label>
            <input
              type="number"
              id="rate"
              name="rate"
              value={fields.rate}
              onChange={this.handleChange}
            />
            <p className="error">{errors.rate}</p>
          </div>
          <div className="column">
            <label htmlFor="payment">Monthly Payment</label>
            <input
              type="number"
              id="payment"
              name="payment"
              value={fields.payment}
              onChange={this.handleChange}
            />
            <p className="error">{errors.payment}</p>
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
