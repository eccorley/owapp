import React from "react";
import { Query } from "react-apollo";
import { TeamQuery, PlayerQuery } from "../graphql/queries";

import Layout from "../shared/Layout";
import { Container, Header, Card } from "semantic-ui-react";

class TeamPage extends React.Component {
  render() {
    console.log(this.props.match.params.teamId);
    const { teamId } = this.props.match.params;
    console.log(teamId);
    return (
      <Layout>
        <Query query={TeamQuery} variables={{ teamId }} skip={!teamId}>
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
      </Layout>
    );
  }
}

export default TeamPage;
