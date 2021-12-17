import React from "react";
import { userService } from "@/_services";
import { Role } from "@/_helpers";

export class UserCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }
  render() {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {this.state.user.firstName + " " + this.state.user.grandFatherName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {this.state.user.email}
          </h6>
          <p className="card-text">
            <strong>Phone number</strong> +{this.state.user.phoneNumber}
            <br />
          </p>

          {this.state.user.roles.length != 0 ? (
            <span>
              <strong>Roles </strong>
            </span>
          ) : (
            <span></span>
          )}

          {this.state.user.roles.map((role, index) => {
            return (
              <span>
                {role}
                {index != this.state.user.roles.length - 1 ? (
                  <span>, </span>
                ) : (
                  <span></span>
                )}
              </span>
            );
          })}
          <br />
          <button href="#" className="btn btn-primary">
            Edit
          </button>
          <a href="#" className="btn btn-danger float-right">
            Delete
          </a>
        </div>
      </div>
    );
  }
}
