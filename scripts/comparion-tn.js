const fs = require("fs");

//  эти три файла нужно создать заранее, в той же папке, что и этот скрипт
const russianFile = "russian.tsv";
const englishFile = "english.tsv";
const resultFile = "result.tsv";

function readDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data.split("\n").map((line) => line.split("\t"));
  } catch (error) {
    console.error(`Ошибка чтения файла ${filePath}: ${error.message}`);
    return [];
  }
}

function writeDataToFile(filePath, data) {
  try {
    const formattedData = data.map((row) => row.join("\t")).join("\n");
    fs.writeFileSync(filePath, formattedData, "utf-8");
    console.log(`Данные успешно записаны в файл ${filePath}`);
  } catch (error) {
    console.error(`Ошибка записи данных в файл ${filePath}: ${error.message}`);
  }
}

function compareAndWriteData(russianData, englishData) {
  const resultData = [];

  for (const englishRow of englishData) {
    // здесь нужно указать, по какой колонке мы будем сравнивать (где 0 - это первая колонка).
    // Я сравниваю по колоке B(ID), это вторая колонка(поэтому у меня в двух местах написана цифра 1{так как первая это 0} )

    const englishID = englishRow[1];

    const russianRow = russianData.find(
      (russianRow) => russianRow[1] === englishID
    );

    if (russianRow) {
      resultData.push(russianRow);
    } else {
      resultData.push(englishRow);
    }
  }

  return resultData;
}

const russianData = readDataFromFile(russianFile);
const englishData = readDataFromFile(englishFile);

const resultData = compareAndWriteData(russianData, englishData);
writeDataToFile(resultFile, resultData);
