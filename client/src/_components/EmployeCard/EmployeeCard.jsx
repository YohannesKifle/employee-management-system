import React from "react";
import { userService } from "@/_services";
import { Role } from "@/_helpers";

export class EmployeeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: this.props.employee,
    };
  }
  render() {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {this.state.employee.firstName +
              " " +
              this.state.employee.grandFatherName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {this.state.employee.position}
          </h6>
          <p className="card-text">
            <strong>Email</strong> {this.state.employee.email}
            <br />
            <strong>Phone number</strong> {this.state.employee.phoneNumber}
            <br />
            <strong>Department</strong> {this.state.employee.department}
            <br />
            <strong>Country</strong> {this.state.employee.country}
            <br />
            <strong>Home address</strong> {this.state.employee.homeAddress}
            <br />
            <strong>Hired on</strong> {this.state.employee.hiredOn}
            <br />
          </p>
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
