import { db, fb } from '../../firebase';

const _costumersCollection = db.collection('brothers')

const state = {
  costumerList: [],
}

const getters = {
  costumerList: currentState => currentState.costumerList,
}

const mutations = {
  setCostumerList(currentState, value) {
    currentState.costumerList = value;
  },
}

const actions = {
  reset({ state, commit }) {
    commit('setCostumerList', null);
  },

  async listCostumers({ state, commit }) {
    commit('booking/setCostumerList', null);
    const costumersArray = [];
    const costumers = await _costumersCollection.get();

    costumers.forEach(doc => {
      const costumer = { id: doc.id, ...doc.data() }
      const formatCostumer = JSON.parse(JSON.stringify(costumer))
      costumersArray.push(formatCostumer);
      console.log('Success in getting costumers', costumersArray)
    });
    commit('setCostumerList', costumersArray);
    return;
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