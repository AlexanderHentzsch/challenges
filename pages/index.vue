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

    <v-card>
      <v-card-text>
        {{ challenges }}
      </v-card-text>
      <v-card-title>
        Liegestütze
        <v-spacer/>
        <v-btn icon>
          <v-icon v-text="'mdi-plus'"/>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card outlined>
          <v-simple-table dense>
            <thead>
            <tr>
              <th>Datum</th>
              <th class="text-center">Anzahl</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>20.07.2023 20:56</td>
              <td class="text-center">30</td>
            </tr>
            <tr>
              <td>20.07.2023 20:56</td>
              <td>30</td>
            </tr>
            <tr>
              <td>20.07.2023 20:56</td>
              <td>30</td>
            </tr>
            <tr>
              <td>20.07.2023 20:56</td>
              <td>30</td>
            </tr>
            <tr>
              <td>20.07.2023 20:56</td>
              <td>30</td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-card-text>
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
        <v-btn icon>
          <v-icon v-text="'mdi-plus'"/>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        Ziel: {{ c.target }} | {{ getPendingDays(c) }}
      </v-card-subtitle>

    </v-card>

    <dialogs-add-challenge v-model="dialogs.addChallenge.show" :uuid="selectedUuid"/>
  </v-container>
</template>

<script>

import {DateTime} from 'luxon';

export default {
  name: 'index',
  data() {
    return {
      dialogs: {
        addChallenge: {
          show: false,
        },
      },
      selectedUuid: null,
    };
  },
  computed: {
    challenges() {
      return this.$store.getters['challenges/value'];
    },
  },
  methods: {
    addChallenge_showDialog() {
      this.selectedUuid = null;
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
      this.selectedUuid = uuid;
      this.dialogs.addChallenge.show = true;
    },
  },
};
</script>