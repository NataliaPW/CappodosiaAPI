//функция отправки данных
export const sendData = (res, data) => {
   res.writeHead(200, {
      //ответ пользователю, возможные форматы ответа text/plain, text/html, text/json. 
      "Content-Type": "text/json; charset=utf-8",
      //адреса сайтов, которым мы разрешаем делать запросы
   //   "Access-Control-Allow-Origin": "*", //установлен через  res.setHeader
   });
   // Ответ для типа plain, html -  res.end('<h1>Ответ пользователю</h1>');
   res.end(JSON.stringify(data)); //ответ для типа json
}

//функция обработки ошибки
export const sendError = (res, statusErrCode, errMessage) => {
   res.writeHead(statusErrCode, {
      //ответ пользователю, возможные форматы ответа text/plain, text/html, text/json. 
      "Content-Type": "text/plain; charset=utf-8",
   });
   res.end(errMessage);
}