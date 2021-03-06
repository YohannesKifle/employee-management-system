import { userService } from "@/_services";

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = userService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}
