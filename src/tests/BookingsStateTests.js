import BookingsDispatcher from "../dispatchers/BookingsDispatcher";
import Store from "../reducers/Store";

class BookingsStateTests {

  runAllTests() {
    jest.mock("../Orchestration");
    this.onCancel_expectAllActiveStatesFalseAndSearchResultsPage1();
  }

  onCancel_expectAllActiveStatesFalseAndSearchResultsPage1() {
    BookingsDispatcher.onCancel();
    const { bookings } = Store.getState();

    test("onCancel sets CRUD isActive bools to false and searchResultsPage to 1", 
    () => { 
      expect(bookings.create.isActive).toBe(false);
      expect(bookings.delete.isActive).toBe(false);
      expect(bookings.edit.isActive).toBe(false);
      expect(bookings.search.resultsPage).toBe(1);
    });
  }
}
export default BookingsStateTests;