<script setup lang="ts">
import type { ICard, IColumn } from '@/components/kanban/kanban.types';
import { useKanbanQuery } from '@/components/kanban/useKanbanQuery';

  useSeoMeta({
    title: 'Home | Nuxt Crm'
  });

  // const dragCardRef = ref< ICard | null >(null);
  // const sourceColumnRef = ref< IColumn | null >(null);
  //получаем нужные поля refetch служит для переобновления данных
  const { data, isLoading, refetch } =  useKanbanQuery();
</script>
<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Главная Страница</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-col-5 gap-16">
        <div v-for="column in data" :key="column.id">
          <div class="rounded bg-slate-700 py-5 mb-2 text-center"> 
            {{ column.name }}
          </div>
        </div>
      </div>

      <UiCard class="mb-3" draggable="true">
        <UiCardHeader role="button">Name card</UiCardHeader>
        <UiCardContent>Company</UiCardContent>
        <UiCardFooter>Date</UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>
