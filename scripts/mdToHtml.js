const fs = require('fs');

const thePathFile = 'uz_obs_old/';
fs.readdir(thePathFile, (error, files) => {
  files.forEach((fileName) => {
    const fileContent = fs.readFileSync(thePathFile + fileName, 'utf8');
    let newNameFile = fileContent.split('\n')[0].split('# ')[1];
    const [num, str] = newNameFile.split('.');
    newNameFile = num.padStart(2, '0') + str;
    let c = fileContent.replace('#', '<html><head><meta charset="utf-8"></head><body><h2>');
    c = c.replaceAll('![Frame ', '<br><!-- ![Frame --><b>');
    c = c.replaceAll('](https://', ' </b><!-- ](https://');

    c = c.replaceAll('.jpg)', '.jpg) -->');
    c = c.replace('\n_', '<br><br><i>');
    c = c.replace('_', '</i></body></html>');
    const b = c.split('\n');
    b[0] += '</h2>';
    c = b.join('\n');

    fs.writeFile(`new/${newNameFile}.html`, c, (err) => {
      if (err) throw err; // не удалось переименовать файл
      console.log('Файл успешно создан');
    });
  });
});
