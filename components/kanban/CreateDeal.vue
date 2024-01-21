<template>
  <div class="text-center mb-2">
    <UiButton 
      class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]" 
      @click="isOpenForm = !isOpenForm">

      <Icon v-if="isOpenForm"
        name="redix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
        size="25"
      ></Icon>
      <Icon v-else
        name="radix-icons:plus-circled"
        class="fade-in-100 fade-out-0"
        size="25"
      ></Icon>

    </UiButton>  
  </div>
  <form>

  </form>
</template>

<script lang="ts" setup>
  import { useMutation } from '@tanstack/vue-query';
import { Functions } from 'appwrite';
  import { v4 as uuidv4 } from 'uuid';
  import { defineProps, ref } from 'vue';
  import { COLLECTION_DEALS, DB_ID } from '~/app.constans';
  import type { IDeal } from '~/types/deals.types';

  const isOpenForm = ref<boolean>(false);


  //метод pick из интерфейса берем поля необходимые нам поля
  interface IDealFormState extends Pick<IDeal, 'name' | 'price'> 
  {
    customer: {
      email: string
      name: string
    }
    status: string
  }

  const props = defineProps({
    status: {
      type: String,
      default: ''
    },
    refetch: {
      type: Functions
    },
  })

  
</script>

<style>
  .input {
    @apply border-[#161c26] mb-2 placeholder:text-[#748092]
    focus: border-border transition-colors;
  }
  .btn {
    @apply text-xs border py-1 px-2 border-[#161c26] 
    :hover:border-[#482c65] transition-colors text-[#aebed5]
    :hover:text-white;
  }
  .form {
    @apply mb-3 block;
    animation: show 0.3s ease-in-out;
  }
  @keyframes show {
    from {
      @apply border-[#a252c83d];
      transform: translateY(-35px);
      opacity: 0.4;
    }
    90% {
      @apply border-[#a252c83d];
    }
    to {
      @apply border-transparent;
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>