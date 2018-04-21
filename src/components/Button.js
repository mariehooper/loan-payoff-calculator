import styled from 'styled-components';

export const PrimaryButton = styled.button`
  border: 1px solid var(--primary-pink);
  color: var(--primary-pink);
  font-size: 0.9rem;
  background: transparent;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  &:hover {
    background: var(--primary-pink);
    color: var(--white);
  }
`;

export const LinkButton = PrimaryButton.extend`
  border: none;
  &:hover {
    background: transparent;
    color: var(--primary-pink);
  }
`;

export const SubmitButton = PrimaryButton.extend`
  float: right;
`;
