import { App } from "vue";
import GoogleAddressAutocomplete from "./components/GoogleAddressAutocomplete.vue";

export default {
    install: (app: App) => {
        app.component("google-address-autocomplete", GoogleAddressAutocomplete);
    }
}