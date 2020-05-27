import React, { Component } from "react";

class Clock extends Component {
  state = {
    time: new Date()
  };

  //Update clock every second
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    const { time } = this.state;
    return <h2>{time.toLocaleTimeString()}</h2>;
  }
}
export default Clock;
