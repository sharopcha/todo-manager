import axios from 'axios';

const state = {
  todos: [
    { id: 1, title: 'Todo one' },
    { id: 2, title: 'Todo two' },
  ],
};

const getters = {
  allTodos: state => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos?'
    );

    commit('setTodos', response.data);
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      { title, completed: false }
    );

    console.log(response);

    commit('newTodo', response.data);
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },

  async filterTodo({ commit }, e) {
    // get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit('setTodos', response.data);
  },

  async updateTodo({ commit }, updatedTodo) {
    await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`
    );

    commit('updateTodo', updatedTodo);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, newTodo) => {
    const index = state.todos.findIndex(todo => todo.id === newTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, newTodo);
    }
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
