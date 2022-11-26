<template>
    <div id="doc">
        <div class="conteiner">
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
        
                        <b>Тематический план</b>
                    </p>
                    <div>
                            <div v-html=plan.contentDiscipline></div>
                            <p></p>
                    </div>
                </div>
                <div class="col"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import html2pdf from 'html2pdf.js'
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'

export default {
    name: 'GeneratePdfAnnot',
    data() {
        return {
            plan: {},
            planHTML: {},
        }
    },
    methods: {
        async GetWorkProgram() {
            try {
                const response = await axios.get("http://192.168.1.56:5050/plan/get-work-program/" + this.$route.params.guid);
                this.plan = response.data;
                this.plan['purposeMastering'] = this.plan['purposeMastering'].split('\n');
                this.plan['resultsMastering'] = this.plan['resultsMastering'].split('\n');
                const response_html = await axios.get("http://192.168.1.56:5050/plan/get-work-program/" + this.$route.params.guid + '_html');
                this.planHTML = response_html.data;
            } catch (e) {
                alert(e);
            }
        },
        exportToPDF() {
            var element = document.getElementById('doc');
            html2pdf().set({
                margin: 0.5,
                filename: "annotation.pdf",
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak: { mode: 'avoid-all', before: '#pBreak' }
            }).from(element).save();
        },
        exportToWord() {
            var element = document.documentElement.outerHTML
            console.log(element)
            asBlob(element).then(data => {
                saveAs(data, 'test.docx');
            });

        },
    },
    beforeMount() {

        this.GetWorkProgram();
    },
    updated() {
        if (this.$route.params.type === 'pdf') {
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