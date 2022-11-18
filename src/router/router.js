import Main from "@/pages/Main"
import Plans from "@/pages/Plans"
import WorkProgram from "@/pages/WorkProgram"
import Faculty from "@/pages/Faculty"
import Programs from "@/pages/Programs"
import GeneratePdf from "@/pages/GeneratePdf"
import {createRouter, createWebHashHistory} from  "vue-router"

const routes =[
    {
        path:'/',
        component: Main
    },
    {
        path: '/plans/:guid',
        component: Plans
    },
    {
        path: '/plans/work-program/:guid',
        component: WorkProgram
    },
    {
        path: '/faculties',
        component: Faculty
    },
    {
        path: '/program/:guid',
        component: Programs
    },
    {
        path: '/generate/:guid/:type',
        component: GeneratePdf
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;