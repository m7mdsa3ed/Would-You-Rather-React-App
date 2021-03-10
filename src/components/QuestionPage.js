import { Component } from "react";
import { connect } from "react-redux";
import QuestionResults from "./QuestionResults";
import QuestionVote from "./QuestionVote";
import NotFound from "./NotFound";

class QuestionPage extends Component {
  render() {
    const { answered, id, question } = this.props;

    if (!question) {
      return <NotFound />;
    } else if (answered) {
      return <QuestionResults qid={id} />;
    } else return <QuestionVote qid={id} />;
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { question_id } = props.match.params;

  return {
    id: question_id,
    question: questions[question_id],
    answered: users[authedUser].answers.hasOwnProperty(question_id),
  };
}

export default connect(mapStateToProps)(QuestionPage);
