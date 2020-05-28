import React, { Component } from "react";
import CommentForm from "../components/commentForm.jsx";
import moment from "moment";
import { url } from "../constants";
import { Card, Container, Header } from "semantic-ui-react";
import CommentList from "../components/commentList";
import Title from "../components/title";

class CommentsArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      comment: "",
      dateTime: "",
      allComments: []
    };
  }

  //Update state with any characters input into respective inputs
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async () => {
    //Add current time of comment to state and send request
    let currentTime = moment().format("Do MMMM YYYY, h:mm:ss a");
    let { state } = this;
    state.dateTime = currentTime;
    this.handleAddNewComment(state);
  };

  handleAddNewComment = async state => {
    try {
      //Post newComment to API endpoint and await response
      const res = await fetch(`${url}/newComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      });

      //Confirm message has been added succesfully
      if (res.status === 200) {
        //Parse response
        let response = await res.json();

        //Add new comment to state instance
        const { newComment } = response;
        console.log(newComment);
        const { allComments } = state;
        allComments.push(newComment);

        //Update state with newComment and reset form
        this.setState({
          allComments: state.allComments,
          name: "",
          comment: ""
        });
      } else {
        let message = await res.json();
        this.setState({ message }, () => console.log(this.state));
      }
    } catch (error) {
      console.log("There was an error sending new comment.", error);
    }
  };

  //Request all comments from DB
  getAllComments = async () => {
    try {
      //fetch all comments from API
      const res = await fetch(`${url}/allComments`);

      //Confirm that there are comments prestored
      if (res.status === 200) {
        let response = await res.json();
        let allComments = response.comments;
        this.setState({ allComments });
      } else {
        let message = await res.json();
        this.setState({ message }, () => console.log(this.state));
      }
    } catch (error) {
      console.log("There was an error sending getting all comments.", error);
    }
  };

  //Fetch comments component mounts
  componentDidMount() {
    this.getAllComments();
  }

  render() {
    const { name, comment, allComments } = this.state;
    return (
      //Card to provide background for area
      <Card
        fluid
        style={{ width: "25vw", padding: "0.3cm", backgroundColor: "#ffd9aa" }}
      >
        {/* Heading component*/}
        <Title title={"Comments"} iconName="comments " />

        {/* Allows comment list to be scrollable */}
        <Container
          style={{
            height: "27vh",
            overflow: "auto"
          }}
        >
          <CommentList comments={allComments} />
        </Container>

        <Header as="h4">Add new comment</Header>

        {/* Form to submit new comments  */}
        <CommentForm
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          name={name}
          comment={comment}
        />
      </Card>
    );
  }
}

export default CommentsArea;
