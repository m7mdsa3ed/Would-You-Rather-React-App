import * as API from "../../utils/api";
import {
  addUserQuestion,
  saveUserAnswer,
  receiveUsers,
} from "../actions/users";
import {
  addQuestion,
  receiveQuestions,
  saveQuestionAnswer,
} from "../actions/questions";

export function handleInitialData() {
  return (dispatch) => {
    return API.getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return API.saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(authedUser, question.id));
    });
  };
}

export function handleAnswer(qid, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const info = {
      authedUser: authedUser,
      qid,
      answer: option,
    };

    return API.saveQuestionAnswer(info).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, option));
      dispatch(saveUserAnswer(authedUser, qid, option));
    });
  };
}
