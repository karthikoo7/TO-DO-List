const express = require("express");
const app = express();
const path = require('path');
var methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');

const port = 8080;

app.use(express.urlencoded({extended:true}));//to parse data into readable format 
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));//to set the path for views folder to be accesible 

app.use(express.static(path.join(__dirname,"public")));// to set the path for public folder to accessible

let posts = [
{   
    id: uuidv4(),
    username : "10:40",
    content:" Prepare for Interview.",
},
{
    id: uuidv4(),
    username : "15:00",
    content:" Go For a Walk",
},
{
    id: uuidv4(),
    username : "22:00",
    content:" Read a Book.",
}
];

app.get("/posts",(req,res)=>{
  
    res.render("index.ejs",{posts}); //remem to send posts ...:)
});

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});

app.post("/posts/new",(req,res)=>{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");

});

app.get("/posts/:id",(req,res)=>{

    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);// ???
    res.render('show.ejs', {post}); 

});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content; //storing newcontent 
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");

});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('edit.ejs',{ post });
});

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=> id !== p.id);//to filter out posts != to one that should be deleted. the post left is deleted,
    res.redirect("/posts")

});



app.listen(port,()=>{
    console.log(`server is live @...${port}`);
});