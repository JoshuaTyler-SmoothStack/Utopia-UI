import constants from "../resources/constants.json"
import Store from "./Store";

const UsersReducer = (action) => {
  const usersConst = constants.users;
  const { users } = Store.getState();

  switch(action.type) {
    
    case usersConst.cancel:
      return {
        create: defaultUsersState.create,
        delete: defaultUsersState.delete,
        edit: defaultUsersState.edit,
        error: "",
        search: {
          ...users.search,
          resultsPage: 1
        },
        status: "SUCCESS"
      };

    case usersConst.createPrompt:
      return {
        create: {
          ...defaultUsersState.create,
          isActive: true
        },
        delete: defaultUsersState.delete,
        edit: defaultUsersState.edit
      };

    case usersConst.createRequest:
      return {
        create: {
          ...users.create,
          resultsStatus: "PENDING",
          status: "PENDING"
        },
      };

    case usersConst.createResponse:
      return {
        create: {
          ...users.create,
          results: action.payload,
          resultsStatus: "SUCCESS",
          status: "PENDING"
        },
      };

    case usersConst.deletePrompt:
      return {
        create: defaultUsersState.create,
        delete: {
          ...defaultUsersState.delete,
          isActive: true
        },
        edit: defaultUsersState.edit,
        selected: action.payload
      };

      case usersConst.deleteRequest:
        return {
          delete: {
            ...users.delete,
            resultsStatus: "PENDING",
            status: "PENDING"
          },
        };
  
      case usersConst.deleteResponse:
        return {
          delete: {
            ...users.delete,
            results: action.payload,
            resultsStatus: "SUCCESS",
            status: "PENDING"
          },
        };

    case usersConst.error:
      return {
        error: action.payload || "[ERROR]: 404 - Not Found!",
        status: "ERROR"
      };

    case usersConst.request:
      return {
        error: "",
        status: "PENDING"
      };

    case usersConst.response:
      return {
        error: "",
        search: {
          ...users.search,
          error: "",
          results: action.payload
        },
        status: "SUCCESS"
      }

    case usersConst.searchError:
      return {
        search: {
          ...users.search,
          error: action.payload
        }
      };

    case usersConst.searchResultsPage:
      return {
        search:{
          ...users.search,
          resultsPage: action.payload
        }
      };

    case usersConst.searchResultsPerPage:
      return {
        search:{
          ...users.search,
          resultsPerPage: action.payload
        }
      };

    case usersConst.reset:
      return defaultUsersState;

    default:
      console.error("Invalid action.type!", action);
  }
};
export default UsersReducer;

export const defaultUsersState = {
  create: {
    error: "",
    isActive: false,
    results: "",
    resultsStatus: "INACTIVE",
    status: "INACTIVE"
  },
  delete: {
    error: "",
    isActive: false,
    results: "",
    resultsStatus: "INACTIVE",
    status: "INACTIVE"
  },
  edit: {
    error: "",
    isActive: false,
    results: "",
    resultsStatus: "INACTIVE",
    status: "INACTIVE"
  },
  error: "",
  search: {
    error: "",
    filters: {
      activeCount: 0
    },
    results: [],
    resultsPage: 1,
    resultsPerPage: 100,
    resultsTotal: 0,
    status: "INACTIVE"
  },
  selected: null,
  status: "INACTIVE"
};