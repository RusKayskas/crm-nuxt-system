<script setup lang="ts">
  useSeoMeta({
    title: 'Login',
  });
  const emailRef = ref('');
  const passwordRef = ref('');
  const nameRef = ref('');

  const isLoadingStore = useIsLoadingStore();
  const router = useRouter();
</script>
<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
      <form>
        <UiInput v-model="emailRef" placeholder="Email" type="email" class="mb-3" />
        <UiInput v-model="passwordRef" placeholder="password" type="password" class="mb-3" />
        <UiInput v-model="nameRef" placeholder="name" type="text" class="mb-10" />
        <div class="flex items-center justify-center gap-5">
          <UiButton type="button">Login</UiButton>
          <UiButton type="button">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>