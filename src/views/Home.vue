<template>
  <v-layout>
    <v-flex>
      <booking-system></booking-system>
    </v-flex>
  </v-layout>
</template>

<script>
import BookingSystem from '@/components/index.vue';

export default {
  components: {
    BookingSystem,
  },
  methods: {
    openWin() {
      const routeData = this.$router.resolve({name: 'print' });
      console.log(routeData.href)
      window.open(routeData.href, "myWindow", "width=1018px, height=980px");
    },
  }
}
</script>

<style>

</style>