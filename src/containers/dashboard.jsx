import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import CommentsArea from "./commentsArea";
import NavBar from "../components/navbar";

class Dashboard extends Component {
  render() {
    return (
      <div>
        {/* Navbar  */}
        <NavBar />
        {/* Grid to position comment area card and easily allows for additional components  */}
        <Grid style={{ paddingLeft: "1vw", paddingRight: "2vw" }}>
          <Grid.Row colums={1} style={{ paddingRight: "2vw" }}>
            <Grid.Column>
              <CommentsArea />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
