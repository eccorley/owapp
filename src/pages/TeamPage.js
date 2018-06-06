import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import "./home.scss";

const getTeams = gql`
  {
    ranks {
      team {
        icon
        name
        abbreviatedName
        homeLocation
        primaryColor
        secondaryColor
      }
      placement
      records {
        matchWin
        matchLoss
      }
    }
  }
`;

class Home extends React.Component {
  render() {
    return (
      <Query query={getTeams}>
        {({ loading, error, data }) => {
          console.log(loading, error, data);
          if (loading) return "Loading...";
          return (
            <div className="Home">
              <ul className="ranking-list">
                {data.ranks.map(
                  (
                    {
                      team,
                      placement,
                      records: {
                        0: { matchWin, matchLoss }
                      }
                    },
                    i
                  ) => (
                    <li
                      key={i}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "space-between"
                      }}
                    >
                      <span>{placement}</span>
                      <img
                        src={team.icon}
                        style={{ width: 250, height: 250 }}
                        alt={team.name}
                      />
                      <h3 style={{ marginRight: "auto" }}>{team.name}</h3>
                      <span>
                        {matchWin} - {matchLoss}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Home;
