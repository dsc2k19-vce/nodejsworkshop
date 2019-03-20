const express = require('express'); //to access functions from express module
const app = new express();  //create object to access the functions of express module

const bodyParser = require('body-parser');//to access body for a post request

app.set('view engine', 'ejs');//setting template engine as ejs for express

var fs = require('fs');//module for file system functions

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())//telling express to use bodyparser before any request(middleware)



//our login page
app.get('/', function(req, res){ //req is request res is result
    return res.render("login") //we are sending a html page as response
});



//when login button pressed,post request sent here
app.post('/login', function(req, res){

    var userid = req.body.id;//accessing userid from login form
    var password = req.body.pass;//accessing password from login form
    res.statusCode=200;
    var userlist = []
    var data = fs.readFileSync('<filepath>', 'utf8'); 
    //reading file synchronously so that user details can be validated and then proceded to next page

    if(data!="")//checking if data exists in file
    {userlist = JSON.parse(data);}  //parsing data
    for(i=0;i<userlist.length;i++)
    {
        if(userlist[i]["id"]==userid&&userlist[i]["pass"]==password) //checking if user id and password exist
        {
            return res.redirect("/addblog") //showing addblog page if user details are valid
        }
    }

    return res.status(404).send("invalid login") //showing error if invalid credentials
});



//when register button pressed in login page
app.get('/register', function(req, res){
    return res.render("register")  //return register html page
});


//when register form submitted in register page
app.post('/register', function(req, res){
    var emailid = req.body.email //get email id from register form
    var password = req.body.password //get password from form
    //read file asynchronously since we are not bothered about when that data is stored in file..all we need it is to store.
    fs.readFile('<filepath>', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            if(data=="")
            {
                obj = []   ///if file is empty creating an empty list
            }
            else{
                obj = JSON.parse(data);  //if file not empty, getting the data and parsing it
             } 
             obj.push({id: emailid, pass:password}); //appending data to that list
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('<filepath>', json, 'utf8', function callback(){console.log("file written success")}); // write it back 
    }});

    //returning our home page..since file operations here are async, page is rendered immediately
    res.render('home')

});



//displaying home page
app.get('/home', function(req,res){
    res.render("home")
})


//displaying addblog page
app.get('/addblog', function(req, res){
    res.render('addblog')
})



//when upload button pressed in addblog page, post request sent here
app.post('/addblog', function(req, res){

    var blogtitle = req.body.title 
    var blogdesc = req.body.desc
    fs.readFile('<filepath>', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            // console.log(data)
            if(data=="")
                {obj = []}
            else{ obj = JSON.parse(data);}
                // console.log(obj)
             
             obj.push({title: blogtitle, desc:blogdesc});
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('<filepath>', json, 'utf8', function callback(){console.log("file written success")}); // write it back 
    }});

    res.redirect('/home')

})


//display all the blog lists
app.get('/bloglist', function(req, res){

    var data = fs.readFileSync('<filepath>', 'utf8');
    bloglist = JSON.parse(data);
    res.render("bloglist",{bloglist:bloglist}) //here we are sending bloglist to ejs file 
    //ejs file will loop through this list and display the blogs
    
})


app.listen(5000);//used to register a port number for our app
//type localhost:5000/home or localhost:5000/addblog i.e localhost:5000/<urlpath> to see the pages in browser
