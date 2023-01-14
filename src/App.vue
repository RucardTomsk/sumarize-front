<template>

  <div class="app">

    <div class="container">

      <div class="row pt-3">
      <div class="input-group">
        <span class="input-group-text">Text</span>
        <textarea class="form-control" aria-label="With textarea" v-model="text"></textarea>
      </div>
      </div>

b
      <div class="row">
          <div class="col-1 pt-3 pb-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="ru" v-model="language">
              <label class="form-check-label" for="flexRadioDefault1">
                Русский
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="en" v-model="language" checked>
              <label class="form-check-label" for="flexRadioDefault2">
                Английский
              </label>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <button type="button" class="btn btn-secondary btn-lg" @click = "request_sum_text">Отправить</button>
            </div>
          </div>

      <div class="row">
        <div class="pt-3">
          <span v-html="sum_text"></span>
        </div>
      </div>
      </div>


    </div>

  </div>





</template>

<script>

import axios from "axios";

export default {
  data(){
    return{
      text: null,
      sum_text: "Вот тут будет текст!",
      language: "en",
    }
  },
  methods:{
    request_sum_text(){

      axios.post('http://localhost:5000/summarize/'+ this.language,{
        "request_text": this.text
      }).then((response)=>{
          let text = response.data
          let f_text = "<p>"+ text["sum_text"].replaceAll("\n",'</br>') + "</p>"
          this.sum_text = f_text
      }).catch((error)=>{
        console.log(error.toJSON())
      })
    }
  },
}
</script>


