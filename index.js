import http from "node:http";
//const http = require('node:http');

//модуль для чтения файлов
import fs from "node:fs/promises";
import {
   sendError
} from "./modules/send.js";
import {
   checkFile
} from "./modules/checkFile.js";
import {
   handleClientsRequest
} from "./modules/handleClientsRequest.js";
import {
   handleAddClients
} from "./modules/handleAddClients.js";


const PORT = 8090;
export const CLIENT = './clients.json';



//создаем сервер
const startServer = async () => {
   //проверка файлов перед запуском сервера
   if (!(await checkFile(CLIENT))) {
      return;
   };


   //читаем файл с сервера, например client.json
   const dataClient = await fs.readFile(CLIENT, "utf-8");
   const clients = JSON.parse(dataClient);


   http.createServer(async (req, res) => {
      //защита при отсутствии данных - чтобы сервер не упал - применяется конструкция try-catch
      try {
         //устанавливаем заголовок
         res.setHeader("Access-Control-Allow-Origin", "*");
          //заголовок, который мы указываем при отправке - Content-Type
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        
          //перечисляем используемые методы запросов + файковый запрос - OPTIONS
         res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
        
         //проверка на фейковый запрос
         if (req.method==='OPTIONS') {
            res.writeHead('204');
            res.end();
         
            return;
         }

         //обработка запроса
         /* const reqURL = new URL(req.url, `http://${req.headers.host}`);
          //получаем окончание адреса запроса
          const pathName = reqURL.pathname;
          console.log(reqURL);
          console.log(pathName);*/
         //разбиваем адрес запроса на сегмены - составляющие
         const segments = req.url.split('/').filter(Boolean); //фильтер убирает пустые сегменты
         // console.log(segments[0]);
        //  const ticket = segments[1];

         //req - запрос от клиента, clients - по проекту запрос комедиантов
         //заменяем req.url на segments
         if (req.method === "GET" && segments[0] === 'clients') {
            handleClientsRequest(req, res, segments, clients);
            return;
         }

          if (req.method === "POST" && segments[0] === 'clients') {
          
            //добавление клиента
            //POST/clients
             handleAddClients(req, res,clients);
            return;
         }

         sendError (res, 404, 'Страница не найдена');
      } catch (error) {
         console.error(`Error: ${error}`);
         sendError (res, 500, `Ошибка сервера: ${error}`);
      }

   }).listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });

   //читаем файл с сервера, например package.json
   /*const data = await fs.readFile("package.json", "utf-8");
      console.log(data);*/
   //для версии fs не promise
   /*
   import fs from "node:fs";
   fs.readFile("package.json", "utf-8", (err, data) => {
      console.log(data);
   });
   */
   /*
   const name = 'tasza';
   //port 4024*/
 //  console.log(`Сервер запущен по адесу http://localhost:${PORT}`);
};

startServer();