import { BehaviorSubject } from "rxjs";
import config from "config";
import { authHeader, handleResponse } from "@/_helpers";
import jwt_decode from "jwt-decode";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const employeeService = {
  getAll,
  getById,
};

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/api/v1/employees`, requestOptions).then(
    handleResponse
  );
}

function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}
