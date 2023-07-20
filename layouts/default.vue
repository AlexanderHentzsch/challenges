<template>
  <v-app>
    <v-main>
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style>
html, body {
    overflow: auto;
}
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
    height: inherit;
}

.v-bottom-navigation > .theme--light.v-btn.v-btn--has-bg {
    background-color: inherit;
}
</style>