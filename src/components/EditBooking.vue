<template>
  <v-row>
    <v-dialog v-model="getDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Reserva</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Priemiro Nome" v-model="booking.name" readonly></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="RG" v-model="booking.rg" readonly></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Celular" v-model="booking.phone_number" readonly></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select
                  :items="getSeats"
                  label="Poltrona *"
                  v-model="booking.seat"
                  :value="booking.seat"
                  required
                ></v-select>
              </v-col>

              <v-col cols="6">
                <!-- Poltrona Atual: {{ booking.seat }} -->
                <v-text-field label="Poltrona Atual *" :value="seat" disabled></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Data *" v-model="booking.date" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Valor da Passagem *" v-model="booking.ticketAmount" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Valor pago *" v-model="booking.amountPaid" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <strong>SALDO: {{ getRest() }}</strong>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campos obrigatórios</small>
          <div style="color: red;" v-if="!!errorMessage">{{ errorMessage }}</div>
          <div style="color: green;" v-if="!!successMessage">{{ successMessage }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="updateBooking">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "add-booking",
  props: {
    dialogProp: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    rg: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    seat: {
      type: [Number, String],
      required: true
    },
    rest: {
      type: [String, Number],
      required: true
    },
    date: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
    },
    amountPaid: {
      type: String,
      required: true
    }
  },
  model: {
    prop: "dialogProp",
    event: "change"
  },
  data: () => ({
    dialog: null,
    errorMessage: null,
    successMessage: null,
    booking: {
      rg: null,
      id: null,
      seat: null,
      name: null,
      date: null,
      rest: null,
      amountPaid: null,
      ticketAmount: 20
    }
  }),
  computed: {
    getDialog: {
      get() {
        return this.dialogProp;
      },
      set(value) {
        this.dialog = value;
        this.$emit("change", value);
      }
    },
    getSeats() {
      const bookings = this.$store.getters["booking/bookingsList"];
      const busSeats = [];
      for (let i = 0; i <= 51; i++) {
        busSeats.push(i + 1);
      }
      const reservedSeats = [];
      for (let booking of bookings) {
        reservedSeats.push(booking.seat);
      }

      return busSeats.filter(item => !reservedSeats.includes(item));
    }
  },
  methods: {
    reset() {
      this.booking.id = null;
      this.booking.rg = null;
      this.booking.seat = null;
      this.booking.name = null;
      this.booking.date = null;
      this.booking.rest = null;
      this.booking.amountPaid = null;
      this.booking.ticketAmount = null;
      console.log("resetando booking dialog");

      this.getDialog = false;
    },
    getRest() {
      return this.booking.amountPaid - this.booking.ticketAmount;
    },
    updateBooking() {
      if (
        !this.booking.rg ||
        !this.booking.seat ||
        !this.booking.name ||
        !this.booking.date ||
        !this.booking.amountPaid ||
        !this.booking.ticketAmount
      )
        return (this.errorMessage = "Preencha os dados obrigatórios");

      this.booking.rest = this.getRest();
      this.$store
        .dispatch("booking/updateBooking", this.booking)
        .then(res => {
          console.log("Booking criado com sucesso", res);
          this.$store.dispatch("booking/fetchBookingList");
          this.successMessage = "reserva criada com sucesso";
        })
        .catch(err => {
          console.log("erro ao criar booking", err);
          this.errorMessage =
            "Erro ao adicionar reserva, verifique os dados e tente novamente";
        });
    }
  },
  mounted() {
    this.booking.rg = this.rg;
    this.booking.id = this.id;
    this.booking.name = this.name;
    this.booking.rest = this.rest;
    this.booking.date = this.date;
    this.booking.seat = this.seat;
    this.booking.amountPaid = this.amountPaid;
    this.booking.phone_number = this.phone_number;
  }
};
</script>