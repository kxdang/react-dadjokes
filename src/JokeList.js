import React, { Component } from "react";
import axios from "axios";
import "./JokeList.css";
import uuid from "uuid/v4";
import Joke from "./Joke";

export default class JokeList extends Component {
  static defaultProps = {
    numOfJokes: 10
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  async componentDidMount() {
    let jokes = [];

    while (jokes.length < this.props.numOfJokes) {
      //Loads joke API
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });

      jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
    }
    this.setState({ jokes: jokes });

    console.log(jokes);
  }

  handleVote(id, delta) {
    console.log("hello");
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="JokeList-btn">New Jokes</button>
        </div>

        <div className="JokeList-jokes">
          {this.state.jokes.map(joke => (
            <div>
              <Joke
                key={joke.id}
                id={joke.id}
                text={joke.text}
                votes={joke.votes}
                upvote={() => this.handleVote(joke.id, 1)}
                downvote={() => this.handleVote(joke.id, -1)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
