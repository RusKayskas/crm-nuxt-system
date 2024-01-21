import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constans";
import { KANBAN_DATA } from "./kanban.data";
import type { IDeal } from "~/types/deals.types";
// import type { ICard } from "./kanban.types";

//запрос к бд на получение всех карточек и состояний
export function useKanbanQuery() {
  console.log('this', KANBAN_DATA);
  return useQuery({
    //назначаем ключ (должен быть уникальный)
    queryKey: ['deals'],
    //берем функцию query по которой получаем все наги доки из бд указываем id нашей базы данных и id нашей коллекции
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
     //получаем и записываем в колонку
    select(data) {
      //дублируем массив создаем на основе этого массива
      const newBoard = [...KANBAN_DATA];
      // const newBoard = KANBAN_DATA.map(column => ({
      //   ...column,
      //   items: [] as ICard[],
      // }));
      //конвертируем в нужную нам коллекцию
      //принудительно указыввем что это является сделками
      const deals = data.documents as unknown as IDeal[];
      //проходимся циклом что бы распределить по статусам наши записи можно forEach но for Of быстрее и легче читаемый
      // deals.forEach((deal) => {
      //   console.log('dealaaaaaa', deal.name)
      //   const column = newBoard.find(col => col.id === deal.status);
      //   console.log('columnaaa', column);
      //   if (column) { // Проверяем, что 'deal' и 'deal.name' существуют
      //     column.items.push({
      //       $createdAt: deal.$createdAt,
      //       id: deal.$id,
      //       name: deal.name,
      //       price: deal.price,
      //       companyName: deal.customers.name,
      //       status: column.name
      //     })
      //   }
      // })
      for (const deal of deals) {
        //получаем статусы с сервака ищем нужную колонку и в нее записываем данные
        const column = newBoard.find(col => col.id === deal.status);
        if(column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.customers.name,
            status: column.name
          })
        }
      }
      // //возвращаем обновленный newBoard
      return newBoard
    },
    
  })
}