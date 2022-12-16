const fs = require('fs')

const thePathFile = 'test/'
// корневая папка содержащая в себе файлы md
fs.readdir( thePathFile, (err, main )=>{

    let errors = []
    const exceptions = ['LICENSE.md','manifest.yaml'] 
    main = main.filter(item => !exceptions.includes(item))

    main.forEach((chapter)=>{

        const fileContent = fs.readFileSync(thePathFile + chapter, 'utf8')
        if (fileContent.includes('OBS Image')){
            verses = fileContent.split('![OBS Image](https://cdn.door43.org/obs/jpg/360px/obs-en-')
        } else{
            verses = fileContent.split('![Frame ')
        }
        const missingQuote = fileContent.match(/\"/g)
        if((missingQuote?.length??0)%2){
            const er = 'Нечетное число кавычек в ' + chapter.split('.')[0] + ' главе'
            errors.push(er)
        }

        verses.forEach((verse)=>{
            const doubleSpace = verse.includes('  ')
            const reg = / [,!?:.]/gm

            if(doubleSpace){
                const er = 'двойной пробел в ' + verse.slice(0,5)
                errors.push(er)
            }
            if(reg.test(verse)){
                const er = 'Пробел перед знаком препинания ' + verse.slice(0,5)
                errors.push(er)
            }
            fs.writeFile( 'ErrorsMdOBS.txt', errors.join('\n'), err => {
                if(err) throw err
                // создаем файл в корневой папке
            })
        })
    })
})
