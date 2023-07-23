<template>
    <input
        ref="autocompleteInput"
        type="text"
        autocomplete="off"
        :placeholder="placeholder"
        :class="class"
    />
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, defineComponent, nextTick } from "vue";

export default defineComponent({
    props: {
        modelValue: String,
        apiKey: String,
        placeholder: String,
        class: String
    },
    emits: ["update:modelValue", "callback"],
    setup(props, { emit }) {
        const autocompleteInput = ref<HTMLInputElement | null>(null);
        let scriptLoaded = false;

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
                // Ensuring DOM has been updated before setupAutocomplete is called
                await nextTick();
                setupAutocomplete();
            } catch (error) {
                console.error("Failed to load Google Maps API", error);
            }
        });

        onBeforeUnmount(() => {
            delete window.initMap;
        });

        function setupAutocomplete() {
            if (autocompleteInput.value) {
                const autocomplete = new google.maps.places.Autocomplete(
                    autocompleteInput.value
                );

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();

                    emit("update:modelValue", place.formatted_address);
                    emit("callback", place);
                });
            }
        }

        return { autocompleteInput };
    },
});
</script>
