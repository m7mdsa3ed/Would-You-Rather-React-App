import { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../store/actions/authedUser";

class Login extends Component {
  render() {
    return (
      <div className="p-4 mt-4 rounded-3 shadow-lg bg-white">
        <form>
          <h2 className="display-4 mb-4"> Login </h2>
          <div className="form-floating">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              defaultValue="0"
              onChange={(evt) => {
                this.props.dispatch(setAuthedUser(evt.target.value));
              }}
            >
              <option value="0">Open this select menu</option>
              {Object.keys(this.props.users).map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">Select User</label>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
