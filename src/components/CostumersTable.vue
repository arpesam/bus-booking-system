<template>
  <div>
    <v-simple-table :dense="dense" :fixed-header="fixedHeader" :height="height">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">RG</th>
            <th class="text-left">Celular</th>
            <th class="text-left">Reserva</th>
            <th class="text-left">Editar</th>
            <th class="text-left">Excluir</th>
            <th class="text-left">WP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="costumer in $store.getters['costumer/costumerList']" :key="costumer.id">
            <td>{{ costumer.name }}</td>
            <td>{{ costumer.rg }}</td>
            <td>{{ costumer.phone_number }}</td>
            <td>
              <v-btn outlined color="indigo" @click="createBooking(costumer)">Reservar</v-btn>
            </td>
            <td>
              <v-btn outlined x-small fab color="indigo" @click="editCostumer(costumer)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn outlined x-small fab color="red" @click.stop="openConfirmModal(costumer.id)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn outlined x-small fab color="green" @click.prevent="openWP(costumer.phone_number)">
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-row>
      <v-col cols="8" md="6">
        <v-text-field
          v-model="height"
          class="mx-4"
          label="Height - px"
          max="500"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-col>
    </v-row>
    <edit-costumer
      v-if="costumer.id"
      :name-prop="costumer.name"
      :id-prop="costumer.id"
      :rg-prop="costumer.rg"
      :phone-number-prop="costumer.phone_number"
      :dialog-prop="modalEditCostumer"
      @change="setEditCostumerDialog"
    />
    <add-booking
      v-if="bookingPayload.name"
      :costumer-name="bookingPayload.name"
      :costumer-rg="bookingPayload.rg"
      :costumer-phone-number="bookingPayload.phone_number"
      :dialog-prop="modalCreateBooking"
      @change="setBookingDialog"
    />

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Você tem certeza?</v-card-title>

        <v-card-text>O cadastro será deletado não poderá ser recuperado.</v-card-text>
        <v-card-text v-if="!!errorMessage" style="color: red">{{ errorMessage }}</v-card-text>
        <v-card-text v-if="!!successMessage" style="color: green">{{ successMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Fechar</v-btn>

          <v-btn color="green darken-1" text @click="deleteCostumer">Deleter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EditCostumer from "./EditCostumer";
import AddBooking from "./AddBooking";

import { fb, db } from "../firebase";

const costumerCollection = db.collection("brothers");

export default {
  name: "costumers-table",
  components: {
    EditCostumer,
    AddBooking
  },
  data: () => ({
    dense: false,
    fixedHeader: false,
    height: 600,
    costumers: [],
    costumer: {},
    modalEditCostumer: false,
    modalCreateBooking: false,
    bookingPayload: {},
    costumerToDelete: null,
    dialog: false,
    successMessage: null,
    errorMessage: null,
  }),
  methods: {
    setEditCostumerDialog(value) {
      this.costumer = {};
      this.modalEditCostumer = value;
    },
    setBookingDialog(value) {
      this.bookingPayload = {};
      this.modalCreateBooking = value;
    },

    editCostumer(costumer) {
      this.costumer = costumer;
      this.modalEditCostumer = true;
    },
    createBooking(payload) {
      this.bookingPayload = payload;
      this.modalCreateBooking = true;
    },
    openConfirmModal(id) {
      this.dialog = true;
      this.errorMessage = null;
      this.successMessage = null;
      this.costumerToDelete = id;
    },
    deleteCostumer() {
      console.log(this.costumerToDelete)
      costumerCollection.doc(this.costumerToDelete)
        .delete()
        .then((data) => {
          this.successMessage = 'Cadastado excluído com sucesso';
          this.$store.dispatch('costumer/listCostumers');
          this.dialog = false;
        }).catch(function(error) {
          this.errorMessage = 'Houve um erro, tente novamente';
        });
    },
    openWP(phone_number) {
      window.open(`https://web.whatsapp.com/?phone=${phone_number}`, "_blank");
    },
  }
};
</script>