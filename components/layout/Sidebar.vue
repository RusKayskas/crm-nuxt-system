<script lang="ts" setup>
    import { useAuthStore, useIsLoadingStore } from '@/store/auth.store';
    const authStore = useAuthStore();
    const router = useRouter();
    const isLoadingStore = useIsLoadingStore();
    //функция для выхода из системы
    const logOut = async () => {
        isLoadingStore.set(true);
        //удаляем текущую сессию
        await account.deleteSession('current');
        authStore.clear();
        await router.push('/login');
        isLoadingStore.set(false);
    }
</script>
<template>
    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <NuxtLink style="display: block;" to="/">
           <NuxtImg class="mx-auto" src="./logo.svg" alt="logo" width="120px"></NuxtImg>
        </NuxtLink>
        
        <button @click="logOut" class="absolute top-2 right-3 transition-colors hover:text-primary">
            <Icon name="line-md:logout" size="20px"/>
        </button>
        <LayoutMenu />
    </aside>
</template>

<style>
    .wrapper {
        @apply bg-sidebar items-center justify-center w-screen h-screen
    }
</style>