import { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../store/actions/shared";
class NewQuestion extends Component {
  state = {
    optionOne: null,
    optionTwo: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.dispatch(handleAddQuestion(optionOne, optionTwo)).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <form
        className="mt-4 p-4 bg-white rounded-3 shadow-lg"
        onSubmit={this.handleSubmit}
      >
        <h2 className="display-4 mb-4"> Would Your Rather ? </h2>

        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="floatingOptionOne"
            placeholder="OptionOne"
            onChange={(evt) => this.setState({ optionOne: evt.target.value })}
          />
          <label htmlFor="floatingOptionOne">OptionOne</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingOptionTwo"
            placeholder="OptionTwo"
            onChange={(evt) => this.setState({ optionTwo: evt.target.value })}
          />
          <label htmlFor="floatingOptionTwo">OptionTwo</label>
        </div>

        <button className="btn btn-lg btn-primary w-100 mt-4">
          Add Question
        </button>
      </form>
    );
  }
}

export default connect()(NewQuestion);
