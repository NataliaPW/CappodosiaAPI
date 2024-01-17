import fs from "node:fs/promises";
 
//функция проверки файлов
 export const checkFile = async (path, createIfMissing) => {
    if (createIfMissing) {
       try {
          await fs.access(path);
       } catch (error) {
          //создаем файл
          await fs.writeFile(path, JSON.stringify([]));
          console.log(`Файл ${path} был создан`);
          return true;
       }
    }

    try {
       await fs.access(path);
    } catch (error) {
       console.error(`Файл ${path} не найден`);
       return false;
    }
    return true;
 };