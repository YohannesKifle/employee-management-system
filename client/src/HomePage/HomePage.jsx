import React from "react";

import { userService } from "@/_services";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: userService.currentUserValue,
      userFromApi: null,
    };
  }

  componentDidMount() {
    const { currentUser } = this.state;
  }

  render() {
    const { currentUser, userFromApi } = this.state;
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export { HomePage };
