<template>
  <v-dialog v-model="show" max-width="300">
    <v-card>
      <v-card-title class="d-block text-center">
        Challenge anlegen
        <v-btn
          v-if="$props.uuid"
          @click="deleteChallenge()"
          color="red darken-2"
          class="mb-1"
          icon
        >
          <v-icon v-text="'mdi-trash-can-outline'"/>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-2 pb-6">
        <template v-for="(c, index) in formular">
          <component
            :is="c.cname"
            v-model="formular[index].value"
            v-bind="c.props"
            @click="c.click"
          ></component>
        </template>
      </v-card-text>
      <v-card-actions class="pa-0">
        <v-btn
          @click="createOrReplaceChallenge()"
          color="primary"
          v-text="actionBtn_text"
          :disabled="someEmptyFormularValue"
          block
        />
      </v-card-actions>
    </v-card>

    <v-dialog v-model="showDatePicker" width="290">
      <v-card>
        <v-card-text class="pa-0">
          <v-date-picker
            v-model="formular[2].value"
            color="primary"
          />
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-btn
            @click="showDatePicker = false"
            class="py-6"
            color="primary"
            block
            text
          >
            Übernehmen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
export default {
  name: 'comp-dialogs-add-challenge',
  props: {
    value: Boolean,
    uuid: String,
  },
  data() {
    return {
      show: false,
      showDatePicker: false,
      formular: [
        {
          key: 'title',
          cname: 'v-text-field',
          value: null,
          props: {
            label: 'Titel',
            class: 'mb-4',
            outlined: true,
            'hide-details': true,
          },
          click: () => {
          },
        },
        {
          key: 'target',
          cname: 'v-text-field',
          value: null,
          props: {
            label: 'Ziel',
            class: 'mb-4',
            outlined: true,
            'hide-details': true,
            type: 'number',
            'append-icon': 'mdi-bullseye-arrow',
          },
          click: () => {
          },
        },
        {
          key: 'startedAt',
          cname: 'v-text-field',
          value: null,
          props: {
            label: 'Start',
            class: 'mb-4',
            outlined: true,
            'hide-details': true,
            readonly: true,
            'append-icon': 'mdi-calendar',
          },
          click: () => {
            this.showDatePicker = true;
          },
        },
        {
          key: 'days',
          cname: 'v-text-field',
          props: {
            label: 'Ende',
            type: 'number',
            outlined: true,
            'hide-details': true,
            suffix: 'Tage',
          },
          click: () => {
          },
        },
      ],
    };
  },
  computed: {
    formularValues() {
      const payload = {};
      this.formular.forEach(e => {
        payload[e.key] = e.value;
      });
      if (this.$props.uuid) payload.uuid = this.$props.uuid;
      return payload;
    },
    actionBtn_text() {
      return (this.$props.uuid) ? 'Ändern' : 'Anlegen';
    },
    someEmptyFormularValue() {
      const payload = this.formularValues;
      let empty = false;
      for (let key in payload) {
        if (!payload[key]) empty = true;
      }
      return empty;
    },
  },
  watch: {
    '$props.value'(n) {
      this.show = !!n;
    },
    show(n) {
      this.$emit('input', !!n);
    },
    '$props.uuid'(uuid) {
      this.setValuesByUuid(uuid);
    },
  },
  mounted() {
    const {value, uuid} = this.$props;
    this.show = !!value;
    this.setValuesByUuid(uuid);
  },
  methods: {
    setValuesByUuid(uuid) {
      const d = this.$store.getters['challenges/valueByUuid'](uuid);
      if (d === undefined) {
        for (let index in this.formular) {
          this.formular[index].value = null;
        }
      } else {
        for (let key in d) {
          const index = this.formular.findIndex(e => e.key === key);
          if (index >= 0)
            this.formular[index].value = d[key];
        }
      }
    },
    createOrReplaceChallenge() {
      if (this.someEmptyFormularValue) return;

      this.$store.dispatch('challenges/createOrReplaceChallenge', this.formularValues);
      this.show = false;
    },
    deleteChallenge() {
      this.$store.dispatch('challenges/deleteChallenge', this.$props.uuid);
      this.show = false;
    },
  },
};
</script>