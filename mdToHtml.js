let fs = require('fs');

fs.readdir( "uz_obs_old", (err, files )=>{
    console.log(files);
    files.forEach((fileName)=>{
        let fileContent = fs.readFileSync('uz_obs_old/'+fileName, 'utf8');
        let newName = fileContent.split('\n')[0].split('# ')[1];
        let [num, str] = newName.split(".");
        newName = num.padStart(2, '0') + str;
        let c = fileContent.replace('#', '<html><head><meta charset="utf-8"></head><body><h2>')
        c = c.replaceAll('![Frame ','<br><!-- ![Frame --><b>')
        c = c.replaceAll('](https://' , ' </b><!-- ](https://')
        console.log(c)
        c = c.replaceAll('.jpg)','.jpg) -->')
        c = c.replace('\n_', '<br><br><i>')
        c = c.replace('_', '</i></body></html>')
        const b = c.split('\n')
        b[0]+='</h2>'
        c = b.join('\n')
    
        fs.writeFile( 'new/'+ newName +".html", c, err => {
            if(err) throw err; // не удалось переименовать файл
            console.log('Файл успешно переименован');
         });

    })
} )



