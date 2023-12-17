<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Страница Логина</h1>
      <form>
        <UiInput v-model="emailRef" placeholder="Email" type="email" class="mb-3" />
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
  useSeoMeta({
    title: 'Login',
  });
  const emailRef = ref('');

</script>