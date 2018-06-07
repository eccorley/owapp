import React from "react";

import Layout from "../shared/Layout";
import { Container, Card, Header } from "semantic-ui-react";
import NewsFeed from "../shared/NewsFeed";

class NewsPage extends React.Component {
  render() {
    return (
      <Layout>
        <Container>
          <Header as="h1" style={{ marginLeft: "1em" }}>
            Overwatch News
          </Header>
          <Card fluid raised>
            <Card.Content>
              <NewsFeed />
            </Card.Content>
          </Card>
        </Container>
      </Layout>
    );
  }
}

export default NewsPage;
