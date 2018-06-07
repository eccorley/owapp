import React from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Image, Input } from "semantic-ui-react";
import logo from "../assets/owlogo.png";
import colors from "../utils/colors";

class Layout extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: colors.lightgray5 }}>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} header to="/">
              <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
              OWHUB
            </Menu.Item>
            <Menu.Item as={Link} name="news" to="/news" />
            <Menu.Item as="a" name="league-home" />
            <Menu.Item as="a" name="player-stats" />
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Menu.Item name="logout" />
            </Menu.Menu>
          </Container>
        </Menu>
        <Container style={{ marginTop: "4.25em", paddingTop: "1em" }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default Layout;
