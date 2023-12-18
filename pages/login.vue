<script setup lang="ts">
  import { v4 as uuid } from 'uuid';

  useSeoMeta({
    title: 'Login',
  });
  const emailRef = ref('');
  const passwordRef = ref('');
  const nameRef = ref('');

  const isLoadingStore = useIsLoadingStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const login = async () => {
    isLoadingStore.set(true);
    await account.createEmailSession( emailRef.value, passwordRef.value );
    //получаем текущего юзера 
    const response = await account.get();
    if(response) {
      //запись в store
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status
      })
    }

    //обнуление полей и переадресация на страницу
    emailRef.value = '';
    passwordRef.value = '';
    nameRef.value = '';

    //пушим 
    await router.push('/');
    isLoadingStore.set(false);

  }

  const register = async () => {
    //создаем аккаунт и регимся uuid генит рендомный id
    await account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value);
    await login();
  }

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
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>