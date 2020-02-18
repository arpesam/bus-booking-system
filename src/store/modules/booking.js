import { db, fb } from '../../firebase';

const _bookingCollection = db.collection('reservations')

const state = {
  bookingsList: [],
}

const getters = {
  bookingsList: currentState => currentState.bookingsList,
}

const mutations = {
  setBookingList(currentState, value) {
    currentState.bookingsList = value;
  },
}

const actions = {
  reset({ state, commit }) {
    commit('setBookingList', null);
  },

  fetchBookingList({ state, commit }) {
    commit('booking/setBookingList', null);
    const bookingsArray = [];
    _bookingCollection
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const booking = { ...doc.data(), id: doc.id }
          const formatBooking = JSON.parse(JSON.stringify(booking))
          bookingsArray.push(formatBooking);
        });
      })
      .catch(err => {
        console.log("Error getting bookings", err);
      });
    commit('setBookingList', bookingsArray);
    return;
  },

  createBooking({ state, commit }, bookingData) {
    _bookingCollection
      .add({ ...bookingData })
      .then(function(docRef) {
        console.log("Booking written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding booking: ", error);
      });
  },

  updateBooking({ state, commit }, bookingData) {
    const bookingCollection = _bookingCollection.doc(bookingData.id)

    return bookingCollection
      .update({ ...bookingData })
      .then(function(docRef) {
        console.log("Booking updated with ID: ", docRef);
      })
      .catch(function(error) {
        console.error("Error update booking: ", error);
    });
  },

}

export {
  state,
  getters,
  mutations,
  actions,
}



// const getters = {
//   formElement: currentState => currentState.formElement,
//   number: currentState => currentState.number,
// };

// const mutations = {
//   setFormElement(currentState, element) {
//     currentState.formElement = element;
//   },
// };

// const actions = {

//   generateAdyenToken({state, commit}) {
//     if (!state.formElement) {
//       throw new Error('state.formElement arrived as null value. It is a critical error');
//     }