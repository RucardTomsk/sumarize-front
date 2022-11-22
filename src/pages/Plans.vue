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
            <table class="table table-border table-hover">
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
                            <th colspan="4" style="text-align: center" @click="Wrap(sem)">
                                <i class="bi bi-caret-down-fill" v-if="UnwrapFlag[sem]"></i>
                                <i class="bi bi-caret-right-fill" v-else></i> 
                                {{sem}}
                            </th>
                        </tr>
                        <tr v-for:="plan in plans[sem]" v-show="UnwrapFlag[sem]">
                            <th scope="row table-active">{{ plan.code }}</th>
                            <td>{{ plan.name }}</td>
                            <td><button type="button" class="btn btn-outline-secondary btn-sm" @click="$router.push(`/plans/work-program/${plan.guid}`)">Программа</button></td>
                            <td><button type="button" class="btn btn-outline-secondary btn-sm">Аннотация</button></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="col"></div>

    </div>
</div>
    
</template>


<script>
import axios from "axios";
export default {
    data() {
        return {
            plans: [],
            param: [],
            key_plans: [],
            UnwrapFlag: {},
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
        }

    },
    beforeMount() {
        this.GetMasPosts();
    },

}
</script>