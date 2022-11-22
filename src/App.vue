<template>
  <div class="app">
    <header>
      <nav class="navbar navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="../public/ico.png" width="35" height="35" alt="">
            Книга курсов
          </a>
          <div>
            <ul class="nav" v-if="token === undefined">
              <li class="nav-item">
                <button type="button" class="btn btn-outline-dark m-1" @click="staticBackdropRegister = true">Регистрация</button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-outline-dark m-1" @click="staticBackdropLogin = true">Войти</button>
              </li>
            </ul>
            <ul class="nav" v-else>
              <li class="nav-item" style="margin-top: 9px; margin-right: 5px;">
                <span>{{UserFIO}}</span>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-outline-dark m-1" @click="exit">Выйти</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <p></p>
    </header>

    <MDBModal id="staticBackdropRegister" tabindex="-1" labelledby="staticBackdropLabelRegister" v-model="staticBackdropRegister" staticBackdropRegister>
      <MDBModalHeader>
        <MDBModalTitle id="staticBackdropLabelRegister"> Регистрация </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody>
        <div class="alert alert-danger" role="alert" v-if="dictError.flagError1">
          Email уже используется
          <button type="button" class="btn btn-outline-dark " style="margin-left: auto;" @click="closeError('flagError1')">OK</button>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">ФИО</label>
          <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Иванов Иван Иванович" v-model="FIO">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Почта</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="Email">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
          <input type="password" class="form-control" id="inputPassword" v-model="Password">
        </div>
      </MDBModalBody>
      <MDBModalFooter>
        <button type="button" class="btn btn-outline-primary" @click="register"> Зарегистрироваться </button>
      </MDBModalFooter>
    </MDBModal>

    <MDBModal id="staticBackdropLogin" tabindex="-1" labelledby="staticBackdropLabelLogin"
      v-model="staticBackdropLogin" staticBackdropLogin>
      <MDBModalHeader>
        <MDBModalTitle id="staticBackdropLabelLogin"> Войти </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody>
        <div class="alert alert-danger" role="alert" v-if="dictError.flagError2">
          Пользователь не найден
          <button type="button" class="btn btn-outline-dark " style="margin-left: auto;"
            @click="closeError('flagError2')">OK</button>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Почта</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
            v-model="Email">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
          <input type="password" class="form-control" id="inputPassword" v-model="Password">
        </div>
      </MDBModalBody>
      <MDBModalFooter>
        <button type="button" class="btn btn-outline-primary" @click="login"> Войти </button>
      </MDBModalFooter>
    </MDBModal>

    <main>
      <router-view></router-view>
    </main>

    <footer class="bg-light text-center text-lg-start">
      <!-- Copyright -->
      <div class="text-center p-3">
        © 2022 TSU HIT'S:
        <a class="text-dark" href="#">Какой нибудь текст</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
import {
  MDBModal, 
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-vue-ui-kit';

import { ref } from 'vue';
import axios from "axios";

export default {
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    },
  setup(){
    const staticBackdropRegister = ref(false);
    const staticBackdropLogin = ref(false);
    return {
      staticBackdropRegister,
      staticBackdropLogin
    };
  },
  data(){
    return{
      Email: "",
      FIO: "",
      Password: "",
      UserFIO: "",
      token: undefined,
      dictError: {flagError1: false,flagError2: false},
    }
  },
  methods:{
    register(){
      axios.post('http://192.168.1.56:5050/auth-start/register',{
          "FIO": this.FIO,
          "Email": this.Email,
          "Password": this.Password
      }).then((response)=>{
        console.log(response.status)
        this.staticBackdropRegister = false;
        this.staticBackdropLogin = true;
      }).catch((error) =>{
        if (error.toJSON().status === 500){
          this.dictError.flagError1 = true;
        }
      })
    },
    login(){
      axios.post('http://192.168.1.56:5050/auth-start/login',{
        "Email": this.Email,
        "Password": this.Password
      }).then((response)=>{
        localStorage.token = response.data.token
        this.token = response.data.token
        this.staticBackdropLogin = false;
        window.location.reload();
      }).catch((error)=>{
        if (error.toJSON().status === 500) {
          this.dictError.flagError2 = true;
        }
      })
    },
    closeError(key){
      this.dictError[key] = false;
    },
    async getFIO(){
      await axios.get('http://192.168.1.56:5050/auth/get-user-fio',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }).then((response)=>{
          this.UserFIO = response.data
      })
    },
    exit(){
      localStorage.removeItem("token");
      this.token = undefined;
      window.location.reload();
    }
  },
  beforeMount(){
    this.token = localStorage.token
    if(this.token != undefined){
      this.getFIO();
    }
  },
}
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
}
</style>

