import { css } from "emotion";
export const layout = css`
  display: grid;
  grid-template-rows: 54px 1fr;
`;

export const topNav = css`
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px calc(10% + 24px);
`;

export const contentSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px;
`;
