<template>
  <v-layout row justify-center>
    <v-dialog v-model="_dialog" persistent max-width="290">
      <v-btn color="primary" dark slot="activator">{{modal_title}}</v-btn>
      <v-card>
        <v-card-title class="headline">{{_headline}}</v-card-title>
        <v-card-text>
            {{modal_text}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="button_count" color="red darken-1" flat @click.native="dialog = false">{{button_text}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        _dialog: false,
        modal_title: '',
        _headline: '',
        modal_text: '',
        button_count: 1,
        button_text: ''
      }
    },
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        modalTitle: {
            type: String,
            required: true
        },
        headline: {
            type: String,
            required: true
        },
        modalText: {
            type: String,
            required: true
        },
        buttonCount: {
            type: Number,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        }
    },
    created() {
        this._dialog = this.dialog
        this.modal_title = this.modalTitle
        this._headline = this.headline
        this.modal_text = this.modalText
        this.button_count = this.buttonCount
        this.button_text = this.buttonText
    }
  }
</script>