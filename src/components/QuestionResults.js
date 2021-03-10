import { Component } from "react";
import { connect } from "react-redux";

class QuestionResults extends Component {
  render() {
    const { question, totalVotes, author } = this.props;
    return (
      <div className="p-4 rounded-3 shadow bg-white mt-4">
        <h3 className="text-center mb-4">
          {author.name} Poll Results: {"{ "}
          {totalVotes}
          {" }"}
        </h3>

        <div className="d-flex align-items-center">
          <img
            src={author.avatarURL}
            alt={`${author.name} avatar`}
            width="128"
            className="me-4 rounded-circle"
          />
          <ul className="list-unstyled w-100 mb-0">
            <li className="p-2 rounded mb-2 border">
              <p className="fw-bold mb-1"> {question.optionOne.text} </p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(
                      (question.optionOne.votes.length / totalVotes) *
                      100
                    ).toFixed(1)}%`,
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {question.optionOne.votes.length} / {totalVotes}
                </div>
              </div>
            </li>
            <li className="p-2 rounded mb-2 border">
              <p className="fw-bold mb-1"> {question.optionTwo.text} </p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(
                      (question.optionTwo.votes.length / totalVotes) *
                      100
                    ).toFixed(1)}%`,
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {question.optionTwo.votes.length} / {totalVotes}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { qid }) {
  const question = questions[qid];
  return {
    id: qid,
    question,
    user: users[authedUser],
    author: users[questions[qid].author],
    totalVotes:
      question.optionOne.votes.length + question.optionTwo.votes.length,
  };
}

export default connect(mapStateToProps)(QuestionResults);
