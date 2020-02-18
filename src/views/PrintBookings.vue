<template>
  <div>
    <v-simple-table
      :dense="true"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Pol.</th>
            <th class="text-left">Nome</th>
            <th class="text-left">RG</th>
            <th class="text-left">Data</th>
            <th class="text-left">Val. Pass.</th>
            <th class="text-left">Val. Pago.</th>
            <th class="text-left">Saldo</th>
            <th class="text-left">Check</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id">
            <td>{{ booking.seat }}</td>
            <td>{{ booking.name }}</td>
            <td>{{ booking.rg }}</td>
            <td>{{ booking.date }}</td>
            <td>{{ booking.ticketAmount }}</td>
            <td>{{ booking.amountPaid }}</td>
            <td>{{ booking.rest }}</td>
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
    bookings: null,
    height: 600,
    dense: false,
    fixedHeader: false,
  }),
  mounted() {
    this.$store.dispatch("booking/fetchBookingList");
    this.bookings = this.$store.getters['booking/bookingsList']
    setTimeout(() => window.print(), 1000)
  },
};
</script>
<style scoped>

@page {
  size: auto;
  margin: 0mm 3mm;
}
</style>