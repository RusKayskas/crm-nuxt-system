import { useMutation } from '@tanstack/vue-query';
import { v4 as uuid } from 'uuid';
import { COLLECTION_COMMENTS, DB_ID } from '@/app.constans';
import { ref } from 'vue';

export function useCreateComment({refetch}: {refetch: () => void}) {
  const store = useDealSlideStore();
  const commentRef = ref<string>();

  const { mutate } = useMutation({
    mutationKey: ['add comments', commentRef.value],
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
      text: commentRef.value,
      //сделка к которой привязываем коммент
      deal: store.card?.id
    }),
    onSuccess: () => {
      //переобновляем при добавлении коммента
      refetch()
      commentRef.value = ''
    }
  })

  //функция что бы мы могли ее переиспользовать при нажатии на enter
  const writeComment = () => {
    if(!commentRef.value) return
    mutate()
  }
  return {
    writeComment,
    commentRef,
  }
}