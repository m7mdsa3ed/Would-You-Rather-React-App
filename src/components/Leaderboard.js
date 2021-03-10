import { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {

  render() {
    const { users } = this.props;

    return (
      <div className="p-4 rounded-3 shadow-lg bg-white mt-4">
        <h2 className="display-4 mb-4"> Leaderboard </h2>
        <table className="table">
          <thead>
            <tr>
              <th> Name </th>
              <th> Question </th>
              <th> Answerd Questions </th>
              <th> Score </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(users).map(([id, user]) => (
              <tr key={id}>
                <td>{user.name}</td>
                <td>
                  {user.questions ? Object.keys(user.questions).length : 0}
                </td>
                <td>{user.answers ? Object.keys(user.answers).length : 0}</td>
                <td>{user.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ users }) {

  let usersWithScore = Object.entries(users).map(([key, value]) => {

    const { questions, answers } = value;

    let qs = questions ? Object.keys(questions).length : 0;
    let as = answers ? Object.keys(answers).length : 0;

    value.totalScore = qs + as
    return value
  }).sort((a,b) => b.totalScore - a.totalScore)

  return {
    users : usersWithScore,
  };
}

export default connect(mapStateToProps)(Leaderboard);
