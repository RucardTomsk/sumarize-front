<template>
    <div id="element-to-print">
        
        <div class="conteiner">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><span @click="$router.push('/')">Факультеты</span></li>
                            <li class="breadcrumb-item"><span @click="$router.push(`/program/${param[3]}`)">{{param[0]}}</span></li>
                            <li class="breadcrumb-item"><span @click="$router.back()">{{param[1]}}</span></li>
                            <li class="breadcrumb-item active" aria-current="page">{{param[2]}} (Аннотация)</li>
                        </ol>
                    </nav>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="text-left"><b>{{ plan.code }} {{ plan.name }}</b> </p>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="text-left">{{ plan.placeDiscipline }} </p>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="text-left">{{ plan.semesterMastering }} </p>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="text-left">Язык реализации - {{ plan.implementationLanguage }} </p>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="text-left">{{ plan.scopeDiscipline }} </p>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <p class="text-left">
        
                        <b>Тематический план <span
                                class="badge bg-secondary">Редактируемое</span></b>
                    </p>
                    <div>
                        <div v-if="editFlag.contentDiscipline">
                            <ckeditor :editor="editor" v-model="planHTML.contentDiscipline" :config="allConfig.contentDiscipline" />
                            <p></p>
                            <div v-if="exampleFlag['contentDiscipline']">
                                <pre class="border border-secondary rounded">
                                            Тема 1. История компьютерных наук
                                            Тема 2. История компьютерных наук в ТГУ
                                            Тема 3. История языков программирования
                                            Тема 4. IT индустрия - текущее состояние в мире
                                            Тема 5. Требования рынка
                                            Тема 6. Что должен знать хороший программист?
                                            Тема 7. Гостевые лекции - бизнес визиты</pre>
                            </div>
                        </div>
                        <div v-else>
                            <i id="edit" class="bi bi-pencil-square" @click="EditFieldPlan('contentDiscipline')"></i>
                            <div v-html=plan.contentDiscipline></div>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <button type="button" class="btn btn-outline-secondary"
                        @click="$router.push(`/generateAnnot/${plan.guid}/pdf`)">Конвертировать в PDF</button>
                </div>
                <div class="col"></div>
            </div>
        </div>

        <!--<button type="button" class="btn btn-primary" @click="$router.push(`/generate/${plan.guid}/word`)">Generate WORD</button> -->
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
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import VueHtml2pdf from 'vue-html2pdf'

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 9) {
        e.preventDefault();
    }
});

class TabPlagin extends Plugin {
    init() {
        const editor = this.editor;
        editor.keystrokes.set('Tab', (data) => {
            editor.model.change(writer => {
                editor.model.insertContent(
                    writer.createText("    ")
                );
            });
        })
    }
}

class EnterPlagin extends Plugin {
    init() {
        const editor = this.editor;
        var shiftAndEnter = editor.commands.get("shiftEnter");
        var Enter = editor.commands.get("enter");
        editor.commands.get("enter").destroy();
        editor.commands.add("enter", shiftAndEnter)
        editor.commands.get("shiftEnter").destroy();
        editor.commands.add("shiftEnter", Enter)
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
                window.SaveF(editor.config.get("planKey"), editor.getData());
            });

            return button;
        });
    }
};

class OpenExampleButtonPlugin extends Plugin {
    init() {
        const editor = this.editor;

        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add('openExampleButton', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set({
                label: 'Open Example',
                withText: true,
                tooltip: true,
            });

            button.on('execute', () => {
                if (button.label === "Open Example") {
                    window.OpenE(editor.config.get("planKey"));
                    button.label = "Close Example";
                } else {
                    window.CloseE(editor.config.get("planKey"));
                    button.label = "Open Example";
                }
            });

            return button;
        });
    }
};

class DisallowNestingTables extends Plugin {
    init() {
        const editor = this.editor;

        editor.model.schema.addChildCheck((context, childDefinition) => {
            if (childDefinition.name == 'table' && Array.from(context.getNames()).includes('table')) {
                return false;
            }
        });
    }
}

