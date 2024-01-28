import { useQuery } from '@tanstack/vue-query';
import { COLLECTION_DEALS, DB_ID } from '~/app.constans';


export function  useCommentsByDeal() {
  const store = useDealSlideStore();
  const cardId = store.card?.id || '';

  return useQuery({
    queryKey: ['deal', cardId],
    //получаем капточку по id
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),

  })
}