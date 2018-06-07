import { css } from "emotion";
import colors from "../utils/colors";

export const homePage = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const headline = css`
  font-family: "Roboto Condensed";
  font-style: italic;
  align-self: flex-start;
  margin-left: calc(10% + 24px);
`;

export const rankingList = css`
  width: 80%;
  list-style-type: none;
  padding: 0;
`;
export const listRow = css`
  width: 100%;
  display: grid;
  grid-template-columns: 0.05fr 0.05fr 0.45fr 0.45fr;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgba(20, 30, 60, 0.5);
  height: 132px;
`;

export const placement = css`
  font-style: italic;
  color: ${colors.darkgray1};
  font-family: "Roboto Condensed";
  font-size: 54px;
  padding: 0px 30px;
`;

export const teamDetails = css`
  display: flex;
  flex-direction: column;
  margin-left: 36px;
  color: ${colors.darkgray1};
`;

export const teamIcon = css`
  height: 84px;
`;

export const teamName = css`
  font-size: 20px;
  letter-spacing: 3;
  margin: 6px 0px;
`;

export const teamRecord = css`
  font-size: 12px;
`;

export const lineup = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

export const playerTile = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  margin: 12px;
`;
export const playerName = css`
  font-size: 12px;
  font-weight: bold;
`;
export const playerImg = css`
  height: 78px;
`;
export const playerRole = css`
  font-size: 12px;
`;
export const playerLoc = css`
  font-size: 12px;
`;
