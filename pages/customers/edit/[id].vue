<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Редактирование {{ (data as unknown as ICustomerFormState)?.name }}
    </h1>

    <form @submit="onSubmit" class="form">
      
      <UiInput 
        placeholder="Name"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        class="input"
      />
      <UiInput 
        placeholder="Email"
        v-model="email"
        v-bind="emailAttrs"
        type="text"
        class="input"
      />
      <UiInput 
        placeholder="Company"
        v-model="fromSource"
        v-bind="fromSourceAttrs"
        type="text"
        class="input"
      />
      <img 
        v-if="values.avatar_url || isUploadImagePanding" 
        :src="values.avatar_url"
        alt=""
        width="50"
        height="50"
        class="rounded-full my-2"
      >
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-2">
            Логотип
          </div>
          <UiInput 
            type="file"
            :onchange="(e:inputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
            :disabled="isUploadImagePanding"
          />
        </label>
      </div>
  
      <UiButton variant="secondary" class="btn" :disabled="isPending">
        {{ isPending ? 'Loading...' : 'Add' }}
      </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { storage } from '#imports';
  import { useMutation, useQuery } from '@tanstack/vue-query';
  import { v4 as uuid } from 'uuid'
  import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/app.constans';
  import type { ICustomer } from '~/types/deals.types';


  interface inputFileEvent extends Event {
    target: HTMLInputElement
  }

  interface ICustomerFormState
    extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

  useSeoMeta({
    title: 'Редактирование компании'
  })


  const route = useRoute();
  const customerId = route.params.id.replace('}','') as string
  console.log('customerId', customerId)
  const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormState>()

  const {data, isSuccess} = useQuery({
    queryKey: ['get customer', customerId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
  })

  

  const [name, nameAttrs] = defineField('name');
  const [email, emailAttrs] = defineField('email');
  const [fromSource, fromSourceAttrs] = defineField('from_source');

  const {mutate, isPending} = useMutation({
    mutationKey: ['update customer', customerId],
    mutationFn: (data:ICustomerFormState) => 
      DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data) 
  })

  //upload image
  const { mutate: uploadImage, isPending: isUploadImagePanding } = useMutation({
    mutationKey: ['upload image'],
    mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file ),
    onSuccess(data) {
      const response = storage.getFileDownload(STORAGE_ID, data.$id)
      setFieldValue('avatar_url', response.href)
    }
  })

  const onSubmit = handleSubmit(values => {
    mutate(values)
  })

  watchEffect(() => {
  const initialData = data.value as unknown as ICustomerFormState;
  setValues({
    email: initialData?.email,
    avatar_url: initialData?.avatar_url,
    from_source: initialData?.from_source || '',
    name: initialData?.name
  });
});

</script>

<style scoped>

</style>