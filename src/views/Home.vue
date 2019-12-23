<template>
  <div>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
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