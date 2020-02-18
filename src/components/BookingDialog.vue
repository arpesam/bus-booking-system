<template>
  <v-row>
    <v-dialog v-model="getDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ getTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field label="Priemiro Nome *" v-model="booking.name" required></v-text-field>
              </v-col>

              <v-col cols="6" class="mt-5">
                <v-btn color="primary" class="mx-2" :disabled="!!id" depressed block small>Procurar</v-btn>
              </v-col>

              <v-col cols="12">
                {{ booking.seat }}
                <v-select :items="getSeats" label="Poltrona *" v-model="booking.seat" :value="booking.seat" required></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field label="RG *" v-model="booking.rg" required></v-text-field>
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
          <div style="color: red;" v-if="!!errorMessage"> {{ errorMessage }} </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="createOrUpdateBooking">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "custom-dialog",
  props: {
    dialogProp: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    seat: {
      type: String
    },
    name: {
      type: String
    },
    rg: {
      type: String
    },
    date: {
      type: String
    },
    ticketAmount: {
      type: [String, Number],
      default: 20
    },
    amountPaid: {
      type: String
    },
    rest: {
      type: [String, Number],
    }
  },
  model: {
    prop: "dialogProp",
    event: "change"
  },
  data: () => ({
    dialog: null,
    errorMessage: null,
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
      if(this.booking.seat)
        return [{ text: this.booking.seat, value: this.booking.seat }]
      const seats = [];
      for (let i = 0; i < 52; i++) {
        seats.push({ text: seats.length + 1, value: seats.length + 1 });
      }
      return seats;
    },
    getTitle() {
      if (this.id) return "Editar Reserva";
      return "Adicionar Reserva";
    },
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
      console.log('resetando booking dialog');
      
      this.getDialog = false;
    },
    getRest() {
      return this.booking.amountPaid - this.booking.ticketAmount;
    },
    createOrUpdateBooking() {
      if (
        !this.booking.rg ||
        !this.booking.seat ||
        !this.booking.name ||
        !this.booking.date ||
        !this.booking.amountPaid ||
        !this.booking.ticketAmount
      ) 
        return (this.errorMessage = "Preencha os dados obrigatórios");

      this.booking.rest = this.getRest()

      if(this.id) {
        this.$store
          .dispatch("booking/updateBooking", this.booking)
          .then(res => console.log("Booking atualizado com sucesso", res))
          .catch(err => console.log("Erro ao atualizar booking", err));
        this.$store.dispatch('booking/fetchBookingList');
        this.reset()
      }
      delete this.booking.id
      this.$store
        .dispatch("booking/createBooking", this.booking)
        .then(res => console.log("Booking criado com sucesso", res))
        .catch(err => console.log("erro ao criar booking", err));
      this.reset()
    }
  },
  mounted() {
    if (this.id) {
      this.booking.id = this.id;
      this.booking.rg = this.rg;
      this.booking.name = this.name;
      this.booking.rest = this.rest;
      this.booking.date = this.date;
      this.booking.seat = this.seat;
      this.booking.amountPaid = this.amountPaid;
      this.booking.ticketAmount = this.ticketAmount;
    } else {
      this.booking.id = null;
      this.booking.rg = null;
      this.booking.seat = null;
      this.booking.name = null;
      this.booking.date = null;
      this.booking.rest = null;
      this.booking.amountPaid = null;
      this.booking.ticketAmount = 20;
    }
  }
};
</script>