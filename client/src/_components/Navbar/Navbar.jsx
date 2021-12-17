import React from "react";
import { userService } from "@/_services";
import { Role } from "@/_helpers";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
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
    const { currentUser, isAdmin, isSuperAdmin } = this.state;
    return (
      <div>
        <nav className="navbar navbar-light bg-light navbar-expand ">
          <a className="navbar-brand" href="#">
            <img
              src="src/assets/imgs/alephtav.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt=""
            />
          </a>
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            {isAdmin && (
              <Link to="/list-admins" className="nav-item nav-link">
                Admin
              </Link>
            )}
            {isAdmin && (
              <Link to="/list-employees" className="nav-item nav-link">
                Employees
              </Link>
            )}
            {currentUser && (
              <a onClick={this.logout} className="nav-item nav-link">
                Logout
              </a>
            )}
            {!currentUser && (
              <Link to="/login" className="nav-item nav-link">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    );
  }
}
