import React from 'react';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import styled, { css } from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  padding: 30px 0;
  max-width: 700px;
  margin: 0 auto;
`;

const FormSection = () => {
  return (
    <StyledForm>
      <TextField
        // className={classes.search}
        fullWidth
        id="input-with-icon-textfield"
        variant="outlined"
        align="center"
        placeholder=""
        // onChange={(event) => setQueryText(event.target.value)}
        // value={queryText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
              //   className={classes.searchBtn} onClick={onSearch}
              >
                Buy Tokens
              </Button>
            </InputAdornment>
          ),
          //   className: classes.input,
        }}
      />
    </StyledForm>
  );
};

export default FormSection;
