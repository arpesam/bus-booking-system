<template>
  <v-row>
    <v-col>
      <!-- Header -->
      <v-row justify-end>
        <v-col cols="6">
          <v-row justify="around">
            <v-btn
              color="primary"
              class="mx-2 my-1"
              @click="modalAddCostumer = true"
              depressed
              small
            >Add Cadastro</v-btn>

            <v-btn
              color="warning"
              class="mx-2 my-1"
              @click="doPrint"
              depressed
              small
            >Imprimir</v-btn>

            <v-btn
              v-show="!showCostumers"
              color="secondary"
              class="mx-2 my-1"
              @click="showCostumers = true"
              depressed
              small
            >Ver Cadastros</v-btn>

            <v-btn
              v-if="showCostumers"
              color="secondary"
              class="mx-2 my-1"
              @click="showCostumers = false"
              depressed
              small
            >Ver Reservas</v-btn>
          </v-row>
        </v-col>
      </v-row>

      <!-- Table -->
      <v-row v-if="showCostumers">
        <v-col>
          <costumers-table @edit-booking="editBooking" />
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col>
          <bookings-table @edit-booking="editBooking" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <add-costumer :dialog-prop="modalAddCostumer" @change="setAddCostumerDialog" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import BookingsTable from "./BookingsTable.vue";
import CostumersTable from "./CostumersTable.vue";
import AddCostumer from "./AddCostumer.vue";


import { fb, db } from "../firebase";

const costumerCollection = db.collection("brothers");

export default {
  name: "hello-world",
  components: {
    AddCostumer,
    BookingsTable,
    CostumersTable,
  },
  data: () => ({
    showCostumers: false,
    modalAddCostumer: false,
    brotherComponentKey: 1,
    bookingComponentKey: 1,
    brother: {
      id: null,
      name: null,
      rg: null
    },
    booking: {
      id: null,
      rg: null,
      id: null,
      seat: null,
      name: null,
      date: null,
      rest: null,
      amountPaid: null,
      ticketAmount: null
    }
  }),
  methods: {
    setBookingDialog(value) {
      this.bookingDialog = value;
    },
    setAddCostumerDialog(value) {
      this.modalAddCostumer = value;
    },
    openModalToEditBrother(brotherData) {
      console.log("opening modal", brotherData);
      this.brother = { ...brotherData };
      this.brotherComponentKey += 1;
      this.dialog = true;
    },
    async editBooking(bookingData) {
      this.booking = { ...bookingData };
      this.bookingComponentKey += 1;
      this.bookingDialog = true;
    },
    doPrint() {
      let routeData = this.$router.resolve({ name: 'PrintBookings' });

      if (this.showCostumers)
        routeData = this.$router.resolve({ name: 'PrintCostumers' });
      
      window.open(routeData.href, "myWindow", "width=876px, height=980px");
    },
  },
  mounted() {
    this.$store.dispatch("booking/fetchBookingList");
    this.$store.dispatch("costumer/listCostumers");
  }
};
</script>

<style>
</style>