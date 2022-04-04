const express = require('express')
const { redirect } = require('express/lib/response')

const app = express()
const port = 5002

app.set('view engine', 'hbs') // set view engine hbs

app.use('/public', express.static(__dirname + '/public')) // set public path/folder

app.use(express.urlencoded({extended: false}))

// app.get('/', function(req, res) {
//     res.render('index')
// })

app.get('/blog', function(req, res) {
    res.render('blog')
})

let blogs = [
    {
        project: 'Title Data Dummy',
        duration: '2 hari',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quae ab esse deleniti in,',
        node: 'fa-brands fa-node-js'
       
    }
]

let isLogin = true

app.get('/', function(req, res) {
    console.log(blogs);

    let dataBlogs = blogs.map(function(item){
        return {
            ...item,
            isLogin: isLogin,
            description: item.description.slice(0, 60) + '....'
        }
    })

    console.log(dataBlogs);

    console.log(blogs);

    res.render('index', {isLogin, blogs: dataBlogs})
})

app.post('/', function(req, res) {    
    // console.log(req.body);
    let data = req.body

    data = {
        project: data.inputProject,
        duration: getDate(data.inputStart , data.inputEnd), 
        description: data.inputDescription,
        node: data.inputNode,
        react: data.inputReact,
        javascript: data.inputJavascript,
        html: data.inputHtml
        // image: data.image
    }


    blogs.push(data)
    // console.log(blogs);

    res.redirect('/')
})

app.get('/blog-detail/:index', function(req, res) {
    console.log(req.params);

    // let index = req.params.index
    let blog = blogs[req.params.index]

    res.render('blog-detail', blog)
})


app.get('/delete-blog/:index', function(req, res) {

    let index = req.params.index

    console.log(index);
    blogs.splice(index, 1)

    res.redirect('/')
})


app.get('/update-blog/:index', function(req, res) {

    let index = req.params.index
    let blog = blogs[index]

    res.render('update-blog', {edit: blog, index})
})

app.post('/update-blog/:index', function(req, res) {
    let data = req.body
    let index = req.params.index 

    blogs[index].project = data.inputProject,
    blogs[index].start = data.inputStart,
    blogs[index].end = data.inputEnd,
    blogs[index].duration = getDate(data.inputStart , data.inputEnd),
    blogs[index].description = data.inputDescription,
    blogs[index].node = data.inputNode,
    blogs[index].react = data.inputReact,
    blogs[index].html = data.inputHtml,
    blogs[index].javascript = data.inputJavascript

    res.redirect('/')
})

function getDate(start, end) {


    let inputStart = new Date(start);
    let inputEnd = new Date(end);
    let hasil = inputEnd - inputStart;
    let milisecond = 1000;
    let second = 3600;
    let hours = 24;
    let day = Math.floor(hasil / (milisecond * second * hours));
    let month = Math.floor(day / 30);


    if (day <= 30) {
        return `${day} hari`;
    } else if (day > 30 ) {
        return `${month} bulan`;
    }
}




app.get('/contact', function(req, res) {
    res.render('contact')
})




app.listen(port, function(){
    console.log(`Server listen on port ${port}`);
})