<template>
    <div class="flex items-center gap-2">
        <CalendarIcon class="h-4 w-4 text-gray-400" />
        <span class="text-xs font-medium" :title="fullValue">
            {{ displayShort ? shortValue : fullValue }}
        </span>
    </div>
</template>

<script>
import { format } from "date-fns";
import { es, ca } from "date-fns/locale";
import { CalendarIcon } from "@heroicons/vue/24/solid";

export default {
    components: {
        CalendarIcon,
    },
    props: ["resourceName", "field"],

    computed: {
        computedLocale() {
            return this.field.locale || window.Nova.config.locale || "es";
        },
        displayShort() {
            return this.field.showShortValue !== undefined
                ? this.field.showShortValue
                : true;
        },

        fullValue() {
            if (!this.field.value) return this.__("No disponible");
            return this.formatDate(new Date(this.field.value));
        },

        shortValue() {
            if (!this.field.value) return "-";
            return format(new Date(this.field.value), "dd/MM", {
                locale: this.getLocaleObject(),
            });
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

        __(key) {
            return window.Nova.__ ? window.Nova.__(key) : key;
        },
    },
};
</script>
