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
        <span class="text-center">Забыли пароль? <span class="change-text-blue" @click="staticBackdropLogin = false, staticBackdropRecovery= true">Восстановить</span></span>
      </MDBModalBody>
      <MDBModalFooter>
            <span style="margin-right:auto">Ещё нету аккаунта? <span class="change-text" @click="openRegister">Зарегистрироваться</span></span>
            <button type="button" class="btn btn-outline-primary" @click="login" > Войти </button>
      </MDBModalFooter>
    </MDBModal>

    <MDBModal id="staticBackdropRecovery" tabindex="-1" labelledby="staticBackdropLabelRecovery"
      v-model="staticBackdropRecovery" staticBackdropRecovery>
      <MDBModalHeader>
        <MDBModalTitle id="staticBackdropLabelRecovery"> Восстановление </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody>
        <div class="mb-3" v-if="flagCode">
          <label for="staticEmail" class="form-label">Почта</label>
            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value=Email>
        </div>

        <div class="mb-3" v-else>
          <label for="exampleFormControlInput1" class="form-label">Почта</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
            v-model="Email">
        </div>

        <div class="mb-3" v-if="flagCode">
          <label for="exampleFormControlInput2" class="form-label">Код</label>
          <input class="form-control" id="exampleFormControlInput2" v-model="code">
        </div>
      </MDBModalBody>
      <MDBModalFooter>
        <button v-if="flagCode" type="button" class="btn btn-outline-primary" @click="ChecCode"> Восстановить</button>
        <button v-else type="button" class="btn btn-outline-primary" @click="RequestACode"> Запросить код</button>
      </MDBModalFooter>
    </MDBModal>

    <MDBModal id="staticBackdropReset" tabindex="-1" labelledby="staticBackdropLabelReset"
      v-model="staticBackdropReset" staticBackdropReset>
      <MDBModalHeader>
        <MDBModalTitle id="staticBackdropLabelReset"> Восстановление </MDBModalTitle>
      </MDBModalHeader>
      <MDBModalBody>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Новый пароль</label>
          <input type="password" class="form-control" id="exampleFormControlInput1"
            v-model="Password">
        </div>

      </MDBModalBody>
      <MDBModalFooter>
        <button type="button" class="btn btn-outline-primary" @click="ResetPassword"> Сменить пароль</button>
      </MDBModalFooter>
    </MDBModal>

    <main :key="keyRender">
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

import {ref} from 'vue';
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
    const staticBackdropRecovery = ref(false);
    const staticBackdropReset = ref(false);
    return {
      staticBackdropRegister,
      staticBackdropLogin,
      staticBackdropRecovery,
      staticBackdropReset
    };
  },
  data(){
    return{
      Email: "",
      FIO: "",
      Password: "",
      UserFIO: "",
      code: "",
      flagCode: false,
      token: undefined,
      dictError: {flagError1: false,flagError2: false},
      keyRender: 0,
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
    openRegister(){
      this.staticBackdropLogin = false;
      this.staticBackdropRegister = true;
    },
    login(){
      axios.post('http://192.168.1.56:5050/auth-start/login',{
        "Email": this.Email,
        "Password": this.Password
      }).then((response)=>{
        localStorage.token = response.data.token
        localStorage.refreshToken = response.data.refreshToken
        this.token = response.data.token
        this.staticBackdropLogin = false;
        this.getFIO();
        this.$forceUpdate();
        this.keyRender += 1;
      }).catch((error)=>{
        if (error.toJSON().status === 500) {
          this.dictError.flagError2 = true;
        }
      })
    },
    checkToken(){
      axios.post('http://192.168.1.56:5050/auth-start/check-datatime-token',{
        'refreshToken': localStorage.refreshToken
      },{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }).then(response=>{
        var res = response.data
        if (res.length ===2){
          localStorage.token = response.data.token
          localStorage.refreshToken = response.data.refreshToken
          this.token = response.data.token
        }
      }).catch((error) => {
        console.log(error.toJSON())
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
          this.UserFIO = response.data;
          this.$forceUpdate();
      }).catch(()=>{
        this.exit()
      })
    },
    exit(){
      localStorage.removeItem("token");
      this.token = undefined;
      this.$forceUpdate();
      this.keyRender +=1;
    },
    RequestACode(){
      axios.post('http://192.168.1.56:5050/auth-start/create-reset-password',{
        'email': this.Email
      }).then(()=>{
        this.flagCode = true;
      }).catch(error=>{
        console.log(error.toJSON())
      })
    },
    ChecCode(){
      axios.post('http://192.168.1.56:5050/auth-start/check-reset-password',{
        'email': this.Email,
        'code': this.code
      }).then(()=>{
        this.flagCode = false;
        this.Password = "";
        this.staticBackdropRecovery = false;
        this.staticBackdropReset = true;
      }).catch(error=>{
        console.log(error.toJSON())
        alert('Код не верный');
      })
    },
    ResetPassword(){
      axios.post('http://192.168.1.56:5050/auth-start/use-reset-password',{
        'email': this.Email,
        'pass': this.Password
      }).then(()=>{
        this.staticBackdropReset = false;
        alert("Пароль изменён")
        this.staticBackdropLogin = true;
      }).catch(error=>{
        console.log(error.toJSON())
      })
    }
  },
  beforeMount(){
    this.token = localStorage.token
    if(this.token != undefined){
      this.getFIO();
    }
  },
  update(){
    this.token = localStorage.token
    if (this.token != undefined) {
      this.getFIO();
    }
  }
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

span.change-text {
  color: red;
  /* Цвет текста */
  font-size: 1em;
  /* Размер текста */
  font-weight: bold;
  padding: 20px 0px;
  text-transform: uppercase;
  line-height: 1;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

span.change-text:hover {
  color: blue;
  /* Меняем цвет текста */
}

span.change-text-blue {
  color: blue;
  /* Цвет текста */
  font-size: 1em;
  /* Размер текста */
  font-weight: bold;
  padding: 20px 0px;
  text-transform: uppercase;
  line-height: 1;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

span.change-text-blue:hover {
  color: wheat;
  /* Меняем цвет текста */
}
</style>

