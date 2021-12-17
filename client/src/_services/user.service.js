import { BehaviorSubject } from "rxjs";
import config from "config";
import { authHeader, handleResponse } from "@/_helpers";
import jwt_decode from "jwt-decode";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const userService = {
  login,
  logout,
  getAll,
  getById,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.apiUrl}/api/v1/users/login`, requestOptions)
    .then(handleResponse)
    .then((res) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      var decoded = jwt_decode(res.token);
      let user = { token: res.token, roles: decoded.roles };
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    });
}

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/api/v1/users`, requestOptions).then(
    handleResponse
  );
}

function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/api/v1/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
