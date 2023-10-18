import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    background: ${({ theme }: any) => theme.colors.gray.white};
    color: ${({ theme }: any) => theme.colors.gray["black"]};
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, "ＭＳ Ｐゴシック", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
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
		padding-bottom: 85% !important;
		min-width: unset !important;
		background: white !important;
		position: relative !important;
		border-color: ${({ theme }: any) => theme.colors.gray[200]} !important;
		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			path {
				fill: ${({ theme }: any) => theme.colors.gray[200]};
			}
		}
		div {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			span {
				margin-bottom: 2px;
			}
		}
	}
`;
