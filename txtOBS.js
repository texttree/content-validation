const fs = require('fs')

const mainDiv = "test/"

fs.readdir( mainDiv, (err, _chapters )=>{
    let errors = []
    const exceptions = ['LICENSE.md','manifest.json'] 
    const chapters = _chapters.filter(item => !exceptions.includes(item))

    chapters.forEach((chapter)=>{

        fs.readdir( mainDiv + chapter, (err, verses )=>{

            verses.forEach((verse)=>{

                const thePathFile = mainDiv + chapter + '/'
                const fileContent = fs.readFileSync(thePathFile + verse, 'utf8')
                const doubleSpace = fileContent.includes('  ')
                const reg = / [,!?:.]/gm
                const missingQuote = fileContent.match(/\"/g)

                if((missingQuote?.length??0)%2){
                    const er = 'Нечетное число кавычек в '
                    errors.push(er)
                }
                if(doubleSpace){
                    const er = ('Двойной пробел в ' + chapter + ":" + verse.split('.')[0])
                    errors.push(er)  
                }
                if(reg.test(fileContent)){
                    const er = ('Пробел перед знаком препинания ' + chapter + ":" + verse.split('.')[0])
                    errors.push(er)  

                }
                fs.writeFile( 'ErrorsTxtOBS.txt', errors.join('\n'), err => {
                    if(err) throw err
                })
            })
        })
    })
})
