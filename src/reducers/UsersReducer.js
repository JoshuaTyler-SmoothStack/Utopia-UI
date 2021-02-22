import constants from "../resources/constants.json"

const UsersReducer = (action) => {
  const users = constants.users;
  switch(action.type) {
    case users.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case users.request:
      return {
        error: "",
        status: "PENDING"
      };

    case users.response:
      return {
        error: "",
        searchResults: action.payload,
        status: "REGISTERED"
      };

    case users.stop:
      return defaultUsersState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default UsersReducer;

export const defaultUsersState = {
  error: "",
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 100,
  searchResultsTotal: 0,
  status: "INACTIVE"
};