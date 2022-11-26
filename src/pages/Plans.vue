<template>
<div class="container">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><span @click="$router.push('/')">Факультеты</span></li>
            <li class="breadcrumb-item"><span @click="$router.back()">{{param[1]}}</span></li>
            <li class="breadcrumb-item active" aria-current="page">{{param[0]}}</li>
        </ol>
    </nav>
    
    <div class="row">
        <div class="col"></div>
        <div class="col-9">
            <table class="table table-border table-hover ">
                <thead>
                    <tr>
                        <th scope="col">Код</th>
                        <th scope="col">Название</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for:="sem in key_plans">
                        <tr>
                            <th colspan="5" style="text-align: center" @click="Wrap(sem)">
                                <i class="bi bi-caret-down-fill" v-if="UnwrapFlag[sem]"></i>
                                <i class="bi bi-caret-right-fill" v-else></i> 
                                {{sem}}
                            </th>
                        </tr>
                        <tr v-for:="plan in plans[sem]" v-show="UnwrapFlag[sem]">
                            <th scope="row table-active">{{ plan.code }}</th>
                            <td>{{ plan.name }}</td>
                            <td><button type="button" class="btn btn-outline-secondary btn-sm " @click="$router.push(`/plans/work-program/${plan.guid}`)">Программа</button></td>
                            <td><button type="button" class="btn btn-outline-secondary btn-sm " @click="$router.push(`/plans/annotation/${plan.guid}`)">Аннотация</button></td>
                        </tr>
                        
                    </template>
                </tbody>
            </table>
        </div>
        <div class="col"><button v-if="admin || access" type="button" class=" btn btn-outline-secondary" @click="staticBackdrop = true">Пользователи</button></div>

    </div>
    <MDBModal id="staticBackdrop" tabindex="-1" labelledby="staticBackdropLabel" v-model="staticBackdrop" staticBackdrop>
        <MDBModalHeader>
            <MDBModalTitle id="staticBackdropLabel"> Список предметов </MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <div class="mb-3">
                <label for="formSearh" class="form-label">Поиск</label>
                <input type="text" class="form-control" id="formSearh" v-model="searchP">
            </div>
               
            <table class="table table-border table-hover ">
                <tbody>
                    <template v-for:="sem in key_plans">
                        <template v-for:="plan in plans[sem]">
                        <tr v-if="plan.code.toLowerCase().includes(searchP.toLowerCase()) || plan.name.toLowerCase().includes(searchP.toLowerCase()) || searchP ===''" @click="OpenUserWindow(plan.guid)">
                            <th scope="row table-active">{{ plan.code }}</th>
                            <td>{{ plan.name }}</td>
                        </tr>
                        </template>
                    </template>
                </tbody>
            </table>
    
        </MDBModalBody>
    </MDBModal>

    <MDBModal id="staticBackdropUser" tabindex="-1" labelledby="staticBackdropLabelUser" v-model="staticBackdropUser" staticBackdropUser>
        <MDBModalHeader>
            <MDBModalTitle id="staticBackdropLabelUser"> Список пользователей </MDBModalTitle>
            <button type="button" class="btn btn-outline-secondary" style="margin-left:auto" @click="staticBackdropUser = false, staticBackdropInvite=true"> Пригласить </button>
        </MDBModalHeader>
        <MDBModalBody>
            <div class="mb-3">
                <label for="formSearh" class="form-label">Поиск</label>
                <input type="text" class="form-control" id="formSearh" v-model="searchU">
            </div>
        
            <template v-for:="_user in mas_user">
                <div class="form-check" v-if="_user.fio.toLowerCase().includes(searchU.toLowerCase()) || searchU === ''">
                    <input v-model="mas_check_user[_user.guid]" class="form-check-input" type="checkbox" value=""
                        id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{_user.fio}}
                    </label>
                </div>
            </template>
        
        </MDBModalBody>
        <MDBModalFooter>
            <button style="margin-right:auto" type="button" class="btn btn-outline-secondary" @click="staticBackdrop = true, staticBackdropUser=false"> Назад </button>
            <button type="button" class="btn btn-outline-primary" @click="IssueAccess(plan_guid)"> Выдать права </button>
        </MDBModalFooter>
    </MDBModal>

    <MDBModal id="staticBackdropInvite" tabindex="-1" labelledby="staticBackdropLabelInvite" v-model="staticBackdropInvite"
        staticBackdropInvite>
        <MDBModalHeader>
            <MDBModalTitle id="staticBackdropLabelInvite"> Приглашение </MDBModalTitle>
           
        </MDBModalHeader>
        <MDBModalBody>
            <div class="mb-3 row">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" v-model="emailInvite">
            </div>
        </MDBModalBody>
        <MDBModalFooter>
            <div style="margin-right:auto">
                <button type="button" class="btn btn-outline-secondary"
                    @click="staticBackdropUser = true, staticBackdropInvite=false"> Назад </button>
                <button type="button" class="m-2 btn btn-outline-danger" @click="staticBackdropInvite=false"> Закрыть </button>
            </div>
            <button type="button" class="btn btn-outline-success" @click="createInvite(plan_guid,emailInvite)"> Отправить </button>
        </MDBModalFooter>
    </MDBModal>
