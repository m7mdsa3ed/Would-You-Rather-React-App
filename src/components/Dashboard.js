import { Component, Fragment } from "react";
import { connect } from "react-redux";
import QuestionWidget from "./QuestionWidget";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <ul
          className="nav nav-pills justify-content-center mb-3 mt-4"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-unanswered-questions-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-unanswered-questions"
              type="button"
              role="tab"
              aria-controls="pills-unanswered-questions"
              aria-selected="true"
            >
              Unanswered Questions
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-answered-questions-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-answered-questions"
              type="button"
              role="tab"
              aria-controls="pills-answered-questions"
              aria-selected="false"
            >
              Answered Questions
            </button>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-unanswered-questions"
            role="tabpanel"
            aria-labelledby="pills-unanswered-questions-tab"
          >
            <ul className="list-unstyled">
              {this.props.unansweredQuestions.map((q) => (
                <li key={q}>
                  <QuestionWidget qid={q} />
                </li>
              ))}
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="pills-answered-questions"
            role="tabpanel"
            aria-labelledby="pills-answered-questions-tab"
          >
            <ul className="list-unstyled">
              {this.props.answeredQuestions.map((q) => (
                <li key={q}>
                  <QuestionWidget qid={q} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];

  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  return {
    unansweredQuestions: Object.keys(questions)
      .filter((qid) => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions,
  };
}
export default connect(mapStateToProps)(Dashboard);
