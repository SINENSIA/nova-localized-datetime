<template>
    <DefaultField
        :field="field"
        :errors="errors"
        :show-help-text="showHelpText"
        :full-width-content="fullWidthContent"
    >
        <template #field>
            <VueDatePicker
                v-model="dateValue"
                :locale="computedLocale"
                :first-day-of-week="firstDayOfWeek"
                :format="dateFormat"
                :enable-time-picker="enableTimePicker"
                :range="isRange"
                :cancel-text="Cancelar"
                :select-text="Seleccionar"
                :preset-ranges="computedPresetRanges"
                class="w-full form-control form-input form-control-bordered"
                :class="errorClasses"
                :placeholder="field.name"
            >
                <template
                    v-if="isRange"
                    #yearly="{ label, range, presetDateRange }"
                >
                    <span @click="presetDateRange(range)">{{ label }}</span>
                </template>
            </VueDatePicker>
        </template>
    </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from "laravel-nova";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
    endOfMonth,
    endOfYear,
    startOfMonth,
    startOfYear,
    subMonths,
} from "date-fns";

export default {
    mixins: [FormField, HandlesValidationErrors],

    components: {
        VueDatePicker,
    },

    props: ["resourceName", "resourceId", "field"],

    data() {
        return {
            dateValue: null,
        };
    },

    computed: {
        /**
         * Locale basado en el usuario autenticado o Laravel Nova
         */
        computedLocale() {
            return this.field.locale || window.Nova.config.locale || "es";
        },

        /**
         * Establece el primer día de la semana.
         */
        firstDayOfWeek() {
            return this.field.firstDayOfWeek !== undefined
                ? this.field.firstDayOfWeek
                : 1;
        },

        /**
         * Define el formato de fecha a mostrar en el picker.
         */
        dateFormat() {
            return this.field.dateFormat || "dd/MM/yyyy HH:mm";
        },

        /**
         * Define si se usa el selector de hora.
         */
        enableTimePicker() {
            return this.field.enableTimePicker !== undefined
                ? this.field.enableTimePicker
                : true;
        },

        /**
         * Define si el campo es un selector de rango de fechas.
         */
        isRange() {
            return this.field.range !== undefined ? this.field.range : false;
        },

        /**
         * Define los `presetRanges`, permitiendo personalizarlo desde el backend.
         */
        computedPresetRanges() {
            if (this.field.presetRanges) {
                return this.field.presetRanges.map((preset) => ({
                    label: this.__(preset.label),
                    range: preset.range,
                }));
            }

            return [
                { label: this.__("Hoy"), range: [new Date(), new Date()] },
                {
                    label: this.__("Este mes"),
                    range: [startOfMonth(new Date()), endOfMonth(new Date())],
                },
                {
                    label: this.__("El mes pasado"),
                    range: [
                        startOfMonth(subMonths(new Date(), 1)),
                        endOfMonth(subMonths(new Date(), 1)),
                    ],
                },
                {
                    label: this.__("Este trimestre"),
                    range: [startOfYear(new Date()), endOfYear(new Date())],
                },
                {
                    label: this.__("Este año"),
                    range: [startOfYear(new Date()), endOfYear(new Date())],
                    slot: "yearly",
                },
            ];
        },
    },

    watch: {
        /**
         * Observa cambios en el valor interno y lo convierte al formato correcto.
         */
        dateValue(newVal) {
            this.value = this.formatDate(newVal);
        },
    },

    methods: {
        setInitialValue() {
            this.dateValue = this.parseDate(this.field.value);
        },

        formatDate(date) {
            if (!date) return null;
            return Array.isArray(date)
                ? date.map((d) => this.formatToSQL(d)).join(" - ")
                : this.formatToSQL(date);
        },

        formatToSQL(date) {
            if (!date) return null;
            return new Date(date).toISOString().slice(0, 19).replace("T", " ");
        },

        parseDate(value) {
            if (!value) return null;
            if (
                this.isRange &&
                typeof value === "string" &&
                value.includes(" - ")
            ) {
                return value.split(" - ").map((dateStr) => new Date(dateStr));
            }
            return new Date(value);
        },

        fill(formData) {
            formData.append(this.fieldAttribute, this.value || "");
        },

        __(key) {
            if (window.Nova && window.Nova.__) {
                return window.Nova.__(key);
            }

            // Traducción manual si Nova no expone bien las cadenas
            const translations = {
                "nova::resources.cancel": "Cancelar",
                "nova::resources.select": "Seleccionar",
            };

            return translations[key] || key;
        },
    },
};
</script>
