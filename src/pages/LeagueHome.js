import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Layout from "../components/Layout";
import { Container, Card, Header, List, Image, Grid } from "semantic-ui-react";
import colors from "../utils/colors";
import * as styles from "./leagueHome.styles";

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
        players(first: 10) {
          edges {
            node {
              headshot
              name
              homeLocation
              nationality
              role
              heroes
            }
          }
        }
      }
      placement
      records {
        matchWin
        matchLoss
      }
    }
  }
`;

class LeagueHome extends React.Component {
  render() {
    return (
      <Layout>
        <Query query={getTeams}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            return (
              <Container>
                <Header as="h1" style={{ marginLeft: "1em" }}>
                  League Standings
                </Header>
                <Card fluid raised>
                  <Card.Content>
                    <Grid divided="vertically" relaxed>
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
                          <Grid.Row key={i} centered verticalAlign="middle">
                            <Grid.Column
                              className={`placement ${styles.placement}`}
                              width={1}
                            >
                              {placement}
                            </Grid.Column>
                            <Grid.Column width={2}>
                              <Image
                                size="small"
                                src={team.icon}
                                alt={team.name}
                              />
                            </Grid.Column>
                            <Grid.Column width={3}>
                              <List>
                                <List.Header as="h3">{team.name}</List.Header>
                                <List.Content
                                  style={{
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                    color: colors.gray2
                                  }}
                                >
                                  {matchWin} - {matchLoss}
                                </List.Content>
                              </List>
                            </Grid.Column>
                            <Grid.Column width={9}>
                              <List horizontal>
                                {team.players.edges.map(
                                  ({
                                    node: {
                                      headshot,
                                      name,
                                      homeLocation,
                                      nationality,
                                      role,
                                      heroes
                                    }
                                  }) => (
                                    <List.Item>
                                      <Image
                                        src={headshot}
                                        alt={name}
                                        size="tiny"
                                      />
                                      <List.List>
                                        <List.Header>{name}</List.Header>
                                        <List.Content
                                          style={{
                                            textTransform: "uppercase",
                                            fontSize: 12,
                                            fontWeight: "bold",
                                            color: colors.gray2
                                          }}
                                        >
                                          {homeLocation}, {nationality}
                                        </List.Content>
                                      </List.List>
                                    </List.Item>
                                  )
                                )}
                              </List>
                            </Grid.Column>
                          </Grid.Row>
                        )
                      )}
                    </Grid>
                  </Card.Content>
                </Card>
              </Container>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default LeagueHome;
