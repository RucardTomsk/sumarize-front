<template>
    
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span @click="$router.push('/')">Факультеты</span></li>
                <li class="breadcrumb-item active" aria-current="page">{{namef}}</li>
            </ol>
        </nav>
        <div class="alert alert-danger" role="alert" v-if="alertf1" style="display: flex;">
                Файл не загружен
            <button type="button" class="btn btn-outline-dark " style="margin-left: auto;" @click="exitalert(1)">OK</button>
        </div>
        <div class="alert alert-danger" role="alert" v-if="alertf2">
            Файл сломан
            <button type="button" class="btn btn-outline-dark" @click="exitalert(2)">OK</button>
        </div>
            <div class="row" v-if="admin || access">
                <div class="col-2"></div>
                <div class="col-6">
                    <div class="large-12 medium-12 small-12 cell">
                        <label>
                            <input type="file" id="file" ref="file" accept=".xlsx" v-on:change="handleFileUpload()" />
                        </label>
                        <button v-on:click="submitFile()">Создать </button>
                        
                        <div class="spinner-border spinner-border-sm text-secondary" role="status" v-if="flagLoads">
                            
                        </div>
                    </div>
                </div>
                
                <div class="col" v-if="admin">
                    <button type="button" class="btn btn-outline-secondary" @click="GetMasUser">Управление Деканатом</button>
                
                </div>
                <div class="col-2"></div>

            </div>

            <MDBModal id="staticBackdrop" tabindex="-1" labelledby="staticBackdropLabel"
                v-model="staticBackdrop" staticBackdrop>
                <MDBModalHeader>
                    <MDBModalTitle id="staticBackdropLabel"> Права на факультет </MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody>
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label">Поиск</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2"
                            v-model="search">
                    </div>

                    <div v-for:="_user in mas_user">
                        <p>_user.FIO</p>
                    </div>

                </MDBModalBody>
                <MDBModalFooter>
                    <button type="button" class="btn btn-outline-primary" @click="IssueAccess"> Выдать права </button>
                </MDBModalFooter>
            </MDBModal>


        <p></p>
        <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <table class="table table-border table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Подразделение</th>
                            <th scope="col">Название</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for:="program in programs">
                            <th scope="row table-active">{{ program.directions }}</th>
                            <td>{{ program.name }}</td>
                            <td><button type="button" class="btn btn-outline-secondary btn-sm"
                                @click="$router.push(`/plans/${program.guid}`)">Рабочие программы</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col"></div>

        </div>
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
    components:{
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
    },
    setup(){
        const staticBackdrop = ref(false);
        return{
            staticBackdrop
        };
    },
    data() {
        return {
            programs: [],
            file:'',
            flagLoads: false,
            namef: "",
            alertf1: false,
            alertf2: false,
            admin: false,
            access: false,
            search: "",
            mas_user: {},
        }
    },
    methods: {
        async GetMasProgram() {
            try {
                const response = await axios.get('http://192.168.1.56:5050/program/get-mas-program/' + this.$route.params.guid);
                this.programs = response.data;
                console.log(response)
                const response_namef = await axios.get('http://192.168.1.56:5050/faculty/get-name/' + this.$route.params.guid);
                this.namef = response_namef.data;
            } catch (e) {
                alert("Ошибка", e)
            }
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        submitFile() {
            if(this.file ===''){
                this.alertf1 = true;
                return
            }
            this.flagLoads = true;
            let formData = new FormData();
            formData.append('file', this.file);
            console.log(formData);
            axios.post('http://192.168.1.56:5050/plan/create-group-plans/' + this.$route.params.guid,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }
            }
            ).then(()=>{
                console.log('SUCCESS!!'); 
            }).catch(()=>{
                this.alertf2 = true;
                return
            })
            this.flagLoads = false;
            if (this.alertf1 === false && this.alertf2 === false) {
                window.location.reload();
            }
        },
        exitalert(key){
            if (key === 1){
                this.alertf1 = false;
            }else{
                if (key === 2){
                    this.alertf2 = false;
                }
            }
        },
        async ChekAdmin(){
            await axios.post('http://192.168.1.56:5050/role/check-admin',{},{
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            .then((response)=>{
                this.admin = true;
            }).catch((error)=>{
                console.log(error.toJSON())
            })
        },
        async ChekAccess() {
            await axios.post('http://192.168.1.56:5050/role/check-access',{
                'guid_node': this.$route.params.guid
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
                .then((response) => {
                    this.access = true;
                }).catch((error) => {
                    console.log(error.toJSON())
                })
        },
        async IssueAccess(){
            this.staticBackdrop = false;

        },
        GetMasUser(){
            axios.post("http://192.168.1.56:5050/auth/get-user-not-access",{
                'guid_node': this.$route.params.guid},{
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((response)=>{
                this.mas_user = response.data;
            }).catch((error)=>{
                console.log(error.toJSON())
            })

            this.staticBackdrop = true;
        }
    },
    beforeMount() {
        this.GetMasProgram();
        this.ChekAdmin();
        this.ChekAccess();
    },
    

}
</script>