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
  logsByChallengeUuid: ({value}) => (uuid) => {
    const index = value.findIndex(e => e.uuid === uuid);
    if (index === -1) {
      console.error(`UUID nicht gefunden: ${uuid}`);
      return;
    }

    const d = value[index];
    const detailLevel = d.detailLevel;
    if (detailLevel === 'every' || detailLevel === undefined) {
      return cloneDeep(d.logs)
        .sort((a, b) => a.date < b.date ? 1 : -1)
        .map(e => {
          e.date = DateTime.fromISO(e.date).setLocale('de').toFormat('EEE dd.MM.yyyy hh:mm');
          return e;
        });
    }

    const _r = d.logs.reduce((prev, cur) => {
      const date = DateTime.fromISO(cur.date).setLocale('de').toFormat('EEE dd.MM.yyyy');
      if (prev[date] === undefined)
        prev[date] = 0;

      prev[date] = prev[date] + parseInt(cur.count);
      return prev;
    }, {});

    let r = [];
    for (let key in _r) {
      r.push({count: _r[key], date: key});
    }
    r = r.sort((a, b) => {
      return DateTime.fromISO(a.date) < DateTime.fromISO(b.date) ? 1 : -1;
    });
    return r;
  },
  detailLevelByChallengeUuid: ({value}) => (uuid) => {
    const index = value.findIndex(e => e.uuid === uuid);
    if (index === -1) {
      console.error(`UUID nicht gefunden: ${uuid}`);
      return;
    }

    return value[index].detailLevel || 'every';
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
  updateDetailLevel(state, {uuid, detailLevel}) {
    const index = state.value.findIndex(e => e.uuid === uuid);
    if (index === -1) {
      console.error(`UUID nicht gefunden: ${uuid}`);
      return;
    }

    const possibleTypes = ['d', 'every'];
    if (possibleTypes.indexOf(detailLevel) === -1) {
      console.error(`Ungültiger Detailgrad: ${detailLevel}`);
      return;
    }

    state.value[index].detailLevel = detailLevel;
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
  async updateDetailLevel({commit, getters}, {uuid, detailLevel}) {
    commit('updateDetailLevel', {uuid, detailLevel});
    await localforage.setItem(LOCALFORAGE_KEY, getters['value']);
  },
};