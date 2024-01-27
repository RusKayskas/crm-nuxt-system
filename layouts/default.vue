<script lang="ts" setup>
import { account } from '@/utils/appwrite';
import { useAuthStore, useIsLoadingStore } from '@/store/auth.store';

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();
onMounted(async() => {
  try {
    //получаем юзера и если есть юзер записываем в store
    const user = await account.get();
    if(user) authStore.set(user);
  } catch (error) {
    router.push('/login');
  } finally {
    isLoadingStore.set(false);
  }
})
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <!--если авторизация есть можем применять grid-->
  <section v-else :class="{ grid: authStore.isAuth }" >
      <LayoutSidebar v-if="authStore.isAuth"/>
      <div>
          <slot/>
      </div>
  </section>
</template>

<style scoped>
  .grid {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 5fr;
  }
</style>