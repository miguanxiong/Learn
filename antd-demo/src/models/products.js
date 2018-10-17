
export default {
  namespace: 'products',
  state: [],
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
  reducers: {
    // update(state) {
    //   return `${state}_product`;
    // },
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
  effects: {
    
    *fetch({ type, payload }, { put, call, select }) {
    },
  },
}
