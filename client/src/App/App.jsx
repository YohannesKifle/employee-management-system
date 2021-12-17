import React from "react";
import { Router, Route, Link } from "react-router-dom";

import { history, Role } from "@/_helpers";
import { userService } from "@/_services";
import { PrivateRoute, Navbar } from "@/_components";
import { HomePage } from "@/HomePage";
import { ListAdminsPage } from "@/AdminPages";
import { LoginPage } from "@/LoginPage";
import { ListEmployeesPage } from "@/EmployeePages";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false,
    };
  }

  componentDidMount() {
    userService.currentUser.subscribe((user) =>
      this.setState({
        currentUser: user,
        isAdmin: user && user.roles.includes(Role.Admin),
        isSuperAdmin: user && user.roles.includes(Role.SuperAdmin),
      })
    );
  }

  logout() {
    userService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <Route exact path="/" component={HomePage} />
                <PrivateRoute
                  path="/list-admins"
                  roles={[Role.Admin, Role.SuperAdmin]}
                  component={ListAdminsPage}
                />
                <PrivateRoute
                  path="/list-employees"
                  roles={[Role.Admin, Role.SuperAdmin]}
                  component={ListEmployeesPage}
                />
                <Route path="/login" component={LoginPage} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export { App };
