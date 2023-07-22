<template>
    <input 
        ref="autocompleteInput" 
        type="text" 
        autocomplete="off" 
        :placeholder="placeholder" 
        :class="class"
    />
</template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
    modelValue?: string;
    apiKey: string;
    placeholder?: string;
    class?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "callback", value: object): void;
}>();

let autocompleteInput = ref(null);
let scriptLoaded = false;

// Load the Google Maps API script
function loadGoogleMapsScript() {
    return new Promise<void>((resolve, reject) => {
        if (window.google && window.google.maps && window.google.maps.places) {
            resolve();
        } else {
            if (!scriptLoaded) {
                scriptLoaded = true;
                const googleMapsScript = document.createElement("script");
                googleMapsScript.setAttribute(
                    "src",
                    `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places&callback=initMap`
                );

                window.initMap = () => {
                    resolve();
                };

                googleMapsScript.onerror = (error) => {
                    reject(error);
                };

                document.head.appendChild(googleMapsScript);
            }
        }
    });
}

onMounted(async () => {
    try {
        await loadGoogleMapsScript();
        setupAutocomplete();
    } catch (error) {
        console.error("Failed to load Google Maps API", error);
    }
});

onBeforeUnmount(() => {
    // Remove the global callback to clean up
    delete window.initMap;
});

function setupAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
        autocompleteInput.value
    );

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        emit("update:modelValue", place.formatted_address);
        emit("callback", place);
    });
}
</script>