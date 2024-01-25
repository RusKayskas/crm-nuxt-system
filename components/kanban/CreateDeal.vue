<template>
  <div class="text-center mb-2">
    <UiButton 
      class="transition-all opacity-6 hover:opacity-100 hover:text-[#a252c8]" 
      @click="isOpenForm = !isOpenForm">

      <Icon v-if="isOpenForm"
        name="radix-icons:arrow-up"
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
  <form v-if="isOpenForm" @submit="onSubmit" class="form">
    <UiInput 
      placeholder="Name"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
      class="input"
    />
    <UiInput 
      placeholder="price"
      v-model="price"
      v-bind="priceAttrs"
      type="text"
      class="input"
    />
    <UiInput 
      placeholder="Email"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="text"
      class="input"
    />
    <UiInput 
      placeholder="Company"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
      class="input"
    />

    <UiButton class="btn" :disabled="isPending">
      {{ isPending ? 'Loading...' : 'Add' }}
    </UiButton>
  </form>
</template>

<script lang="ts" setup>
  import { useMutation } from '@tanstack/vue-query';
  import { v4 as uuid } from 'uuid'
  import { defineProps, ref, defineEmits } from 'vue';
  import { COLLECTION_DEALS, DB_ID } from '~/app.constans';
  import type { IDeal } from '~/types/deals.types';

  const isOpenForm = ref<boolean>(false);
  const emit = defineEmits(['reload']);
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
      type: Function
    },
  })


  const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
    initialValues: {
      status: props.status
    }
  })

  const [name, nameAttrs] = defineField('name');
  const [price, priceAttrs] = defineField('price');
  const [customerEmail, customerEmailAttrs] = defineField('customers.email');
  const [customerName, customerNameAttrs] = defineField('customers.name');
  
  const { mutate, isPending } = useMutation({
    mutationKey: ['create a new deal'],
    mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
    onSuccess() {
      props.refetch && props.refetch();
      handleReset();
    }
  });

  const onSubmit = handleSubmit(values => {
    mutate(values);
  });
</script>

<style>
  .input {
    @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
  }
  /*.btn {
    @apply text-xs border py-1 px-2 border-[#161c26] :hover:border-[#482c65] transition-colors text-[#aebed5] :hover:text-white;
  }*/
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