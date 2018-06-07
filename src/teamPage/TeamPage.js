import React from "react";
import { Query } from "react-apollo";
import { TeamQuery, PlayerQuery } from "../graphql/queries";

import { Container, Header, Card } from "semantic-ui-react";

class TeamPage extends React.Component {
  render() {
    return (
      <Query query={TeamQuery}>
        {({ loading, error, data }) => {
          console.log(loading, error, data);
          if (loading) return "Loading...";
          return (
            <Container>
              <Header>Team Page</Header>
              <Card>Stuff</Card>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default TeamPage;
