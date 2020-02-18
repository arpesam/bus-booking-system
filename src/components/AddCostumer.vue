<template>
  <v-row justify="center">
    <v-dialog v-model="getDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Cadastro</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nome *" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="RG *" v-model="rg" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Celular *" placeholder="5511999999999" v-model="phone_number" required></v-text-field>
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
          <v-btn color="blue darken-1" text @click="addCostumer">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "add-costumer",
  props: {
    dialogProp: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "dialogProp",
    event: "change"
  },
  data: () => ({
    dialog: false,
    name: "",
    rg: "",
    phone_number: "",
    errorMessage: "",
    successMessage: "",
  }),
  computed: {
    getDialog: {
      get() {
        return this.dialogProp
      },
      set(value) {
        this.dialog = value;
        this.$emit('change', value);
      }
    }
  },
  methods: {
    reset() {
      this.name = "";
      this.phone_number = "";
      this.rg = "";
      this.errorMessage = "";
      this.successMessage = "";
      this.getDialog = false;
    },

    async addCostumer(brotherData) {
      if (!this.name || !this.rg || !this.phone_number)
        return (this.errorMessage = "Preencha os dados obrigatórios");

      const costumer = {
        name: this.name,
        rg: this.rg,
        phone_number: this.phone_number,
      };

      const createdCostumer = await db.collection("brothers").add({ ...costumer })

      if(!createdCostumer || !createdCostumer.id) {
        return this.errorMessage = "Erro ao cadastrar, tente novamente"
      }

      this.$store.dispatch('costumer/listCostumers');
      return this.successMessage = "Cadastro realizado com sucesso";
    }
  },
};
</script>