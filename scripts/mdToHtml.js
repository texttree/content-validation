const fs = require('fs');

const divProject = process.argv[2];
const thePathFile = `${divProject}/`;
const newDir = `new_${divProject}`;

try {
  fs.mkdirSync(newDir);
  console.log('Папка успешно создана');
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

fs.readdir(thePathFile, (error, files) => {
  files.forEach((fileName) => {
    const fileContent = fs.readFileSync(thePathFile + fileName, 'utf8');
    let newNameFile = fileContent.split('\n')[0].split('# ')[1];
    const [num, str] = newNameFile.split('.');
    newNameFile = num.padStart(2, '0') + str;
    const regex = /<!--[\s\S]*?-->/g;
    let c = fileContent.replace('#', '<html><head><meta charset="utf-8" ><link rel="stylesheet" href="styles.css"></head><body><h2>');
    c = c.replaceAll('![Frame ', '</p><!-- ![Frame ');
    c = c.replaceAll('obs-en-', 'obs-en- --> <img class="img" style="border-radius:20px" src="../pictures/obs-en-');
    c = c.replaceAll('jpg)', 'jpg"><p class="text" style="margin-bottom: 60px">');
    c = c.replace('\n_', '<br><br><i><small><b>');
    c = c.replace('_', '</b></small></i></body></html>');
    c = c.replace(regex, '');
    const b = c.split('\n');
    b[0] += '</h2>';
    c = b.join('\n');

    fs.writeFile(`${newDir}/${newNameFile}.html`, c, (err) => {
      if (err) throw err; // не удалось переименовать файл
      console.log('Файл успешно создан');
    });
  });
});
