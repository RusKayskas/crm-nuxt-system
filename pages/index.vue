<script setup lang="ts">
// import type { ICard, IColumn } from '@/components/kanban/kanban.types';
import { useKanbanQuery } from '@/components/kanban/useKanbanQuery';
import { ref } from 'vue';
import { convertCurrency } from '@/utils/convertCurrency';
import dayjs from 'dayjs';
import { EnumStatus } from '~/types/deals.types';
import { useMutation } from '@tanstack/vue-query';
import { COLLECTION_DEALS, DB_ID } from '~/app.constans';
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { generateColumnStyle } from '~/components/kanban/generate-gradient';
import { useDealSlideStore } from '@/store/deals-slide.store';
  useSeoMeta({
    title: 'Home | Nuxt Crm'
  });

  const dragCardRef = ref< ICard | null >(null);
  const sourceColumnRef = ref< IColumn | null >(null);
  //получаем нужные поля refetch служит для переобновления данных
  const { data, isLoading, refetch } = useKanbanQuery();
  const store = useDealSlideStore();
  // const { kanbanData } = ref(data);

 type TypeMutationVariables = {
    docId: string,
    status?: EnumStatus
  }

  const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({ docId, status}: TypeMutationVariables) => 
      DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
        status,
      }
    ),
    onSuccess: () => {
      refetch();
    },
  })

  function handleDragStart(card: ICard, column: IColumn) {
    dragCardRef.value = card;
    sourceColumnRef.value = column
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleDrop(targetColumn: IColumn) {
    if(dragCardRef.value && sourceColumnRef.value) {
      mutate({docId: dragCardRef.value.id, status: targetColumn.id})
    }
  }
</script> 
<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Главная Страница</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-6">
        <div v-for="(column, index) in data" :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="min-h-screen"
        >
          <div class="rounded bg-slate-700 py-5 mb-2 text-center" :style="generateColumnStyle(index, data?.length)"> 
            {{ column.name }}
          </div>
          <KanbanCreateDeal :refetch="refetch" :status="column.id" /> 
          <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true"
            @dragstart="() => handleDragStart(card, column)"
          >
            <UiCardHeader role="button" @click="store.set(card)">
              <UiCardTitle> {{ card.name }} </UiCardTitle> 
              <UiCardDescription>
                {{ convertCurrency(card.price) }}
              </UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="text-xs">Компания {{ card.companyName }}</UiCardContent>
            <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
          </UiCard>
        </div>
      </div>
      <KanbanSlideoverSlideOver />
    </div>
  </div>
</template>
