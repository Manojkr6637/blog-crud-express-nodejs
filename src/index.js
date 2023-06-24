 const path = require('path');
 const hbs = require('hbs')
 const express = require('express');
 const port = process.env.PORT || 3000
 const publicDirectory = path.join(__dirname, '../public')
 const app = express()
 app.set('view engine', 'hbs')

 app.use(express.static(publicDirectory));
 const uuid = require('uuid')

 const viewsPath = path.join(__dirname, '../templates/views');
 const partialsPath = path.join(__dirname, '../templates/partials');
 app.set('views', viewsPath);
 hbs.registerPartials(partialsPath);
 const blogs = []
 app.get('/', (req, res) => {
     res.render('index', {
         title: 'Blogs here update',
         body: 'Good resources of blogs here upate 11',
         datas: blogs,
         isRecoud: blogs.length,
     });
 })
 app.get('/blogs', (req, res) => {
     res.render('blogs', {
         title: 'Blogs here',
         body: 'Good resources of blogs here',
         datas: blogs,
         isRecoud: blogs.length,
     });
 })
 app.get('/add', (req, res) => {
     const title = req.query.title
     const description = req.query.description
     if (title) {
         const ob = {
             id: uuid.v4(),
             title: title,
             description: description,
             created: new Date().getDay() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
         }
         blogs.unshift(ob)
         res.redirect('/')
     } else {

         res.render('add', {
             title: 'Blogs here',
             body: 'Good resources of blogs here',

         });
     }

 })
 app.get('/edit/:id', function(req, res) {
     const id = req.params.id
     const title = req.query.title
     const description = req.query.description
     if (!id) {
         res.send({
             error: "Please enter id"
         })
     }
     if (title) {
         blogs = blogs.map((item) => {
             if (item.id == id) {
                 blog.title = title
                 blog.description = description
             }
             return item;
         })

         res.redirect('/')
     } else {
         const blogDetail = blogs.filter((item) => item.id == id)
         console.log(blogDetail, id)
         res.render('editid', {
             title: 'EditBlog',
             body: 'Edit detail',
             blog: blogDetail[0],
         })
     }
 })
 app.get('/blog/:id', function(req, res) {
     const id = req.params.id
     if (!id) {
         res.send({
             error: "Please enter id"
         })
     }
     const blog = blogs.filter((item) => item.id == id)
     res.render('blogid', {
         title: 'Blog',
         body: 'BLog detail',
         blog: blog[0],
     })
 })
 app.get('/delete/:id', function(req, res) {
     const id = req.params.id
     if (!id) {
         res.send({
             error: "Please enter id"
         })
     }
     const blogsnew = blogs.filter((item) => item.id != id)
     res.render('index', {
         title: 'Blog',
         body: 'BLog detail',
         datas: blogsnew,
         isRecoud: blogsnew.length,
     })
 })
 app.get('/gallery', (req, res) => {
     res.render('gallery', {
         title: 'Gallery here',
         body: 'Good resources of Gallery here',
         datas: [{
                 id: 1,
                 title: 'Gallery ',
                 image: './../images/js.png'
             },
             {
                 id: 2,
                 title: 'Gallery ',
                 image: './../images/js.png'
             },
             {
                 id: 3,
                 title: 'Gallery ',
                 image: './../images/js.png'
             }
         ]
     });
 })

 app.get('/contact', (req, res) => {
     res.render('contact', {
         title: 'Contact',
         body: "Contact details",
         name: 'Manoj Kumar Sah',
         address: 'New Delhi',
         email: 'test@test.com'
     })
 })

 app.listen(port, () => {
     console.log('Listening don port ' + port)
 })