<template>
    
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><span @click="$router.push('/')">Факультеты</span></li>
                <li class="breadcrumb-item active" aria-current="page">{{namef}}</li>
            </ol>
        </nav>
            <div class="row">
                <div class="col"></div>
                <div class="col-8">
                    <div class="large-12 medium-12 small-12 cell">
                        <label>File
                            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
                        </label>
                        <button v-on:click="submitFile()">Submit</button>
                        <div class="spinner-border spinner-border-sm text-secondary" role="status" v-if="flagLoads">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <table class="table table-border table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Directions</th>
                            <th scope="col">Name</th>
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
import axios from "axios";
export default {
    data() {
        return {
            programs: [],
            file:'',
            flagLoads: false,
            namef: "",
        }
    },
    methods: {
        async GetMasProgram() {
            try {
                const response = await axios.get('http://localhost:5050/program/get-mas-program/' + this.$route.params.guid);
                this.programs = response.data;
                console.log(response)
                const response_namef = await axios.get('http://localhost:5050/faculty/get-name/' + this.$route.params.guid);
                this.namef = response_namef.data;
            } catch (e) {
                alert("Ошибка", e)
            }
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        submitFile() {
            this.flagLoads = true;
            let formData = new FormData();
            formData.append('file', this.file);
            console.log(formData);
            axios.post('http://localhost:5050/plan/create-group-plans/' + this.$route.params.guid,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }
            }
            ).then(()=>{
                console.log('SUCCESS!!'); 
            }).catch(()=>{
                console.log('FAILURE!!');
            }).finally(()=>{
                this.flagLoads=false;
                window.location.reload();
            })
        },
    },
    beforeMount() {
        this.GetMasProgram();
    },

}
</script>