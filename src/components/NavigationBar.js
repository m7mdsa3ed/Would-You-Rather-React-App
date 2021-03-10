import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { unsetAuthedUser } from "../store/actions/authedUser";

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            / Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              {this.props.user && (
                <Fragment>
                  <li className="nav-item">
                    <Link to="/add" className="nav-link">
                      New Question
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/leaderboard" className="nav-link">
                      Leaderboard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <span role="button" className="nav-link">
                      {this.props.user.name}
                    </span>
                  </li>

                  <li className="nav-item">
                    <span
                      role="button"
                      className="nav-link"
                      onClick={() => {
                        this.props.dispatch(unsetAuthedUser());
                        return <Redirect to="/" />;
                      }}
                    >
                      Logout
                    </span>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    user: users[authedUser],
  };
}
export default connect(mapStateToProps)(NavigationBar);
