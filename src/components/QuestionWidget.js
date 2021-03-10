import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionWidget extends Component {
  render() {
    const { question, author, authedUser, answered } = this.props;

    if (answered) {
      const { pathname } = this.props.location;

      this.props.history.push(pathname + "/results");
    }
    return (
      <div className="p-4 rounded-3 shadow bg-white mb-4">
        <h3 className="text-center mb-4">{author.name} Asks: </h3>
        <div className="d-flex align-items-center">
          <img
            src={author.avatarURL}
            alt={`${author.name} avatar`}
            width="128"
            className="me-4 rounded-circle"
          />
          <ul className="list-unstyled w-100 mb-0">
            <li
              className={
                question.optionOne.votes.includes(authedUser)
                  ? "p-2 text-center rounded mb-2 border border-primary"
                  : "p-2 text-center rounded mb-2 border"
              }
            >
              {question.optionOne.text}
            </li>
            <li
              className={
                question.optionTwo.votes.includes(authedUser)
                  ? "p-2 text-center rounded mb-2 border border-primary"
                  : "p-2 text-center rounded mb-2 border"
              }
            >
              {question.optionTwo.text}
            </li>
          </ul>
        </div>
        <Link to={`/questions/${question.id}`}>
          <button className="btn btn-lg btn-primary w-100 mt-4">Vote</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { qid, totalVotes }) {
  return {
    question: questions[qid],
    author: users[questions[qid].author],
    authedUser,
    totalVotes
  };
}
export default connect(mapStateToProps)(QuestionWidget);
