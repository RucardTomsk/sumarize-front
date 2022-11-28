<template>
    <MDBModal id="staticBackdropRegister" tabindex="-1" labelledby="staticBackdropLabelRegister"
        v-model="staticBackdropRegister" staticBackdropRegister>
        <MDBModalHeader>
            <MDBModalTitle id="staticBackdropLabelRegister"> Регистрация </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <div class="alert alert-danger" role="alert" v-if="dictError.flagError1">
                Email уже используется
                <button type="button" class="btn btn-outline-dark " style="margin-left: auto;"
                    @click="closeError('flagError1')">OK</button>
            </div>
            <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">ФИО</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Иванов Иван Иванович"
                    v-model="FIO">
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
            <button type="button" class="btn btn-outline-primary" @click="register"> Зарегистрироваться </button>
        </MDBModalFooter>
    </MDBModal>
    
    <MDBModal id="staticBackdropLogin" tabindex="-1" labelledby="staticBackdropLabelLogin" v-model="staticBackdropLogin"
        staticBackdropLogin>
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
            <span style="margin-right:auto">Ещё нету аккаунта? <span class="change-text"
                    @click="openRegister">Зарегистрироваться</span></span>
            <button type="button" class="btn btn-outline-primary" @click="login"> Войти </button>
        </MDBModalFooter>
    </MDBModal>
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
    setup() {
        const staticBackdropRegister = ref(false);
        const staticBackdropLogin = ref(false);
        return {
            staticBackdropRegister,
            staticBackdropLogin
        };
    },
    data() {
        return {
            Email: "",
            FIO: "",
            Password: "",
            UserFIO: "",
            token: undefined,
            dictError: { flagError1: false, flagError2: false },
            keyRender: 0,
        }
    },
    methods: {
        register() {
            axios.post('http://192.168.1.56:5050/auth-start/register', {
                "FIO": this.FIO,
                "Email": this.Email,
                "Password": this.Password
            }).then((response) => {
                console.log(response.status)
                this.staticBackdropRegister = false;
                this.staticBackdropLogin = true;
            }).catch((error) => {
                if (error.toJSON().status === 500) {
                    this.dictError.flagError1 = true;
                }
            })
        },
        openRegister() {
            this.staticBackdropLogin = false;
            this.staticBackdropRegister = true;
        },
        login() {
            axios.post('http://192.168.1.56:5050/auth-start/login', {
                "Email": this.Email,
                "Password": this.Password
            }).then((response) => {
                localStorage.token = response.data.token
                localStorage.refreshToken = response.data.refreshToken
                this.token = response.data.token
                this.staticBackdropLogin = false;
                this.getFIO();
            }).catch((error) => {
                if (error.toJSON().status === 500) {
                    this.dictError.flagError2 = true;
                }
            })
        },
        checkToken() {
            axios.post('http://192.168.1.56:5050/auth-start/check-datatime-token', {
                'refreshToken': localStorage.refreshToken
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then(response => {
                var res = response.data
                if (res.length === 2) {
                    localStorage.token = response.data.token
                    localStorage.refreshToken = response.data.refreshToken
                    this.token = response.data.token
                }
            }).catch((error) => {
                console.log(error.toJSON())
            })
        },
        closeError(key) {
            this.dictError[key] = false;
        },
        async getFIO() {
            await axios.get('http://192.168.1.56:5050/auth/get-user-fio', {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then(() => {
                axios.post("http://192.168.1.56:5050/role/useInvite",{
                    "guidInvite": this.$route.params.guidInvite
                },{
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    } 
                }).then(()=>{
                    localStorage.flag = 'newLogin';
                    this.$router.push({ path: '/', query: { flag: '+' } });
                }).catch(error=>{
                    console.log(error.toJSON())
                })
                
            }).catch(() => {
                this.staticBackdropLogin = true;
            })
        },
        exit() {
            localStorage.removeItem("token");
            this.token = undefined;
            this.$forceUpdate();
            this.keyRender += 1;
        }
    },
    beforeMount() {
        this.token = localStorage.token
        this.getFIO();
    },
}
</script>
<style>
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
</style>