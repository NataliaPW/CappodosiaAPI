import {
   sendData,
   sendError
} from "./send.js";

//создание функции для вывода данных о комиках
export const handleClientsRequest = async (req, res, segments, clients) => {

   //проверяем длину segment и если она больше 1 - то запрос сделан для конкретного элемента
   if (segments.length === 2) {
      const client = clients.find(c => c.id === segments[1]); //вытягиваем комедианта

      if (!client) {
         sendError(res, 404, 'Клиент не найден')
         return;
         // throw new Error('Клиент не найден');
      }

      //возвращаем comedian
      sendData(res, client);
      return;
   }

   sendData(res, clients);
};