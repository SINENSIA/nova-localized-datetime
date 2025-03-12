<template>
    <PanelItem :index="index" :field="field">
        <template #value>
            <div class="flex items-center gap-2">
                <CalendarIcon class="h-5 w-5 text-gray-500" />
                <span class="text-sm font-semibold">
                    {{ formattedValue }}
                </span>
            </div>
        </template>
    </PanelItem>
</template>

<script>
import { format } from "date-fns";
import { es, ca } from "date-fns/locale";
import { CalendarIcon } from "@heroicons/vue/24/solid";

export default {
    components: {
        CalendarIcon,
    },
    props: ["index", "resource", "resourceName", "resourceId", "field"],

    computed: {
        /**
         * Obtiene el locale del usuario autenticado o el de la app
         */
        computedLocale() {
            return this.field.locale || window.Nova.config.locale || "es";
        },

        /**
         * Formatea la fecha según el locale y el tipo de campo
         */
        formattedValue() {
            if (!this.field.value) return this.__("No disponible");

            // Si es un rango de fechas
            if (this.field.value.includes(" - ")) {
                const [start, end] = this.field.value
                    .split(" - ")
                    .map((dateStr) => new Date(dateStr));
                return `${this.formatDate(start)} - ${this.formatDate(end)}`;
            }

            return this.formatDate(new Date(this.field.value));
        },
    },

    methods: {
        formatDate(date) {
            return format(date, "dd/MM/yyyy HH:mm", {
                locale: this.getLocaleObject(),
            });
        },

        getLocaleObject() {
            return this.computedLocale === "ca" ? ca : es;
        },

        /**
         * Traducción desde Laravel Nova
         */
        __(key) {
            return window.Nova.__ ? window.Nova.__(key) : key;
        },
    },
};
</script>
