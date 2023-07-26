<template>
  <v-dialog v-model="show" max-width="300">
    <v-card>
      <v-card-title class="d-block text-center">
        Log
        <v-btn
          v-if="$props.uuid_log"
          @click="deleteLog()"
          color="red darken-2"
          class="mb-1"
          icon
        >
          <v-icon v-text="'mdi-trash-can-outline'"/>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="d-block text-center">
        {{ challengeTitle }}
      </v-card-subtitle>
      <v-card-text class="pa-2 pb-6">
        <v-text-field
          type="number"
          v-model="formular.count"
          outlined
          hide-details
          @keyup.enter="createOrReplaceLog()"
        />
      </v-card-text>
      <v-card-actions class="pa-0">
        <v-btn
          @click="createOrReplaceLog()"
          color="primary"
          v-text="'Speichern'"
          :disabled="someEmptyFormularValue"
          block
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'comp-dialogs-add-logg',
  props: {
    value: Boolean,
    uuid_challenge: String,
    uuid_log: String,
  },
  data() {
    return {
      show: false,
      formular: {
        count: null,
      },
    };
  },
  computed: {
    someEmptyFormularValue() {
      return !this.formular.count;
    },
    challengeTitle() {
      return this.$store.getters['challenges/valueByUuid'](this.$props.uuid_challenge)?.title;
    },
  },
  watch: {
    '$props.value'(n) {
      this.show = !!n;
    },
    show(n) {
      this.$emit('input', !!n);
    },
    '$props.uuid_challenge'(uuid_challenge) {
      this.setValuesByUuid(uuid_challenge, this.$props.uuid_log);
    },
    '$props.uuid_log'(uuid_log) {
      this.setValuesByUuid(this.$props.uuid_challenge, uuid_log);
    },
  },
  mounted() {
    const {value, uuid_challenge, uuid_log} = this.$props;
    this.show = !!value;
    this.setValuesByUuid(uuid_challenge, uuid_log);
  },
  methods: {
    setValuesByUuid(uuid_challenge, uuid_log) {
      if (!uuid_challenge)
        return;

      const challenge = this.$store.getters['challenges/valueByUuid'](uuid_challenge);
      if (challenge === undefined) {
        console.error('Challenge UUID nicht gefunden');
        return;
      }

      if (challenge.logs === undefined)
        challenge.logs = [];

      const indexLog = challenge.logs.findIndex(e => e.uuid === uuid_log);
      this.formular.count = indexLog !== -1 ? challenge.logs[indexLog].count : null;
    },
    createOrReplaceLog() {
      if (this.someEmptyFormularValue) return;

      const {uuid_challenge, uuid_log} = this.$props;
      const count = this.formular.count;
      const payload = {uuid_challenge, uuid_log, count};
      this.$store.dispatch('challenges/createOrReplaceLog', payload);
      this.show = false;
    },
    deleteLog() {
      const {uuid_challenge, uuid_log} = this.$props;
      const payload = {uuid_challenge, uuid_log};
      this.$store.dispatch('challenges/deleteLog', payload);
      this.show = false;
    },
  },
};
</script>