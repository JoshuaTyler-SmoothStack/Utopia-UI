import constants from "../resources/constants.json";
import RootReducer from "../reducers/RootReducer";

class BookingsDebugDispatcher {

  static onDeleteFake() {
    RootReducer.reduce({ type: constants.bookings.deleteRequest });
    
    // Booking Delete
    setTimeout(() => {
      const { bookings } = RootReducer.getState();
      const { deleteResults, deleteResultsStatus } = bookings;
      RootReducer.reduce({ 
        type: constants.bookings.deleteResponse,
        payload: {
          deleteResults: {
            ...deleteResults,
            booking: "SUCCESS"
          },
          deleteResultsStatus: {
            ...deleteResultsStatus,
            booking: "SUCCESS"
          }
        }
      });
    }, 1000);

    // Flights Delete
    setTimeout(() => {
      const { bookings } = RootReducer.getState();
      const { deleteResults, deleteResultsStatus } = bookings;
      RootReducer.reduce({ 
        type: constants.bookings.deleteResponse,
        payload: {
          deleteResults: {
            ...deleteResults,
            flights: "Removed 3 flights reservations."
          },
          deleteResultsStatus: {
            ...deleteResultsStatus,
            flights: "SUCCESS"
          }
        }
      });
    }, 2000);

    // Guests Delete
    setTimeout(() => {
      const { bookings } = RootReducer.getState();
      const { deleteResults, deleteResultsStatus } = bookings;
      RootReducer.reduce({ 
        type: constants.bookings.deleteResponse,
        payload: {
          deleteResults: {
            ...deleteResults,
            guests: "No associated guests with booking."
          },
          deleteResultsStatus: {
            ...deleteResultsStatus,
            guests: "ERROR"
          }
        }
      });
    }, 500);

    // Passengers Delete
    setTimeout(() => {
      const { bookings } = RootReducer.getState();
      const { deleteResults, deleteResultsStatus } = bookings;
      RootReducer.reduce({ 
        type: constants.bookings.deleteResponse,
        payload: {
          deleteResults: {
            ...deleteResults,
            passengers: "Removed 3 passengers."
          },
          deleteResultsStatus: {
            ...deleteResultsStatus,
            passengers: "SUCCESS"
          }
        }
      });
    }, 2500);

    // Payments Delete
    setTimeout(() => {
      const { bookings } = RootReducer.getState();
      const { deleteResults, deleteResultsStatus } = bookings;
      RootReducer.reduce({ 
        type: constants.bookings.deleteResponse,
        payload: {
          deleteResults: {
            ...deleteResults,
            payments: "No associated payments with booking."
          },
          deleteResultsStatus: {
            ...deleteResultsStatus,
            payments: "ERROR"
          }
        }
      });
    }, 1000);

    // Users Delete
    setTimeout(() => {
      const { bookings } = RootReducer.getState();
      const { deleteResults, deleteResultsStatus } = bookings;
      RootReducer.reduce({ 
        type: constants.bookings.deleteResponse,
        payload: {
          deleteResults: {
            ...deleteResults,
            users: "Updated 1 user profile."
          },
          deleteResultsStatus: {
            ...deleteResultsStatus,
            users: "SUCCESS"
          }
        }
      });
    }, 3500);
  }

  static onFakeAPICall() {
    RootReducer.reduce({ type: constants.bookings.request });
    setTimeout(() => {
      RootReducer.reduce({ type: constants.bookings.response });
    }, 1500);
  }
}
export default BookingsDebugDispatcher;
