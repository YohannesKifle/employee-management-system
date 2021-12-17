import React from "react";

import { userService } from "@/_services";
import { UserCard } from "@/_components";

class ListAdminsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    userService.getAll().then((users) => this.setState({ users }));
  }

  render() {
    let admins = this.state.users.map(function (user) {
      return (
        <div
          className="col"
          key={user._id}
          sm="4"
          style={{ marginBottom: "2%" }}
        >
          <UserCard user={user}></UserCard>
        </div>
      );
    });

    return (
      <div>
        <div className="col">
          <div className="row">{admins}</div>
        </div>
      </div>
    );
  }
}

export { ListAdminsPage };
