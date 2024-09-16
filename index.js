import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  password: '&ç§"',
  database: "Book",
  host: "localhost",
  port: 5432,
});

db.connect();

app.get("/user", async (req, res) => {
  try {
    const username = req.query.name;
    const result = await db.query(
      "SELECT  books.book_id , url ,title , read_date, rating, idea ,isbn FROM users JOIN books ON books.user_id = users.id WHERE username = $1; ",
      [username]
    );
    const response = result.rows ; 
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});
// view the note 
app.get("/view/:id" , async (req , res)=>{
  try{
    const username = req.query.name ; 
    const id = req.params.id ; 
    const response = await db.query("SELECT  * FROM users JOIN books ON books.user_id = users.id WHERE username = $1 AND books.book_id = $2 " , [username , id]);
    const result = response.rows; 
    res.json(result);
  }catch(error){
    console.log(error.message);
  }
});
app.patch("/edit/:id" , async(req , res )=>{
  try{
    const id = req.params.id ; 
    let { title, date, rating, idea, notes } = req.body;
    const parsedRating = parseInt(rating, 10);
    if(notes==""){notes=null}
    await db.query(
      "UPDATE books SET title = $1, read_date = $2, rating = $3, idea = $4, notes = $5 WHERE book_id = $6;",
      [title, date, parsedRating, idea, notes, id]
    );
    res.status(200).json({message:"update successful."});
  }catch(error){
    console.log(error.message);
    res.status(500).json({error : "error in the api server ."});
  }
});
app.delete("/delete/:id" , async (req , res )=>{
  try{
    const id = req.params.id ; 
    await db.query("DELETE FROM books WHERE book_id=$1" , [id]);
    res.status(200).send("Deleted book succefully ...");

  }catch(error){
    res.send(500).send("API server error");
  }
});

app.post("/add" , async(req , res)=>{
  try{
    const data = req.body ; 
    const result = await db.query("SELECT id FROM users WHERE username = $1 " , [data.username]);
    const userID = result.rows[0].id;
    await db.query("INSERT INTO books (title , read_date , rating , idea , notes , user_id ) VALUES ($1,$2,$3,$4,$5,$6);",
      [data.title , data.date , parseInt(data.rating), data.idea , data.notes , userID]
    );
    res.status(200).send("book succefully aded");
  }catch(error){
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log("API server running  ");
});


