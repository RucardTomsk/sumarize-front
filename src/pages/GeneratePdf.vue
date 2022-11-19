<template>
    
    <div id="doc">
        <p class="text-center" style="font-family: 'Times New Roman';
    font-size: 12;
    white-space: pre-wrap;">Министерство науки и высшего образования Российской Федерации</p>
        <p class="text-center" style="margin-top: -20px">НАЦИОНАЛЬНЫЙ ИССЛЕДОВАТЕЛЬСКИЙ</p>
        <p class="text-center" style="margin-top: -20px">ТОМСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ (НИ ТГУ)</p>
        <p class="text-center">{{ plan.nameFaculty }}</p>
        
        <div class="row">
            <div class="col-7"></div>
            <div class="col-4" style="border: 1px solid black">
                <p class="text-left">УТВЕРЖДАЮ:</p>
                <p class="text-left" style="margin-top: -20px">Исполнительный директор</p>
                <p class="text-left" style="margin-top: -15px">________________Т.С.Кетова</p>
                <p class="text-left" style="margin-top: -10px">« ___ » _______________ {{ plan.year }} г.</p>
            </div>
            <div class="col"></div>
        </div>
        
        <p class="text-center">Рабочая программа дисциплины</p>
        <p class="text-center" style="margin-top: -10px"><b>{{ plan.name }}</b></p>
        
        <p class="text-center">по направлению подготовки</p>
        <p class="text-center" style="margin-top: -10px"><b>«{{ plan.directionTraining }}»</b></p>
        
        <p class="text-center">Направленность (профиль) подготовки / специализация:</p>
        <p class="text-center" style="margin-top: -10px"><b>{{ plan.trainingProfile }}</b></p>
        
        <p class="text-center">Форма обучения</p>
        <p class="text-center" style="margin-top: -10px"><b>{{ plan.formTraining }}</b></p>
        
        <p class="text-center">Квалификация</p>
        <p class="text-center" style="margin-top: -10px"><b>{{ plan.qualification }}</b></p>
        
        <p class="text-center">Год приема</p>
        <p class="text-center" style="margin-top: -10px"><b>{{ plan.year }}</b></p>
        
        <p class="text-center">Код дисциплины в учебном плане: <b>{{ plan.code }}</b></p>
        
        <div class="row">
            <div class="col-7"></div>
            <div class="col-4">
                <p class="text-left">СОГЛАСОВАНО:</p>
                <p class="text-left" style="margin-top: -20px">Руководитель ОП</p>
                <p class="text-left" style="margin-top: -15px">____________ О.А.Змеев</p>
                <p class="text-left" style="margin-top: -20px">Председатель УМК</p>
                <p class="text-left" style="margin-top: -15px">____________И.О. Фамилия</p>
            </div>
            <div class="col"></div>
        </div>
        
        <p class="text-center">Томск – {{ plan.year }}</p>
        <div id="pBreak"></div>
        <div class="container">
            <p class="text-left">
                <b>1. Цель и планируемые результаты освоения дисциплины (модуля)</b>
            </p>
            <p class="text-left" style="margin-top: -20px">Целью освоения дисциплины является формирование следующих компетенций:
            </p>
            <div v-for="pm in plan.purposeMastering">
                <span class="text-left" style="margin-top: -10px">{{ pm }}</span>
                <br>
            </div>
            <p class="text-left">Результатами освоения дисциплины являются следующие индикаторы достижения компетенций:</p>
            <div v-for="pr in plan.resultsMastering">
                <span class="text-left" style="margin-top: -10px">{{ pr }}</span>
                <br>
            </div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>2. Задачи освоения дисциплины</b>
            </p>
            <div v-html=plan.developmentMastering></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>3. Место дисциплины (модуля) в структуре образовательной программы</b>
            </p>
            <p class="text-left" style="margin-top: -20px">{{ plan.placeDiscipline }}</p>
        </div>

        <div class="container">
            <p class="text-left">
                <b>4. Семестр(ы) освоения и форма(ы) промежуточной аттестации по дисциплине</b>
            </p>
            <p class="text-left" style="margin-top: -20px">{{ plan.semesterMastering }}</p>
        </div>

        <div class="container">
            <p class="text-left">
                <b>5. Входные требования для освоения дисциплины </b>
            </p>
            <div v-html=plan.entranceRequirements></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>6. Язык реализации</b>
            </p>
            <p class="text-left" style="margin-top: -20px">{{ plan.implementationLanguage }}</p>
        </div>

        <div class="container">
            <p class="text-left">
                <b>7. Объем дисциплины (модуля)</b>
            </p>
            <p class="text-left" style="margin-top: -20px">{{ plan.scopeDiscipline }}</p>
        </div>

        <div class="container">
            <p class="text-left">
                <b>8. Содержание дисциплины (модуля), структурированное по темам</b>
            </p>
            <div v-html=plan.contentDiscipline></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>9. Текущий контроль по дисциплине</b>
            </p>
            <div v-html=plan.currentControl></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>10. Порядок проведения и критерии оценивания промежуточной аттестации</b>
            </p>
            <div v-html=plan.evaluationProcedure></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>11. Учебно-методическое обеспечение</b>
            </p>
            <div v-html=plan.methodologicalSupport></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>12. Перечень учебной литературы и ресурсов сети Интернет</b>
            </p>
            <div v-html=plan.references></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>13. Перечень информационных технологий</b>
            </p>
            <div v-html=plan.listInformationTechnologies></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>14. Материально-техническое обеспечение</b>
            </p>
            <div v-html=plan.materialSupport></div>
        </div>

        <div class="container">
            <p class="text-left">
                <b>15. Информация о разработчиках</b>
            </p>
            <div v-html=plan.informationDevelopers></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import html2pdf from 'html2pdf.js'
import { asBlob} from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'

export default {
    name: 'GeneratePdf',
    data() {
        return {
            plan: {},
            planHTML: {},
        }
    },
    methods: {
        async GetWorkProgram() {
            try {
                const response = await axios.get("http://localhost:5050/plan/get-work-program/" + this.$route.params.guid);
                this.plan = response.data;
                this.plan['purposeMastering'] = this.plan['purposeMastering'].split('\n');
                this.plan['resultsMastering'] = this.plan['resultsMastering'].split('\n');
                const response_html = await axios.get("http://localhost:5050/plan/get-work-program/" + this.$route.params.guid + '_html');
                this.planHTML = response_html.data;
            } catch(e){
                alert(e);
            }
        },
        exportToPDF() {
            var element = document.getElementById('doc');
            html2pdf().set({
                margin: 0.5,
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak: { mode: 'avoid-all', before: '#pBreak' }
            }).from(element).save();
        },
        exportToWord(){
            var element = document.documentElement.outerHTML
            console.log(element)
            asBlob(element).then(data=>{
                saveAs(data, 'test.docx');
            });
            
        },
    },
    beforeMount(){

        this.GetWorkProgram();
    },
    updated(){
        if (this.$route.params.type === 'pdf'){
            this.exportToPDF();
        }
        if (this.$route.params.type === 'word') {
            this.exportToWord();
        }
        this.$router.back()
        //this.$router.push(`/plans/work-program/${this.$route.params.guid}`)
    },
}
</script>

<style scoped>
p {
    font-family: 'Times New Roman';
    font-size: 12;
    white-space: pre-wrap;
}
span {
    font-family: 'Times New Roman';
    font-size: 12;
    white-space: pre-wrap;
}
</style>