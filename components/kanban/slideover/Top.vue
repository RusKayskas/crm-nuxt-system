<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">
      О Сделке
    </div>
    <UiKanbanSlideoverLabel label-text="Наименование">
      <h2>
        {{ store.card?.name }}
      </h2>
    </UiKanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Сумма">
      <h2>
        {{ convertCurrency(store.card?.price || 0) }}
      </h2>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Статус">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Клиент">
      <UiBadge variant="outline">
        {{ store.card?.companyName }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Дата создания">
      {{ dayjs(store.card?.$createdAt).locale('ru').format('DD MMMM YYYY') }}
    </KanbanSlideoverLabel>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { useDealSlideStore } from '@/store/deals-slide.store';
  const store = useDealSlideStore();
</script>

<style>

</style>