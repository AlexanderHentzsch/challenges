import localforage from 'localforage';
import {v4 as uuidv4} from 'uuid';
import {DateTime} from 'luxon';
import {cloneDeep} from '~/helper/defalut';

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
    if (!payload) return;
    state.value = [...payload];
  },
  createOrReplaceChallenge(state, payload) {
    const index = state.value.findIndex(e => e.uuid === payload.uuid);
    if (index === -1) {
      payload.uuid = uuidv4();
      payload.logs = [];
      state.value.push(payload);
    } else {
      state.value[index] = {...state.value[index], ...payload};
      state.value = cloneDeep(state.value);
    }
  },
  deleteChallenge(state, uuid) {
    const index = state.value.findIndex(e => e.uuid === uuid);
    if (index === -1) {
      console.error('Challenge UUID nicht gefunden.');
      return;
    }
    const value = cloneDeep(state.value);
    value.splice(index, 1);
    state.value = value;
  },
  createOrReplaceLog(state, {uuid_challenge, uuid_log, count}) {
    const indexChallenge = state.value.findIndex(e => e.uuid === uuid_challenge);
    if (indexChallenge === -1) {
      console.error('Challenge UUID nicht gefunden.');
      return;
    }

    if (state.value[indexChallenge].logs === undefined)
      state.value[indexChallenge].logs = [];

    const indexLog = state.value[indexChallenge].logs.findIndex(e => e.uuid === uuid_log);
    if (indexLog === -1) {
      const date = DateTime.now().toUTC().toISO({extendedZone: false});
      const uuid = uuidv4();
      state.value[indexChallenge].logs.push({uuid, date, count});
    } else {
      state.value[indexChallenge].logs[indexLog].count = count;
    }
    state.value = cloneDeep(state.value);
  },
  deleteLog(state, {uuid_challenge, uuid_log}) {
    const indexChallenge = state.value.findIndex(e => e.uuid === uuid_challenge);
    if (indexChallenge === -1) {
      console.error('Challenge UUID nicht gefunden.');
      return;
    }
    const indexLog = state.value[indexChallenge].logs.findIndex(e => e.uuid === uuid_log);
    if (indexLog === -1) {
      console.error('Log UUID nicht gefunden.');
      return;
    }
    const value = cloneDeep(state.value);
    value[indexChallenge].logs.splice(indexLog, 1);
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
  async createOrReplaceLog({commit, getters}, payload) {
    commit('createOrReplaceLog', payload);
    await localforage.setItem(LOCALFORAGE_KEY, getters['value']);
  },
  async deleteLog({commit, getters}, payload) {
    commit('deleteLog', payload);
    await localforage.setItem(LOCALFORAGE_KEY, getters['value']);
  },
};