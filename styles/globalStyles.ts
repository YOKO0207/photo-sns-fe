import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    background: ${({ theme }: any) => theme.colors[50]};
    color: ${({ theme }: any) => theme.colors.gray["black"]};
    font-family: Inter, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
    line-height: 1.5;
    overflow-x: hidden;
  }

  html {
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: ${({ theme }: any) => theme.colors.info[500]};
  }
  .cursor-pointer {
    cursor: pointer;
  }
  input, textarea, select {
    font-family: Inter, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
    font-weight: regular;
  }

	.file-drag-and-drop {
		width: 100%;
		max-width: unset;
		min-height: 200px;
		background: white;
		padding: 20px 40px;
		border-color: ${({ theme }: any) => theme.colors.gray[300]};
		div {
			flex-direction: column;
			span {
				margin-bottom: 2px;
			}
		}
	}
`;
