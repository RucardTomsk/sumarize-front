<template>
    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.title"
                @click="RollUp('title')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('title')"></i>
            <b>Титульный лист</b>
        </p>
        <div v-if="UnwrapFlag['title']">
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
    </div>
    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.purposeMastering" @click="RollUp('purposeMastering')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('purposeMastering')"></i>
            <b>1. Цель и планируемые результаты освоения дисциплины (модуля)</b>
        </p>
        <div v-if="UnwrapFlag['purposeMastering']">
        <p class="text-left" style="margin-top: -20px">Целью освоения дисциплины является формирование следующих компетенций:</p>
        <p class="text-left" style="margin-top: -10px">{{ plan.purposeMastering }}</p>
        <p class="text-left" >Результатами освоения дисциплины являются следующие индикаторы достижения компетенций:</p>
        <p class="text-left" style="margin-top: -10px">{{ plan.resultsMastering }}</p>
        </div>
    </div>
    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.developmentMastering" @click="RollUp('developmentMastering')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('developmentMastering')"></i>
            <b>2. Задачи освоения дисциплины <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['developmentMastering']" @dblclick="EditFieldPlan('developmentMastering')">
            <div v-if="editFlag.developmentMastering === false">
                <p class="text-left" v-if="plan.developmentMastering === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.developmentMastering">
                <ckeditor :editor="editor" v-model="planHTML.developmentMastering" :config="allConfig.developmentMastering"/>
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.developmentMastering }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.placeDiscipline" @click="RollUp('placeDiscipline')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('placeDiscipline')"></i>
            <b>3. Место дисциплины (модуля) в структуре образовательной программы</b>
        </p>
        <div v-if="UnwrapFlag['placeDiscipline']">
            <p class="text-left" style="margin-top: -20px">{{ plan.placeDiscipline }}</p>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.semesterMastering" @click="RollUp('semesterMastering')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('semesterMastering')"></i>
            <b>4. Семестр(ы) освоения и форма(ы) промежуточной аттестации по дисциплине</b>
        </p>
        <div v-if="UnwrapFlag['semesterMastering']">
            <p class="text-left" style="margin-top: -20px">{{ plan.semesterMastering }}</p>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.entranceRequirements" @click="RollUp('entranceRequirements')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('entranceRequirements')"></i>
            <b>5. Входные требования для освоения дисциплины <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['entranceRequirements']" @dblclick="EditFieldPlan('entranceRequirements')">
            <div v-if="editFlag.entranceRequirements === false">
                <p class="text-left" v-if="plan.entranceRequirements === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.entranceRequirements">
                <ckeditor :editor="editor" v-model="planHTML.entranceRequirements" :config="allConfig.entranceRequirements" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.entranceRequirements }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.implementationLanguage" @click="RollUp('implementationLanguage')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('implementationLanguage')"></i>
            <b>6. Язык реализации</b>
        </p>
        <div v-if="UnwrapFlag['implementationLanguage']">
            <p class="text-left" style="margin-top: -20px">{{ plan.implementationLanguage }}</p>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.scopeDiscipline" @click="RollUp('scopeDiscipline')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('scopeDiscipline')"></i>
            <b>7. Объем дисциплины (модуля)</b>
        </p>
        <div v-if="UnwrapFlag['scopeDiscipline']">
            <p class="text-left" style="margin-top: -20px">{{ plan.scopeDiscipline }}</p>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.contentDiscipline" @click="RollUp('contentDiscipline')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('contentDiscipline')"></i>
            <b>8. Содержание дисциплины (модуля), структурированное по темам <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['contentDiscipline']" @dblclick="EditFieldPlan('contentDiscipline')">
            <div v-if="editFlag.contentDiscipline === false">
                <p class="text-left" v-if="plan.contentDiscipline === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.contentDiscipline">
                <ckeditor :editor="editor" v-model="planHTML.contentDiscipline" :config="allConfig.contentDiscipline" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.contentDiscipline }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.currentControl" @click="RollUp('currentControl')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('currentControl')"></i>
            <b>9. Текущий контроль по дисциплине <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['currentControl']" @dblclick="EditFieldPlan('currentControl')">
            <div v-if="editFlag.currentControl === false">
                <p class="text-left" v-if="plan.currentControl === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.currentControl">
                <ckeditor :editor="editor" v-model="planHTML.currentControl" :config="allConfig.currentControl" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.currentControl }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.evaluationProcedure" @click="RollUp('evaluationProcedure')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('evaluationProcedure')"></i>
            <b>10. Порядок проведения и критерии оценивания промежуточной аттестации <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['evaluationProcedure']" @dblclick="EditFieldPlan('evaluationProcedure')">
            <div v-if="editFlag.evaluationProcedure === false">
                <p class="text-left" v-if="plan.evaluationProcedure === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.evaluationProcedure">
                <ckeditor :editor="editor" v-model="planHTML.evaluationProcedure" :config="allConfig.evaluationProcedure" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.evaluationProcedure }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.methodologicalSupport" @click="RollUp('methodologicalSupport')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('methodologicalSupport')"></i>
            <b>11. Учебно-методическое обеспечение <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['methodologicalSupport']" @dblclick="EditFieldPlan('methodologicalSupport')">
            <div v-if="editFlag.methodologicalSupport === false">
                <p class="text-left" v-if="plan.methodologicalSupport === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.methodologicalSupport">
                <ckeditor :editor="editor" v-model="planHTML.methodologicalSupport" :config="allConfig.methodologicalSupport" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.methodologicalSupport }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.references" @click="RollUp('references')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('references')"></i>
            <b>12. Перечень учебной литературы и ресурсов сети Интернет <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['references']" @dblclick="EditFieldPlan('references')">
            <div v-if="editFlag.references === false">
                <p class="text-left" v-if="plan.references === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.references">
                <ckeditor :editor="editor" v-model="planHTML.references" :config="allConfig.references" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.references }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.listInformationTechnologies" @click="RollUp('listInformationTechnologies')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('listInformationTechnologies')"></i>
            <b>13. Перечень информационных технологий <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['listInformationTechnologies']" @dblclick="EditFieldPlan('listInformationTechnologies')">
            <div v-if="editFlag.listInformationTechnologies === false">
                <p class="text-left" v-if="plan.listInformationTechnologies === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.listInformationTechnologies">
                <ckeditor :editor="editor" v-model="planHTML.listInformationTechnologies" :config="allConfig.listInformationTechnologies" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.listInformationTechnologies }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.materialSupport"
                @click="RollUp('materialSupport')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('materialSupport')"></i>
            <b>14. Материально-техническое обеспечение <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['materialSupport']" @dblclick="EditFieldPlan('materialSupport')">
            <div v-if="editFlag.materialSupport === false">
                <p class="text-left" v-if="plan.materialSupport === ''">Здесь пусто!</p>
            </div>
            <div v-if="editFlag.materialSupport">
                <ckeditor :editor="editor" v-model="planHTML.materialSupport" :config="allConfig.materialSupport" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.materialSupport }}</p>
                <p></p>
            </div>
        </div>
    </div>

    <div class="container">
        <p class="text-left">
            <i class="bi bi-caret-down-fill" v-if="UnwrapFlag.informationDevelopers" @click="RollUp('informationDevelopers')"></i>
            <i class="bi bi-caret-right-fill" v-else @click="Unwrap('informationDevelopers')"></i>
            <b>15. Информация о разработчиках <span class="badge bg-secondary">Редактируемое</span></b>
        </p>
        <div v-if="UnwrapFlag['informationDevelopers']" @dblclick="EditFieldPlan('informationDevelopers')">
            <div v-if="editFlag.informationDevelopers === false"><p class="text-left" v-if="plan.informationDevelopers === ''">Здесь пусто!</p></div>
            <div v-if="editFlag.informationDevelopers">
                <ckeditor :editor="editor" v-model="planHTML.informationDevelopers" :config="allConfig.informationDevelopers" />
                <p></p>
            </div>
            <div v-else>
                <p class="text-left">{{ plan.informationDevelopers }}</p>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import axios from "axios";

