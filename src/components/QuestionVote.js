import { Component } from "react";
import { connect } from "react-redux";
import { handleAnswer } from "../store/actions/shared";

class QuestionVote extends Component {
  state = {
    option: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.option !== "") {
      const { dispatch, id } = this.props;

      dispatch(handleAnswer(id, this.state.option));
    }
  };

  render() {
    const { question, user, author } = this.props;

    return (
      <div className="p-4 rounded-3 shadow bg-white mt-4">
        <form onSubmit={this.handleSubmit}>
          <h3 className="text-center mb-4"> Would You Rather ? </h3>

          <div className="d-flex align-items-center mb-4">
            <img
              src={author.avatarURL}
              alt={`${author.name} avatar`}
              width="128"
              className="me-4 rounded-circle"
            />
            <div className="d-flex flex-column  w-100">
              <input
                type="radio"
                className="btn-check"
                name="option"
                value="optionOne"
                id="optionOne"
                defaultChecked={question.optionOne.votes.includes(user.id)}
                onChange={(evt) => this.setState({ option: evt.target.value })}
              />
              <label
                className="btn btn-outline-primary mb-2"
                htmlFor="optionOne"
              >
                {question.optionOne.text}
              </label>

              <input
                type="radio"
                className="btn-check"
                name="option"
                value="optionTwo"
                id="optionTwo"
                defaultChecked={question.optionTwo.votes.includes(user.id)}
                onChange={(evt) => this.setState({ option: evt.target.value })}
              />
              <label className="btn btn-outline-primary" htmlFor="optionTwo">
                {question.optionTwo.text}
              </label>
            </div>
          </div>

          <button className="btn btn-lg btn-primary w-100">Vote</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { qid }) {
  return {
    id: qid,
    question: questions[qid],
    user: users[authedUser],
    author: users[questions[qid].author],
  };
}

export default connect(mapStateToProps)(QuestionVote);
