# vue3-google-address-autocomplete

This project provides a Vue 3 component that uses Google's Places API for address autocomplete functionality.

![](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGIxY2hiNXlsamU3Znh1cmtzc2s0ZjJ6MGttbWhuenY1OWpodjRjYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UJs16R6IG0f9WX9uDu/giphy.gif)

## Prerequisites

Before you begin, you will need a Google Maps API key from [Google Cloud Platform Console](https://console.cloud.google.com/). You'll also need to enable the Maps JavaScript API and the Places API.

## Installation

To install this component in your project, use npm or yarn:

```bash
npm install vue3-google-address-autocomplete
```

or

```bash
yarn add vue3-google-address-autocomplete
```

## Usage
Import and register the component:

```vue
<template>
  <GoogleAddressAutocomplete 
    apiKey="your_google_api_key"
    v-model="address"
    @callback="callbackFunction"    
    class="css-class-here"
    placeholder="placeholder if you wish"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'

const address = ref('');

const callbackFunction(place) {
   console.log(place);
}
</script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
