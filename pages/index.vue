<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>
        Challenges
        <v-spacer/>
        <v-btn
          @click="addChallenge_showDialog()"
          icon
        >
          <v-icon v-text="'mdi-plus'"/>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-card
      class="mb-4"
      v-for="c in challenges"
      :key="c.uuid"
    >
      <v-card-title>
        {{ c.title }}
        <v-btn @click="editChallenge(c.uuid)" icon>
          <v-icon v-text="'mdi-pencil'"/>
        </v-btn>
        <v-spacer/>
        <v-btn @click="addLog(c.uuid)" icon>
          <v-icon v-text="'mdi-plus'"/>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        Ziel: {{ challenge_getSum(c.logs) }}/{{ c.target }} | {{ getPendingDays(c) }}
      </v-card-subtitle>
      <v-card outlined>
        <v-data-table
          :headers="challengeHeaders"
          :items="challenge_getDataTableItems(c)"
          :mobile-breakpoint="0"
        >
          <template v-slot:item.edit="{ item }">
            <v-btn @click="changeLog(c.uuid, item)" icon>
              <v-icon v-text="'mdi-pencil'"/>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>

    </v-card>

    <v-card>
      <v-card-text>
        <v-icon v-text="'mdi-information'"/>
        App Icon:
        <a
          href="https://www.flaticon.com/de/kostenlose-icons/fokus"
          title="fokus Icons"
          target="_blank"
        >
          Fokus Icons erstellt von Freepik - Flaticon
        </a>
      </v-card-text>
    </v-card>

    <dialogs-add-challenge v-model="dialogs.addChallenge.show" :uuid="selectedUuid_challenge"/>
    <dialogs-add-log
      v-model="dialogs.addLog.show" :uuid_challenge="selectedUuid_challenge" :uuid_log="selectedUuid_log"
    />
  </v-container>
</template>

<script>

import {DateTime} from 'luxon';
import {cloneDeep} from '~/helper/defalut';

export default {
  name: 'index',
  data() {
    return {
      dialogs: {
        addChallenge: {
          show: false,
        },
        addLog: {
          show: false,
        },
      },
      selectedUuid_challenge: null,
      selectedUuid_log: null,
      challengeHeaders: [
        {text: 'Datum', value: 'date'},
        {text: 'Anzahl', value: 'count', align: 'center'},
        {text: '', value: 'edit', align: 'center', sortable: false},
      ],
    };
  },
  computed: {
    challenges() {
      return this.$store.getters['challenges/value'];
    },
  },
  methods: {
    addChallenge_showDialog() {
      this.selectedUuid_challenge = null;
      this.dialogs.addChallenge.show = true;
    },
    getPendingDays(c) {
      const startedAt = DateTime.fromISO(c.startedAt);
      const endedAt = startedAt.plus({days: c.days});
      const now = DateTime.now();
      const pendingDays = Math.ceil(endedAt.diff(now, 'days').days);
      return `Verbleibende Tage: ${pendingDays}`;
    },
    editChallenge(uuid) {
      this.selectedUuid_challenge = uuid;
      this.dialogs.addChallenge.show = true;
    },
    addLog(uuid_challenge) {
      this.selectedUuid_challenge = uuid_challenge;
      this.selectedUuid_log = null;
      this.dialogs.addLog.show = true;
    },
    challenge_getDataTableItems(c) {
      c = cloneDeep(c);
      if (c.logs === undefined)
        return [];
      const r = c.logs
        .map(e => {
          e.date = DateTime.fromISO(e.date).toFormat('dd.MM.yyyy HH:mm').toString();
          return e;
        })
        .sort((a, b) => {
          return a.date > b.date ? -1 : 1;
        });
      return r || [];
    },
    challenge_getSum(logs) {
      if (logs === undefined)
        logs = [];
      let count = 0;
      logs.forEach(e => {
        count = count + parseInt(e.count);
      });
      return count;
    },
    async changeLog(uuidChallenge, log) {
      this.selectedUuid_challenge = uuidChallenge;
      this.selectedUuid_log = log.uuid;
      this.dialogs.addLog.show = true;
    }
  },
};
</script>