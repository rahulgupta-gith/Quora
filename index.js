const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const  {v4 : uuidv4} = require('uuid');
const methodoverride = require("method-override");
app.use(methodoverride("__method"));

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "rahul",
        content: "this shall to pass",
    },
    {
        id: uuidv4(),
        username: "eve",
        content: "change is permanent",
    },
    {
        id: uuidv4(),
        username: "gandhi",
        content: "change yourself as you want the change you want to see in the world",
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.listen(port,()=>{
    console.log("listening at port ");
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.post("/posts", (req,res)=>{
    let{username , content} = req.body;
    let id = uuidv4();
    posts.push({username, content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post} );
})  

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
})