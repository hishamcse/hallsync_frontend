import * as React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    margin: auto;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    resize: none;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: black;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const MUIStyledTextarea = (props: {
  rows: number, placeHolder: string,
    disabled?: boolean, handleInput?: (str: string) => void,
    val? : string, width? : number
  }) => {

    const [value, setValue] = React.useState(props.val ?? '');

    const handleBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(props.handleInput) props.handleInput(event.target.value);
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    return (
        <StyledTextarea
          style={{
            width : props.width ?? 470
          }}
            aria-label="minimum height"
            minRows={props.rows}
            placeholder={props.placeHolder}
            disabled={props.disabled}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
        />
    );
}

export default MUIStyledTextarea;