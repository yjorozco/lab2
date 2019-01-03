
const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const route = require('./routes')


let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        {text: 'Cruel…..var { house, mouse} = No type optimization at all',
        text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
        text: '(p1,p2)=>{ … } ,i understand this ,thank you !'   }  
      ]
      }
    ]
  }


let app = express()



app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.use((req, res, next) => {
  req.store = store
  next()
})

app.get('/posts', route.posts.getPosts);
app.post('/posts', route.posts.addPost);
app.put('/posts/:postId/', route.posts.updatePost);
app.delete('/posts/:postId/', route.posts.removePost);

app.get('/posts/:postId/comments', route.comments.getComments);
app.post('/posts/:postId/comments', route.comments.addComment);
app.put('/posts/:postId/comments/:commentId', route.comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', route.comments.removeComment);

app.listen(3000)