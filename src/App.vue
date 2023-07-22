<script setup lang="ts">
import { ref } from 'vue';
import GoogleAddressAutocomplete from './index';

const address = ref<string>('');

const callback = (place: any) => {
  console.log(place);
};
</script>

<template>
  <GoogleAddressAutocomplete apiKey="YOURKEY" v-model="address" @callback="callback" />

  {{ address }}
</template>
