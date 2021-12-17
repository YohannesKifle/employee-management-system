import handleResponse from "./handle-response";
import { jwtInterceptor } from "./jwt-interceptor";

//  Wrapper function that wraps HTTP GET method
export async function getAsync(url) {
  let requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  requestOptions = await jwtInterceptor(url, requestOptions);

  // try catch block to catch network error
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, async () => { 
      return fetch(url, await jwtInterceptor(url, requestOptions))
    });
  } catch (e) {
    return Promise.reject("Network Error");
  }
}

//  Wrapper function that wraps HTTP POST method
export async function postAsync(url, body) {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  requestOptions = await jwtInterceptor(url, requestOptions);

  // try catch block to catch network error
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, async () => { 
      return fetch(url, await jwtInterceptor(url, requestOptions))
    });
  } catch (e) {
    return Promise.reject("Network Error");
  }
}

//  Wrapper function that wraps HTTP PUT method
export async function putAsync(url, body) {
  let requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  requestOptions = await jwtInterceptor(url, requestOptions);

  // try catch block to catch network error
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, async () => { 
      return fetch(url, await jwtInterceptor(url, requestOptions))
    });
  } catch (e) {
    return Promise.reject("Network Error");
  }
}

//  Wrapper function that wraps HTTP DELETE method
export async function deleteAsync(url) {
  let requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  requestOptions = await jwtInterceptor(url, requestOptions);

  // try catch block to catch network error
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, async () => { 
      return fetch(url, await jwtInterceptor(url, requestOptions))
    });
  } catch (e) {
    return Promise.reject("Network Error");
  }
}
