import { FormControl } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormSectionStyles = styled.div`
  padding: 2rem 0;
  height: auto;
  max-width: 100%;
  min-width: 100%;

  h1 {
    /* margin: 0 auto; */
    font-family: 'Nunito';
  }
  .formControl {
    box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: grid;
    padding: 2rem;
    grid-template-columns: 1fr 1fr;
    /* grid-auto-flow: row; */
    grid-column-gap: 2rem;
    align-items: center;
    grid-template-rows: auto;
    grid-row-gap: 2rem;
    border-radius: 2rem;
    /* background-color: #78c9f8; */
    padding: 5rem 3rem;

    .formControl * {
      background-color: white;
    }

    .fullWidth {
      grid-column: 1/3;
    }

    /* label {
      font-size: 12px;
    } */
    /* input {
      font-size: 20px;
    } */

    /* .MuiInput-formControl {
      background-color: transparent;
    } */
  }

  @media only screen and (max-width: 660px) {
    padding: 2rem 0.5rem;
    .formControl {
      padding: 5rem 2rem;
    }
    .formControl * {
      grid-column: 1/3;
    }

    /* .checkOutEl {
      grid-template-columns: 1fr;
    } */

    .fullWidth {
      grid-column: 1/3 !important;
    }
  }

  .textField {
    background-color: white;
    border-radius: 4px;
  }
`;

function FormSection({ children }) {
  return (
    <FormSectionStyles>
      <FormControl className="formControl" /* noValidate autoComplete="off" */>
        {children}
      </FormControl>
    </FormSectionStyles>
  );
}

FormSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FormSection;