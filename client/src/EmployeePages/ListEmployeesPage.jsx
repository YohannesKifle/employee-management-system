import React from "react";

import { employeeService } from "@/_services";
import { EmployeeCard } from "@/_components";

class ListEmployeesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    employeeService.getAll().then((employees) => {
      this.setState({
        employees: employees,
      });
    });
  }

  render() {
    let employees = this.state.employees.map(function (employee) {
      return (
        <div
          className="col"
          key={employee._id}
          sm="4"
          style={{ marginBottom: "2%" }}
        >
          <EmployeeCard employee={employee}></EmployeeCard>
        </div>
      );
    });

    return (
      <div>
        <div className="col">
          <div className="row">{employees}</div>
        </div>
      </div>
    );
  }
}

export { ListEmployeesPage };
