<template>
    <div class="container">
        <p class="text-center">Министерство науки и высшего образования Российской Федерации</p>
        <p class="text-center" style="margin-top: -20px">НАЦИОНАЛЬНЫЙ ИССЛЕДОВАТЕЛЬСКИЙ</p>
        <p class="text-center" style="margin-top: -20px">ТОМСКИЙ ГОСУДАРСТВЕННЫЙ УНИВЕРСИТЕТ (НИ ТГУ)</p>
        <p class="text-center">{{ plan.nameFaculty }}</p>

        <div class="row">
            <div class="col-8"></div>
            <div class="col-3" style="border: 1px solid black">
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
            <div class="col-8"></div>
            <div class="col-3">
                <p class="text-left">СОГЛАСОВАНО:</p>
                <p class="text-left" style="margin-top: -20px">Руководитель ОП</p>
                <p class="text-left" style="margin-top: -15px">____________ О.А.Змеев</p>
                <p class="text-left" style="margin-top: -20px">Председатель УМК</p>
                <p class="text-left" style="margin-top: -15px">____________И.О. Фамилия</p>
            </div>
            <div class="col"></div>
        </div>

        <p class="text-center">Томск – {{ plan.year }}</p>
        
    </div>
    <div class="container">
        <p class="text-left"><b>1. Цель и планируемые результаты освоения дисциплины (модуля)</b></p>
        <p class="text-left" style="margin-top: -20px">Целью освоения дисциплины является формирование следующих компетенций:</p>
        <p class="text-left" style="margin-top: -10px">{{ plan.purposeMastering }}</p>
        <p class="text-left" >Результатами освоения дисциплины являются следующие индикаторы достижения компетенций:</p>
        <p class="text-left" style="margin-top: -10px">{{ plan.resultsMastering }}</p>
    </div>
    <div class="container">
        <p class="text-left"><b>2. Задачи освоения дисциплины</b></p>
        <div v-if="editFlag.developmentMastering">
        <ckeditor 
            :editor="editor" 
            v-model="planHTML.developmentMastering"  
            :config="editorConfig"
        />
        <button type="button" class="btn btn-outline-secondary mt-2" @click="SaveFieldPlan('developmentMastering', planHTML.developmentMastering)">Save</button>
        <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.developmentMastering }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('developmentMastering')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>3. Место дисциплины (модуля) в структуре образовательной программы</b></p>
        <p class="text-left" style="margin-top: -20px">{{ plan.placeDiscipline }}</p>
    </div>

    <div class="container">
        <p class="text-left"><b>4. Семестр(ы) освоения и форма(ы) промежуточной аттестации по дисциплине</b></p>
        <p class="text-left" style="margin-top: -20px">{{ plan.semesterMastering }}</p>
    </div>

    <div class="container">
        <p class="text-left"><b>5. Входные требования для освоения дисциплины</b></p>
        <div v-if="editFlag.entranceRequirements">
            <ckeditor :editor="editor" v-model="planHTML.entranceRequirements" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('entranceRequirements', planHTML.entranceRequirements)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.entranceRequirements }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('entranceRequirements')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>6. Язык реализации</b></p>
        <p class="text-left" style="margin-top: -20px">{{ plan.implementationLanguage }}</p>
    </div>

    <div class="container">
        <p class="text-left"><b>7. Объем дисциплины (модуля)</b></p>
        <p class="text-left" style="margin-top: -20px">{{ plan.scopeDiscipline }}</p>
    </div>

    <div class="container">
        <p class="text-left"><b>8. Содержание дисциплины (модуля), структурированное по темам</b></p>
        <div v-if="editFlag.contentDiscipline">
            <ckeditor :editor="editor" v-model="planHTML.contentDiscipline" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('contentDiscipline', planHTML.contentDiscipline)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.contentDiscipline }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('contentDiscipline')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>9. Текущий контроль по дисциплине</b></p>
        <div v-if="editFlag.currentControl">
            <ckeditor :editor="editor" v-model="planHTML.currentControl" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('currentControl', planHTML.currentControl)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.currentControl }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('currentControl')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>10. Порядок проведения и критерии оценивания промежуточной аттестации</b></p>
        <div v-if="editFlag.evaluationProcedure">
            <ckeditor :editor="editor" v-model="planHTML.evaluationProcedure" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('evaluationProcedure', planHTML.evaluationProcedure)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.evaluationProcedure }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('evaluationProcedure')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>11. Учебно-методическое обеспечение</b></p>
        <div v-if="editFlag.methodologicalSupport">
            <ckeditor :editor="editor" v-model="planHTML.methodologicalSupport" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('methodologicalSupport', planHTML.methodologicalSupport)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.methodologicalSupport }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('methodologicalSupport')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>12. Перечень учебной литературы и ресурсов сети Интернет</b></p>
        <div v-if="editFlag.references">
            <ckeditor :editor="editor" v-model="planHTML.references" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('references', planHTML.references)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.references }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('references')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>13. Перечень информационных технологий</b></p>
        <div v-if="editFlag.listInformationTechnologies">
            <ckeditor :editor="editor" v-model="planHTML.listInformationTechnologies" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('listInformationTechnologies', planHTML.listInformationTechnologies)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.listInformationTechnologies }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2" @click="EditFieldPlan('listInformationTechnologies')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>14. Материально-техническое обеспечение</b></p>
        <div v-if="editFlag.materialSupport">
            <ckeditor :editor="editor" v-model="planHTML.materialSupport" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('materialSupport', planHTML.materialSupport)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.materialSupport }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('materialSupport')">Edit</button>
            <p></p>
        </div>
    </div>

    <div class="container">
        <p class="text-left"><b>15. Информация о разработчиках</b></p>
        <div v-if="editFlag.informationDevelopers">
            <ckeditor :editor="editor" v-model="planHTML.informationDevelopers" :config="editorConfig" />
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="SaveFieldPlan('informationDevelopers', planHTML.informationDevelopers)">Save</button>
            <p></p>
        </div>
        <div v-else>
            <p class="text-left">{{ plan.informationDevelopers }}</p>
            <button type="button" class="btn btn-outline-secondary mt-2"
                @click="EditFieldPlan('informationDevelopers')">Edit</button>
            <p></p>
        </div>
    </div>
