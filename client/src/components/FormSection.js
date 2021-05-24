import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  padding: 30px 0;
  max-width: 700px;
  margin: 0 auto;
`;

const FormSection = ({ buyTokens, setTokensToBeBuyed, tokensToBeBuyed }) => {
  return (
    <StyledForm onSubmit={buyTokens}>
      <TextField
        fullWidth
        id="input-with-icon-textfield"
        variant="outlined"
        align="center"
        type="number"
        placeholder="number of tokens"
        onChange={e => setTokensToBeBuyed(e.target.value)}
        value={tokensToBeBuyed}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button type="submit">Buy Tokens</Button>
            </InputAdornment>
          ),
        }}
      />
    </StyledForm>
  );
};

export default FormSection;
