import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { styled, withTheme } from '@material-ui/core/styles';

const StyledTitle = styled(withTheme(Typography))({
  width: '100%',
  textAlign: 'center',
  padding: '20px 0',
  '& h6': {
    paddingBtoom: '80px',
  },
});

const HeaderWrapper = styled(withTheme(Box))({
  '& :nth-child(2)': {
    paddingBottom: '10px',
  },
});

const Header = () => {
  return (
    <HeaderWrapper>
      <StyledTitle variant="h4">GREAT TOKEN ICO SALE 🚀🚀🚀</StyledTitle>
      <Typography variant="subtitle1" align="center">
        Buy some GREATNESS now! 🎖
      </Typography>
      <Typography variant="subtitle1" align="center">
        Introducing "GREAT TOKEN" (GRT) Token price is 0.001 Ether. You currently have 0 GRT
      </Typography>
    </HeaderWrapper>
  );
};

export default Header;
