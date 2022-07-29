<script setup>
import Navbar from "./components/layout/NavbarHeader.vue";
</script>

<template>
  <Navbar />
  <router-view></router-view>
</template>

<style>body {
  background-color: hsl(233, 13%, 95%) !important;
}</style>
