<template>
  <div>
    <v-simple-table
      :dense="dense"
      :fixed-header="fixedHeader"
      :height="height"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Poltrona</th>
            <th class="text-left">Nome</th>
            <th class="text-left">RG</th>
            <th class="text-left">Data</th>
            <th class="text-left">Val. Pass.</th>
            <th class="text-left">Val. Pago.</th>
            <th class="text-left">Saldo</th>
            <th class="text-left">Editar</th>
            <th class="text-left">Excluir</th>
            <th class="text-left">WP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in getBookingList" :key="booking.id">
            <td>{{ booking.seat }}</td>
            <td>{{ booking.name }}</td>
            <td>{{ booking.rg }}</td>
            <td>{{ booking.date }}</td>
            <td>{{ booking.ticketAmount }}</td>
            <td>{{ booking.amountPaid }}</td>
            <td>{{ booking.rest }}</td>
            <td>
              <v-btn outlined x-small fab color="indigo" @click="editBooking(booking)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn outlined x-small fab color="red" @click="openConfirmModal(booking.id)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn outlined x-small fab color="green" @click="openWP(booking.phone_number)">
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Você tem certeza?</v-card-title>

            <v-card-text>A reserva será deletada não poderá ser recuperada.</v-card-text>
            <v-card-text v-if="!!errorMessage" style="color: red">{{ errorMessage }}</v-card-text>
            <v-card-text v-if="!!successMessage" style="color: green">{{ successMessage }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">Fechar</v-btn>

              <v-btn color="green darken-1" text @click="deleteBooking">Deleter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-simple-table>

    <edit-booking
      v-if="bookingPayload.id"
      v-bind="bookingPayload"
      :dialog-prop="modalEditBooking"
      @change="setBookingDialog"
    />
  </div>
</template>

<script>
import EditBooking from './EditBooking';

import { fb, db } from "../firebase";


export default {
  name: 'bookings-table',
  components: {
    EditBooking,
  },
  data: () => ({
    height: 600,
    dense: false,
    dialog: false,
    bookingPayload: {},
    errorMessage: null,
    fixedHeader: false,
    successMessage: null,
    bookingToDelete: null,
    modalEditBooking: false,
  }),
  computed: {
    getBookingList() {
      const aa = this.$store.getters['booking/bookingsList']
      console.log('bookings state', aa) 
      return aa
    }
  },
  methods: {
    setBookingDialog(value) {
      this.bookingPayload = {};
      this.modalEditBooking = value;
    },
    editBooking(payload) {
      this.bookingPayload = payload;
      this.modalEditBooking = true;
    },
    openConfirmModal(id) {
      this.dialog = true;
      this.errorMessage = null;
      this.successMessage = null;
      this.bookingToDelete = id;
    },
    openWP(phone_number) {
      window.open(`https://web.whatsapp.com/send?phone=${phone_number}`, "_blank");
    },
    deleteBooking() {
      console.log(this.bookingToDelete)
      db.collection('reservations').doc(this.bookingToDelete)
        .delete()
        .then((data) => {
          this.successMessage = 'Reserva excluída com sucesso';
          this.$store.dispatch('booking/fetchBookingList');
          this.dialog = false;
        }).catch(function(error) {
          this.errorMessage = 'Houve um erro, tente novamente';
        });
    }
  }
}
</script>