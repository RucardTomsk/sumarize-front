<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Факультеты</li>
            </ol>
        </nav>
        <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <table class="table table-border table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Название</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for:="facultys in facultys">
                            <td @click="$router.push(`/program/${facultys.guid}`)"><img :src="facultys.icon" style="width: 20px; height: 25px;"/> {{ facultys.name }}</td>
                        </tr>
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
    data(){
        return{
            facultys:[],
            prevRoute: null,
        }
    },
    methods:{
        async GetMasFaculty(){
            const response = await axios.get('http://192.168.1.56:5050/faculty/get-mas-faculty')
            this.facultys = response.data;
        }
    },
    beforeMount(){
        this.GetMasFaculty();
    }
}
</script>