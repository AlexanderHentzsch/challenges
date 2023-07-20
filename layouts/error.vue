<template>
  <v-app>
    <v-main>
      <h1>
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      otherError: 'An error occurred',
    };
  },
  head() {
    return {title: this.otherError};
  },
};
</script>

<style scoped>
h1 {
    font-size: 20px;
}

html, body {
    overflow: auto;
}
</style>