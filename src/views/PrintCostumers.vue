<template>
  <div>
    <v-simple-table
      :dense="true"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">RG</th>
            <th class="text-left">Celular</th>
            <th class="text-left">Check</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="costumer in costumers" :key="costumer.id">
            <td>{{ costumer.name }}</td>
            <td>{{ costumer.rg }}</td>
            <td>{{ costumer.phone_number }}</td>
            <td>[ ]</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

export default {
  name: 'print-bookings',
  data: () => ({
    costumers: null,
    height: 600,
    dense: false,
    fixedHeader: false,
  }),
  mounted() {
    this.doPrint()
  },
  methods: {
    async doPrint() {
      await this.$store.dispatch("costumer/listCostumers");
      this.costumers = await this.$store.getters['costumer/costumerList'];
      setTimeout(() => window.print(), 1000);
    },
  },
};
</script>
<style scoped>

@page {
  size: auto;
  margin: 0mm 3mm;
}
</style>