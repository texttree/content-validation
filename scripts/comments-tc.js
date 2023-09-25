const fs = require('fs')
const path = require('path')

const [project, book] = process.argv.slice(2)
const corPath = `C:/Users/TimYancev/translationCore/projects/${project}_${book}_book/.apps/translationCore/checkData/comments/${book}/`
const commentFile = `${project}_${book}_commets.tsv`

function searchComments(corPath, commentFile) {
  const comments = [
    'bookId	chapter	verse	tool	text	userName	activeBook	activeChapter	activeVerse	username	modifiedTimestamp\n',
  ]
  fs.readdirSync(corPath).forEach((chapter) => {
    fs.readdirSync(`${corPath}/${chapter}`).forEach((verse) => {
      const verseDir = `${corPath}/${chapter}/${verse}`
      const correctСomment = fs
        .readdirSync(verseDir)
        .filter((comment) => path.extname(comment) === '.json')
        .map((comment) => ({
          name: comment,
          stats: fs.statSync(path.join(verseDir, comment)),
        }))
        .sort((a, b) => b.stats.mtimeMs - a.stats.mtimeMs)
      if (correctСomment.length > 0) {
        const latestCommentPath = path.join(verseDir, correctСomment[0].name)
        const contents = fs.readFileSync(latestCommentPath, 'utf8')
        const data = JSON.parse(contents)
        data.text = data.text.replaceAll('\n', ' br ')
        data.text = data.text.replaceAll('"', '“')
        data.text = data.text.replaceAll('\t"', '')
        data.text = data.text.replaceAll(' 	', '')
        data.text = data.text.replaceAll('\\', '')
        const {
          text,
          userName,
          activeBook,
          activeChapter,
          activeVerse,
          username,
          modifiedTimestamp,
        } = data
        const ref = data.contextId.reference
        const output = `${ref.bookId}	${ref.chapter}	${ref.verse}	${data.contextId.tool}	${text}	${userName}	${activeBook}	${activeChapter}	${activeVerse}	${username}	${modifiedTimestamp}	\n`
        comments.push(output)
      }
      fs.writeFileSync(commentFile, comments.join(''))
    })
  })
  console.log('комментарии записаны')
}

searchComments(corPath, commentFile)
