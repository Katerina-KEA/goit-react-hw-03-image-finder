import React from 'react';

import PropTypes from 'prop-types';

import { ButtonStyled} from './Button.styled';

const Button = ({ onClick, children }) => {
  return (
    <>
      <Button type="button" className="Button" onClick={onClick}>
        Load more
        {children}
      </Button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
