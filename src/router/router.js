import Main from "@/pages/Main"
import Plans from "@/pages/Plans"
import WorkProgram from "@/pages/WorkProgram"
import {createRouter, createWebHashHistory} from  "vue-router"

const routes =[
    {
        path:'/',
        component: Main
    },
    {
        path: '/plans',
        component: Plans
    },
    {
        path: '/plans/work-program/:guid',
        component: WorkProgram
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;