import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { Vue } from "vue";

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 9) {
        e.preventDefault();
    }
});

class TabPlagin extends Plugin{
    init(){
        const editor = this.editor;
        editor.keystrokes.set('Tab',(data)=>{
            editor.model.change(writer => {
                editor.model.insertContent(
                    writer.createText("    ")
                );
            });
        })
    }
}

class SaveButtonPlugin extends Plugin {
    init() {
        const editor = this.editor;

        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add('savebutton', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set({
                label: 'Save',
                withText: true,
                tooltip: true,
            });

            button.on('execute', () => {
                window.SaveF(editor.config.get("planKey"),editor.getData());
            });

            return button;
        });
    }
};

const { convert } = require('html-to-text');

export default {
    name:'WorkProgram',
    components:{
        ckeditor: CKEditor.component,
    },
    data(){
        return{
            plan: {},
            planHTML: {},
            editFlag: {},
            UnwrapFlag:{},
            editor: ClassicEditor,
            allConfig:{},
        }
    },
    methods: {
        async GetWorkProgram() {
            try {
                const response = await axios.get("http://localhost:5050/plan/get-work-program/" + this.$route.params.guid);
                this.plan = response.data;
                for(var key in this.plan){
                    this.editFlag[key] = false;
                    this.UnwrapFlag[key] = false;
                    this.allConfig[key] = {
                        plugins: [
                            EssentialsPlugin,
                            BoldPlugin,
                            ItalicPlugin,
                            LinkPlugin,
                            ParagraphPlugin,
                            SaveButtonPlugin,
                            TabPlagin,
                        ],
                            // The configuration of the editor.
                            language: 'ru',
                                toolbar: {
                            items: [
                                'bold',
                                'italic',
                                'link',
                                'undo',
                                'redo',
                                'savebutton',
                            ]
                        },
                        planKey: key,
                        saveFynction: this.SaveFieldPlan(),
                    }
                }
                this.UnwrapFlag['title'] = false;
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
        Unwrap(key){
            this.UnwrapFlag[key] = true;
        },
        RollUp(key){
            this.UnwrapFlag[key] = false;
        }
    },
    beforeMount() {
        this.GetWorkProgram();
        window.SaveF = (key, HTMLtext) => this.SaveFieldPlan(key, HTMLtext)
    },
}
</script>

<style>
p{
        font-family: 'Times New Roman';
        font-size: 12;
        white-space: pre-wrap;
}

b{
    -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
}
</style>
