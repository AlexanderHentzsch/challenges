import localforage from 'localforage';
import {v4 as uuidv4} from 'uuid';

function cloneDeep(e) {
  return JSON.parse(JSON.stringify(e));
}

const LOCALFORAGE_KEY = 'challenges.v1';

export const state = () => ({
  value: [],
});

export const getters = {
  value: state => {
    return state.value;
  },
  valueByUuid: ({value}) => (uuid) => {
    return value.find(e => e.uuid === uuid);
  },
};

export const mutations = {
  setValue(state, payload) {
    state.value = [...payload];
  },
  createOrReplaceChallenge(state, payload) {
    const index = state.value.findIndex(e => e.uuid === payload.uuid);
    if (index === -1) {
      payload.uuid = uuidv4();
      state.value.push(payload);
    } else {
      state.value[index] = payload;
      state.value = cloneDeep(state.value);
    }
  },
  deleteChallenge(state, uuid) {
    const index = state.value.findIndex(e => e.uuid === uuid);
    if (index === -1) return;
    const value = cloneDeep(state.value);
    value.splice(index, 1);
    state.value = value;
  },
};

export const actions = {
  async loadChallenges({commit}) {
    const payload = await localforage.getItem(LOCALFORAGE_KEY);
    commit('setValue', payload);
  },
  async createOrReplaceChallenge({commit, getters}, payload) {
    commit('createOrReplaceChallenge', payload);
    await localforage.setItem(LOCALFORAGE_KEY, getters['value']);
  },
  async deleteChallenge({commit, getters}, uuid) {
    commit('deleteChallenge', uuid);
    await localforage.setItem(LOCALFORAGE_KEY, getters['value']);
  },
};