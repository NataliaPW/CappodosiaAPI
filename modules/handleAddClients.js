import fs from "node:fs/promises"; //для записи клиентов
import {
   sendData,
   sendError
} from "./send.js";
import {
   CLIENT
} from "../index.js";


//import { readRequestBody } from "./helpers.js";


//добавление клиента  //POST/clients
export const handleAddClients = (req, res, clients) => {
   let body = ''; //строковая переменная
   try {
    //  let body = ''; //строковая переменная
      //ответ сервера
      req.on('data', (chunk) => {
          body += chunk.toString();
      });
   } catch (error) {
      console.log(`Ошибка при чтении запроса: ${error}`);
      sendError(res, 500, 'Ошибка сервера при чтении запроса');
   };

   //когда данные по запросу сформированы
   req.on('end', async () => {
      try {
         const newClient = JSON.parse(body);
         console.log(newClient);

         //проверяем наличие полей
        // examinationData(req, res, newClient);

         //ищем клиента в существующей базе по номеру билета
       /*  const clientIndex = clients.findIndex((c) => c.ticket === newClient.ticket);
       
         if (clientIndex !== -1) {
            sendError(res, 404, `Клиент с билетом ${newClient.ticket} уже существует`)
            return;
         }*/

         //вынесены в переменную в index.js
         //const dataClient = await fs.readFile(CLIENTS, "utf-8");
         //const clients = JSON.parse(dataClient);

         //добавляем нового клиента
         clients.push(newClient);
         //записываем в файл добавленного клиента
         await fs.writeFile(CLIENT, JSON.stringify(clients));

         sendData(res, newClient);
      } catch (error) {
         console.error(`Error: ${error}`);
         sendError(res, 500, `Ошибка сервера при добавлении данных: ${error}`);
      }
   })
};