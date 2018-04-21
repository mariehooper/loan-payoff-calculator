import React from 'react';
import PropTypes from 'prop-types';
import { LinkButton } from './Button';
import icons from '../media/icons.svg';
import convertToCurrency from '../utils/convertToCurrency.js';
import styled from 'styled-components';

export default class LoanRow extends React.Component {
  handleEdit = () => {
    this.props.openModal(this.props.loan.id);
  };

  handleDelete = () => {
    this.props.removeLoan(this.props.loan.id);
  };

  handleRangeChange = (event, loan) => {
    const loanCopy = { ...loan };
    loanCopy.additional = event.target.value;
    this.props.updateLoan(loanCopy);
  };

  render() {
    const {
      type,
      issuer,
      rate,
      balance,
      payment,
      additional,
    } = this.props.loan;
    return (
      <tr>
        <td>{type}</td>
        <td>{issuer}</td>
        <td>{rate}%</td>
        <td>{convertToCurrency(balance)}</td>
        <td>{convertToCurrency(payment)}</td>
        <RangeSliderWrapper>
          <RangeSlider
            type="range"
            name="additional"
            min="0"
            max="2000"
            step="5"
            onChange={event => {
              this.handleRangeChange(event, this.props.loan);
            }}
            value={additional}
          />
          <RangeSliderValue>${additional}</RangeSliderValue>
        </RangeSliderWrapper>
        <td>
          <LinkButton onClick={this.handleEdit} className="btn-link">
            <svg className="btn-icon">
              <use xlinkHref={`${icons}#pencil`} />
            </svg>
          </LinkButton>
          <LinkButton onClick={this.handleDelete} className="btn-link">
            <svg className="btn-icon">
              <use xlinkHref={`${icons}#trash`} />
            </svg>
          </LinkButton>
        </td>
      </tr>
    );
  }
}

LoanRow.propTypes = {
  loan: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    issuer: PropTypes.string,
    rate: PropTypes.string,
    balance: PropTypes.string,
    payment: PropTypes.string,
    additional: PropTypes.string,
  }).isRequired,
  updateLoan: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  removeLoan: PropTypes.func.isRequired,
};

const RangeSliderWrapper = styled.td`
  width: var(--range-width);
`;
const RangeSlider = styled.input`
  -webkit-appearance: none;
  width: calc(100% - var(--range-label-width));
  height: var(--range-track-height);
  border-radius: 5px;
  background: var(--range-track-color);
  outline: none;
  padding: 0;
  margin: 0;

  /* Range Handle */
  &::-webkit-slider-thumb {
    appearance: none;
    width: var(--range-handle-size);
    height: var(--range-handle-size);
    border-radius: 50%;
    background: var(--range-handle-color);
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: var(--range-handle-color-hover);
    }
  }

  &:active::-webkit-slider-thumb {
    background: var(--range-handle-color-hover);
  }

  &::-moz-range-thumb {
    width: var(--range-handle-size);
    height: var(--range-handle-size);
    border: 0;
    border-radius: 50%;
    background: var(--range-handle-color);
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: var(--range-handle-color-hover);
    }
  }

  &:active::-moz-range-thumb {
    background: var(--range-handle-color-hover);
  }
`;

const RangeSliderValue = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
`;