</template>

<script lang="js">
import axios from "axios";

import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
//import InlineEditor from '@ckeditor/ckeditor5-editor-inline'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';

const { convert } = require('html-to-text');

export default {
    components: {
        ckeditor: CKEditor.component
    },
    data(){
        return{
            plan: {},
            planHTML: {},
            editFlag: {},
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
                language: 'ru',
                toolbar:{
                    items:[
                        'numberedList', 'bulletedList',
                        '|',
                        'outdent', 'indent',
                        '|',
                        'undo', 'redo'
                    ]
                },
            }
        }
    },
    methods: {
        async GetWorkProgram() {
            try {
                const response = await axios.get("http://localhost:5050/plan/get-work-program/" + this.$route.params.guid);
                this.plan = response.data;
                for(var key in this.plan){
                    this.editFlag[key] = false;
                }
                const response_html = await axios.get("http://localhost:5050/plan/get-work-program/" + this.$route.params.guid+'_html');
                this.planHTML = response_html.data;
            } catch (e) {
                alert(e)
            }
        },
        ConvertHtmlToText(htmlText){
            const text = convert(htmlText, {selectors: [{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }]})
            return text;
        },
        SaveFieldPlan(key,HTMLtext){
            var text = this.ConvertHtmlToText(HTMLtext);
            var guid = this.$route.params.guid;
            axios.post("http://localhost:5050/plan/save-plan/" + guid + "_html/" + key, {
                "Text": HTMLtext
            });
            axios.post("http://localhost:5050/plan/save-plan/" + guid +"/"+key,{
                "Text":text
            }).then(()=>{
                this.plan[key] = text;
                this.planHTML[key] = HTMLtext;
                this.editFlag[key] = false;
            });
                
        },
        EditFieldPlan(key){
            this.editFlag[key] = true;
        },
        
    },
    beforeMount() {
        this.GetWorkProgram();
    },
}
</script>

<style>
p{
        font-family: 'Times New Roman';
        font-size: 12;
        white-space: pre-wrap;
    }
</style>