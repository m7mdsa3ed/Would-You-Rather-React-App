import { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./store/actions/shared";

import NavigationBar from "./components/NavigationBar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewQuestion from "./components/NewQuestion";
import QuestionPage from "./components/QuestionPage";
import Leaderboard from "./components/Leaderboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router>
        <NavigationBar />
        <div className="container">
          {(() => {
            if (isLoggedIn) {
              return (
                <Fragment>
                  <Route exact path="/" component={Dashboard}></Route>
                  <Route path="/add" component={NewQuestion}></Route>
                  <Route
                    path="/questions/:question_id"
                    component={QuestionPage}
                  ></Route>
                  <Route path="/leaderboard" component={Leaderboard}></Route>
                </Fragment>
              );
            } else {
              return <Route path="/" component={Login}></Route>;
            }
          })()}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: !!authedUser,
  };
}

export default connect(mapStateToProps)(App);