</div>
    
</template>


<script>
import axios from "axios";
import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';
export default {
    components: {
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
    },
    setup() {
        const staticBackdrop = ref(false);
        const staticBackdropUser = ref(false);
        const staticBackdropInvite = ref(false);
        return {
            staticBackdrop,
            staticBackdropUser,
            staticBackdropInvite
        };
    },
    data() {
        return {
            plans: [],
            param: [],
            key_plans: [],
            UnwrapFlag: {},
            admin: false,
            access: false,
            searchP: "",
            mas_user: [],
            mas_check_user: {},
            searchU:"",
            plan_guid: "",
            invaitLink: "",
            emailInvite: "",
        }
    },
    methods: {
        async GetMasPosts() {
            try {
                const response = await axios.get('http://192.168.1.56:5050/plan/get-mas-plan/' + this.$route.params.guid);
                this.plans = response.data;
                const response_2 = await axios.get('http://192.168.1.56:5050/program/get-name-p-and-f/' + this.$route.params.guid);
                console.log(response_2.data)
                this.param = response_2.data;
                this.key_plans = Object.keys(this.plans)
                for (var key in this.key_plans){
                    this.UnwrapFlag[key] = false
                }

                console.log(response)
            } catch (e) {
                alert("Ошибка", e)
            }
        },
        Wrap(key) {
            if (this.UnwrapFlag[key] === true){
                this.UnwrapFlag[key] = false;
            }else{
                this.UnwrapFlag[key] = true;
            }
        },
        async ChekAdmin() {
            await axios.post('http://192.168.1.56:5050/role/check-admin', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
                .then((response) => {
                    this.admin = true;
                }).catch((error) => {
                    console.log(error.toJSON())
                })
        },
        async ChekAccess() {
            await axios.post('http://192.168.1.56:5050/role/check-access', {
                'GuidNode': this.params[2]
            }, {
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
        async IssueAccess(guid_node) {
            this.staticBackdropUser = false;
            console.log(this.mas_check_user)
            for (var user in this.mas_user) {
                console.log(user)
                if (this.mas_check_user[this.mas_user[user].guid] === true) {
                    await axios.post('http://192.168.1.56:5050/role/issue-access', {
                        "guidUser": this.mas_user[user].guid,
                        "guidNode": guid_node
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.token}`
                        }
                    }).then(() => {
                        console.log("OK");
                    }).catch(error => {
                        console.log(error.toJSON());
                    });
                }
            }
            alert("Права выданы!");
        },
        GetMasUser(guid_node) {
            axios.post("http://192.168.1.56:5050/auth/get-user-not-access/" + guid_node, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }).then((response) => {
                this.mas_user = response.data;
                for (var user in this.mas_user) {
                    this.mas_check_user[user.guid] = false;
                }
            }).catch((error) => {
                console.log(error.toJSON())
            })
        },
        OpenUserWindow(guid_node){
            this.staticBackdrop = false;
            this.GetMasUser(guid_node);
            this.plan_guid = guid_node;
            this.staticBackdropUser = true;
        },
        createInvite(guid_plan,email){
            this.invaitLink = "http://localhost:8080/#/invite/";
            axios.post("http://192.168.1.56:5050/role/createInvite",{
                "GuidNode": guid_plan,
                "Email": email
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                } 
            }).then(response=>{
                alert("Приглашение отпарвлено!")
            }).catch(error=>{
                console.log(error.toJSON())
            })
        }
    },
    beforeMount() {
        this.GetMasPosts();
        this.ChekAdmin();
        this.ChekAccess();
    },

}
</script>