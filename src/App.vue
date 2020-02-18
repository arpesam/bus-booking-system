<template>
  <v-app>
    <v-content>
      <div class="navbar text-md-left text-sm-left">
        <span class="navbar--text">ARRANJO DE ÔNIBUS</span>
      </div>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
  .borda {
    border: 1px solid red;
  }

  .navbar {
    height: 50px;
    background: #424242;
    color: white;
    padding: 10px;

    &--text {
      margin-top: 50px;
    }
  }
</style>
