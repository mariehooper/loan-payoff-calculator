import React from 'react';

export default class LoanForm extends React.Component {
  static propTypes = {
    addLoan: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
  };

  state = {
    type: '',
    issuer: '',
    rate: '',
    compound: '',
    balance: '',
    payment: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addLoan(this.state);
    this.props.closeModal();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form className="loan-details-form" onSubmit={this.handleSubmit}>
        <h3 className="form-header">Add a new loan</h3>

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
            <label htmlFor="compounding-frequency">Compounding Frequency</label>
            <select
              id="compounding-frequency"
              name="compound"
              value={this.state.compound}
              onChange={this.handleChange}
            >
              <option />
              <option>Daily</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
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
          <button className="btn btn-link" onClick={this.props.closeModal}>Cancel</button>
          <button className="btn">Save</button>
        </div>
      </form>
    );
  }
}
