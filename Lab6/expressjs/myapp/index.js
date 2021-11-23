const express = require('express')
const app = express()
const port = 3000

app.use(express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: false
})); 

var books = []

app.get('/bookinventory', (req, res) => {
    res.send('Welcome to Timothy Library... Sorta... This Lab is Hard')
})

app.get('/bookinventory/list', function(req, res){

   var html = '<p>'
   for (var i = 0; i < books.length; i++) {
        html = html + 'Book Title: ' + books[i].book + '<br>' + 'Author: ' + books[i].author + '<br>' + 'Publisher: '+ books[i].publisher + '<br>' + 'Date: ' +  books[i].date + '<br>'+'<br>';
    }
    html += '</p>'
   res.send('Timothy List of books: ' + html);
});


app.get('/bookinventory/add', function(req, res){

  var html = '<br><form action="/bookinventory/addbook" method="post"><label for="bname">Book Title:</label><br><input type="text" id="bname" name="bname"><br><label for="bauthor">Book Author:</label><br><input type="text" id="bauthor" name="bauthor"><br><label for="bpub">Publisher:</label><br><input type="text" id="bpub" name="bpub"><br><label for="bdate">Date:</label><br><input type="text" id="bdate" name="bdate"><br><input type="submit" value="Submit"><br></form>'

  res.send('Timothy requires you to insert a book: ' + html);
});

app.post('/bookinventory/addbook', function(req, res){



  var obj = JSON.parse(JSON.stringify(req.body));
  console.log(obj);
  
  var new_book = obj.bname;
  var new_author = obj.bauthor;
  var new_pub = obj.bpub;
  var new_bdate = obj.bdate;

  var new_json = {'book': new_book,'author': new_author, 'publisher': new_pub, 'date': new_bdate};
  /*
  var new_jen = {'author': new_author};
  var new_jin = {'publisher': new_pub};
  var new_jan = {'date': new_bdate};
  */
  books.push(new_json);
  /*
  books.push(new_jen);
  books.push(new_jin);
  books.push(new_jan);
  */
  res.send('Book: ' + new_book + '<br>Author: ' + new_author + '<br>Publisher: ' + new_pub + '<br>Date: ' + new_bdate + '<br> is added!<br> <a href="/bookinventory/list"> Click to check Book List</a>');
  /*                                   */
  
}

);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})