<script setup lang="ts">
  useSeoMeta({
    title: 'Home | Nuxt Crm'
  });
</script>
<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Главная Страница</h1>
    <UiCard class="mb-3" draggable="true">
      <UiCardHeader role="button">Name card</UiCardHeader>
      <UiCardContent>Company</UiCardContent>
      <UiCardFooter>Date</UiCardFooter>
    </UiCard>
  </div>
</template>
