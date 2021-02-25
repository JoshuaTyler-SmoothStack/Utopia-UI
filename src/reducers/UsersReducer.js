import constants from "../resources/constants.json"

const UsersReducer = (action) => {
  const users = constants.users;
  switch(action.type) {
    
    case users.cancel:
      return {
        deletePrompt: false,
        editPrompt: false,
      };

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
      if(action.payload) {
        return {
          error: "",
          searchResults: action.payload,
          status: "SUCCESS"
        }
      }
      return {error: "No Payload", status: "SUCCESS"}

    case users.searchError:
      return {
        searchError: action.payload,
        searchText: action.payload
      };

    case users.searchResultsPage:
      return {searchResultsPage: action.payload};

    case users.searchResultsPerPage:
      return {searchResultsPerPage: action.payload};

    case users.reset:
      return defaultUsersState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default UsersReducer;

export const defaultUsersState = {
  error: "",
  searchError: "",
  searchFilters: {
    activeCount: 0
  },
  searchResults: [],
  searchResultsPage: 1,
  searchResultsPerPage: 100,
  searchResultsTotal: 0,
  status: "INACTIVE"
};