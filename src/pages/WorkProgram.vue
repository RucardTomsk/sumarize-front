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
                <div v-if="exampleFlag['developmentMastering']">
                    <pre class="border border-secondary rounded">
                        – Освоить аппарат … и … .
                        – Научиться применять понятийный аппарат… для … решения практических задач профессиональной деятельности.</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.developmentMastering></div>
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
                <div v-if="exampleFlag['entranceRequirements']">
                    <pre class="border border-secondary rounded">
                        Для успешного освоения дисциплины требуются компетенции, сформированные в ходе освоения образовательных программ
                        предшествующего уровня образования.
                        Для успешного освоения дисциплины требуются результаты обучения по следующим дисциплинам: … .</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.entranceRequirements></div>
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
                <div v-html=planHTML.contentDiscipline></div>
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
                <div v-if="exampleFlag['currentControl']">
                    <pre class="border border-secondary rounded">
                        Текущий контроль по дисциплине проводится путем контроля посещаемости, проведения контрольных работ, тестов по
                        лекционному материалу, деловых игр по темам, выполнения домашних заданий, …, и фиксируется в форме контрольной точки не
                        менее одного раза в семестр.</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.currentControl></div>
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
                <div v-if="exampleFlag['evaluationProcedure']">
                    <pre class="border border-secondary rounded">
                        Зачет с оценкой в первом семестре проводится в письменной форме по билетам. Билет содержит теоретический вопрос и две
                        задачи. Продолжительность зачета 1,5 часа.
                        Примерный перечень теоретических вопросов
                        1. Вопрос 1.
                        2. Вопрос 2.
                        3. …
                        
                        Примеры задач:
                        1. Задача 1.
                        Дано: …
                        Требуется: …
                        
                        Результаты зачета с оценкой определяются оценками «отлично», «хорошо», «удовлетворительно», «неудовлетворительно».
                        Далее необходимо описать каким образом текущий контроль влияет на промежуточную аттестацию и в каком случае ставится
                        «отлично», «хорошо», «удовлетворительно», «неудовлетворительно».
                        В случае применения балльно-рейтинговой системы, они описывается в п.9 и п.11 с учетом текущего контроля и промежуточной
                        аттестации, на промежуточную аттестацию планируется не более 40% рейтинга.
                        В случае применения систем оценивания, отличных от пятибалльной, описать механизм перевода оценки в пятибалльную шкалу.
                        
                        Экзамен во втором семестре проводится в письменной форме по билетам. Экзаменационный билет состоит из трех частей.
                        Продолжительность экзамена 1,5 часа.
                        Структура экзамена должна соответствовать компетентностной структуре дисциплине. При описании системы оценивания
                        итогового контроля по дисциплине необходимо продемонстрировать достижение всех запланированных индикаторов – результатов
                        обучения.
                        Например,
                        Первая часть представляет собой тест из 5 вопросов, проверяющих ИУК-1.1. Ответы на вопросы первой части даются путем
                        выбора из списка предложенных.
                        Вторая часть содержит один вопрос, проверяющий ИОПК-2.2. Ответ на вопрос второй части дается в развернутой форме.
                        Третья часть содержит 2 вопроса, проверяющих ИПК-3.3 и оформленные в виде практических задач. Ответы на вопросы третьей
                        части предполагают решение задач и краткую интерпретацию полученных результатов.
                        Примерный перечень теоретических вопросов
                        1. Вопрос 1.
                        2. Вопрос 2.
                        3. …
                        
                        Примеры задач:
                        1. Задача 1.
                        Дано: …
                        Требуется: …
                        
                        Результаты экзамена определяются оценками «отлично», «хорошо», «удовлетворительно», «неудовлетворительно».
                        Далее необходимо описать каким образом текущий контроль влияет на промежуточную аттестацию и в каком случае ставится
                        «отлично», «хорошо», «удовлетворительно», «неудовлетворительно».
                        В случае применения балльно-рейтинговой системы, они описывается в п.9 и п.11 с учетом текущего контроля и промежуточной
                        аттестации, на промежуточную аттестацию планируется не более 40% рейтинга.
                        В случае применения систем оценивания, отличных от пятибалльной, описать механизм перевода оценки в пятибалльную шкалу.</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.evaluationProcedure></div>
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
                <div v-if="exampleFlag['methodologicalSupport']">
                    <pre class="border border-secondary rounded">
                        а) Электронный учебный курс по дисциплине в электронном университете «Moodle» -
                        https://moodle.tsu.ru/course/view.php?id=00000
                        б) Оценочные материалы текущего контроля и промежуточной аттестации по дисциплине.
                        в) План семинарских / практических занятий по дисциплине.
                        г) Методические указания по проведению лабораторных работ.
                        д) Методические указания по организации самостоятельной работы студентов.</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.methodologicalSupport></div>
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
                <div v-if="exampleFlag['references']">
                    <pre class="border border-secondary rounded">
                        а) основная литература:
                        – Агарков А.П. Экономика и управление на предприятии / А.П. Агарков [и др.]. – М.: Дашков и Ко, 2021. – 400 с.
                        – Менеджмент: Учебник для бакалавров / Е. Л. Маслова. – М.: Издательско-торговая корпорация «Дашков и К°», 2022. – 336
                        с. – URL: http://znanium.com/catalog.php?bookinfo=51388
                        – …
                        
                        б) дополнительная литература:
                        – Основы теории управления: Учебное пособие/А.П. Балашов - М.: Вузовский учебник, НИЦ ИНФРА-М, 2021. - 280 с. - URL:
                        http://znanium.com/bookread2.php?book=49191
                        – …
                        
                        в) ресурсы сети Интернет:
                        – открытые онлайн-курсы
                        – Журнал «Эксперт» - http://www.expert.ru
                        – Официальный сайт Федеральной службы государственной статистики РФ - www.gsk.ru
                        – Официальный сайт Всемирного банка - www.worldbank.org
                        – Общероссийская Сеть КонсультантПлюс Справочная правовая система. http://www.consultant.ru
                        – …</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.references></div>
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
                <div v-if="exampleFlag['listInformationTechnologies']">
                    <pre class="border border-secondary rounded">
                        а) лицензионное и свободно распространяемое программное обеспечение:
                        – Microsoft Office Standart 2013 Russian: пакет программ. Включает приложения: MS Office Word, MS Office Excel, MS
                        Office PowerPoint, MS Office On-eNote, MS Office Publisher, MS Outlook, MS Office Web Apps (Word Excel MS PowerPoint
                        Outlook);
                        – публично доступные облачные технологии (Google Docs, Яндекс диск и т.п.).
                        
                        б) информационные справочные системы:
                        – Электронный каталог Научной библиотеки ТГУ – http://chamo.lib.tsu.ru/search/query?locale=ruHYPERLINK
                        "http://chamo.lib.tsu.ru/search/query?locale=ru&theme=system"&HYPERLINK
                        "http://chamo.lib.tsu.ru/search/query?locale=ru&theme=system"theme=system
                        – Электронная библиотека (репозиторий) ТГУ – http://vital.lib.tsu.ru/vital/access/manager/Index
                        – ЭБС Лань – http://e.lanbook.com/
                        – ЭБС Консультант студента – http://www.studentlibrary.ru/
                        – Образовательная платформа Юрайт – https://urait.ru/
                        – ЭБС ZNANIUM.com – https://znanium.com/
                        – ЭБС IPRbooks – http://www.iprbookshop.ru/
                        
                        в) профессиональные базы данных (при наличии):
                        – Университетская информационная система РОССИЯ – https://uisrussia.msu.ru/
                        – Единая межведомственная информационно-статистическая система (ЕМИСС) – https://www.fedstat.ru/
                        – …</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.listInformationTechnologies></div>
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
                <div v-if="exampleFlag['materialSupport']">
                    <pre class="border border-secondary rounded">
                        Аудитории для проведения занятий лекционного типа.
                        Аудитории для проведения занятий семинарского типа, индивидуальных и групповых консультаций, текущего контроля и
                        промежуточной аттестации.
                        Помещения для самостоятельной работы, оснащенные компьютерной техникой и доступом к сети Интернет, в электронную
                        информационно-образовательную среду и к информационным справочным системам.
                        Лаборатории, оборудованные …
                        Аудитории для проведения занятий лекционного и семинарского типа индивидуальных и групповых консультаций, текущего
                        контроля и промежуточной аттестации в смешенном формате («Актру»).</pre>
                </div>
            </div>
            <div v-else>
                <div v-html=planHTML.materialSupport></div>
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
                <div v-if="exampleFlag['informationDevelopers']">
                    <pre class="border border-secondary rounded">
                        Фамилия Имя Отчество, ученая степень, ученое звание, место работы, должность</pre>
                </div>
            </div>
            <div v-else>
                    <div v-html=planHTML.informationDevelopers></div>
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
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

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
                window.SaveF(editor.config.get("planKey"),editor.getData());
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
                if (button.label === "Open Example"){
                    window.OpenE(editor.config.get("planKey"));
                    button.label = "Close Example";
                }else{
                    window.CloseE(editor.config.get("planKey"));
                    button.label = "Open Example";
                }
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
            exampleFlag: {},
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
                    this.exampleFlag[key] = false;
                    this.allConfig[key] = {
                        plugins: [
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

                        ],
                            // The configuration of the editor.
                            language: 'ru',
                                toolbar: {
                            items: [
                                'numberedList',
                                '|',
                                'insertTable',
                                '|',
                                'findAndReplace',
                                '|',
                                'undo',
                                'redo',
                                '|',
                                'openExampleButton',
                                'savebutton',
                                '|',
                            ],
                                    table: {
                                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                                    }
                        },
                        planKey: key,
                        saveFynction: this.SaveFieldPlan(),
                        list: {
                            properties: {
                                styles: true,
                                startIndex: true,
                                reversed: true
                            }
                        }
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
                this.CloseExamle(key);
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
        },
        OpenExamle(key){
            this.exampleFlag[key] = true;
        },
        CloseExamle(key){
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

table{
    border: 1px solid black;
    width: 100%;
}

tr{
    border: 1px solid black;
}

td{
    width: 30%;
    border: 1px solid black;
    position: relative;
}
</style>
