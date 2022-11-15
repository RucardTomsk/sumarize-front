<template>
<div class="container">
    <div class="row">
        <div class="col"></div>
        <div class="col-8">
            <table class="table table-border table-hover">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for:="plan in plans">
                        <th scope="row table-active">{{ plan.code }}</th>
                        <td>{{ plan.name }}</td>
                        <td><button type="button" class="btn btn-outline-success" @click="$router.push(`/plans/work-program/${plan.guid}`)">Программа</button></td>
                        <td><button type="button" class="btn btn-outline-success">Аннотация</button></td>
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
            plans: [],
        }
    },
    methods: {
        async GetMasPosts() {
            try {
                const response = await axios.get('http://localhost:5050/plan/get-mas-plan/34750891-8593-4bfc-837a-e73fb4822800');
                this.plans = response.data;
                console.log(response)
            } catch (e) {
                alert("Ошибка", e)
            }
        },
    },
    beforeMount() {
        this.GetMasPosts();
    },

}
</script>