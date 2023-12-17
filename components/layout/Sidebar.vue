<template>
    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <NuxtLink style="display: block;" to="/">
           <NuxtImg class="mx-auto" src="./logo.svg" alt="logo" width="120px"></NuxtImg>
        </NuxtLink>
        
        <button class="absolute top-2 right-3 transition-colors hover:text-primary">
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