import Plans from "@/pages/Plans"
import WorkProgram from "@/pages/WorkProgram"
import Faculty from "@/pages/Faculty"
import Programs from "@/pages/Programs"
import GeneratePdf from "@/pages/GeneratePdf"
import Annotation from "@/pages/Annotation"
import pagesInvite from "@/pages/pagesInvite"
import GeneratePdfAnnot from "@/pages/GeneratePdfAnnot"
import {createRouter, createWebHashHistory} from  "vue-router"

const routes =[
    {
        path:'/',
        component: Faculty
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
        path: '/program/:guid',
        component: Programs
    },
    {
        path: '/generate/:guid/:type',
        component: GeneratePdf
    },
    {
        path: '/plans/annotation/:guid',
        component: Annotation
    },
    {
        path: '/generateAnnot/:guid/:type',
        component: GeneratePdfAnnot
    },
    {
        path: '/invite/:guidInvite',
        component: pagesInvite
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;