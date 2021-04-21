import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 20px 40px;
	    
        font-family: 'Open Sans Condensed';
	    
        -moz-osx-font-smoothing: grayscale;
	    -webkit-font-smoothing: antialiased;
    }

    a {
        text-decoration: none;
        color: black;
    }

    code {
	    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`;

export default GlobalStyle;