const { convert } = require('html-to-text');

export default {
    name: 'Annotation',
    components: {
        ckeditor: CKEditor.component,
    },
    data() {
        return {
            plan: {},
            planHTML: {},
            editFlag: {},
            exampleFlag: {},
            UnwrapFlag: {},
            editor: ClassicEditor,
            allConfig: {},
            param: [],
        }
    },
    methods: {
        async GetWorkProgram() {
            try {
                const response = await axios.get("http://192.168.1.56:5050/plan/get-work-program/" + this.$route.params.guid);
                this.plan = response.data;
                for (var key in this.plan) {
                    this.editFlag[key] = false;
                    this.UnwrapFlag[key] = false;
                    this.exampleFlag[key] = false;
                    this.allConfig[key] = {
                        plugins: [
                            BoldPlugin,
                            ItalicPlugin,
                            LinkPlugin,
                            EssentialsPlugin,
                            ParagraphPlugin,
                            SaveButtonPlugin,
                            TabPlagin,
                            EnterPlagin,
                            Clipboard,
                            ListProperties,
                            FindAndReplace,
                            OpenExampleButtonPlugin,
                            Table,
                            TableToolbar,
                            DisallowNestingTables,
                            Alignment,

                        ],
                        // The configuration of the editor.
                        language: 'ru',
                        toolbar: {
                            items: [
                                'bold', 'italic',
                                '|',
                                'link',
                                '|',
                                'numberedList',
                                '|',
                                'insertTable',
                                '|',
                                'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify',
                                '|',
                                'findAndReplace',
                                '|',
                                'undo', 'redo',
                                '|',
                                'openExampleButton', 'savebutton',
                                '|',
                            ],
                        },
                        table: {
                            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                        },
                        planKey: key,
                    }
                }
                this.UnwrapFlag['title'] = false;
                const response_html = await axios.get("http://192.168.1.56:5050/plan/get-work-program/" + this.$route.params.guid + '_html');
                this.planHTML = response_html.data;
                const response_param = await axios.get("http://192.168.1.56:5050/plan/get-name/" + this.$route.params.guid);
                this.param = response_param.data;
            } catch (e) {
                alert(e)
            }
        },
        ConvertHtmlToText(htmlText) {
            const text = convert(htmlText, { selectors: [{ selector: 'a', options: { hideLinkHrefIfSameAsText: true } }] })
            return text;
        },
        SaveFieldPlan(key, HTMLtext) {
            var guid = this.$route.params.guid;
            var text = HTMLtext
            if (text.includes('class="table"')) {
                text = text.replaceAll('<figure class="table">', '')
                text = text.replaceAll('</figure>', '')
                text = text.replaceAll('<table>', '<table class="table table-bordered">')
            }
            axios.post("http://192.168.1.56:5050/plan/save-plan/" + guid + "_html/" + key, {
                "Text": HTMLtext
            });
            axios.post("http://192.168.1.56:5050/plan/save-plan/" + guid + "/" + key, {
                "Text": text
            }).then(() => {

                this.plan[key] = text;
                this.planHTML[key] = HTMLtext;
                this.editFlag[key] = false;
                this.CloseExamle(key);
            });
        },
        EditFieldPlan(key) {
            this.editFlag[key] = true;
        },
        Unwrap(key) {
            this.UnwrapFlag[key] = true;
        },
        RollUp(key) {
            this.UnwrapFlag[key] = false;
        },
        OpenExamle(key) {
            this.exampleFlag[key] = true;
        },
        CloseExamle(key) {
            this.exampleFlag[key] = false;
        },
    },
    beforeMount() {
        this.GetWorkProgram();
        window.SaveF = (key, HTMLtext) => this.SaveFieldPlan(key, HTMLtext)
        window.OpenE = (key) => this.OpenExamle(key)
        window.CloseE = (key) => this.CloseExamle(key)
    },
}
</script>

<style>
p {
    font-family: 'Times New Roman';
    font-size: 12;
    white-space: pre-wrap;
}

b {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
