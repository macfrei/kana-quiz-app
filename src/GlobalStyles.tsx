import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-size: 1rem;
    font-family: sans-serif;
    line-height: 1.4;
}

button, input {
    font-size: inherit;
}
`;
