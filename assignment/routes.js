const fs = require('fs');
const { buffer } = require('stream/consumers');

const requesHanlder = (req,res) =>{
  const url = req.url;
  const method = req.method;

  if(url === '/'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write(`<body>
    <h1>Hi this is my assignment</h1>
    <form action="/createUser" method="POST">
      <strong>Username</strong>
      <input type="text" name="createUser">
      <button type="submit">Create User</button>
    </form>
    </body>`)
    res.write('</html>');
    return res.end();
  }
  if(url === '/users'){
    res.write('<html>');
    res.write('<ul><li>User1</li><li>User2</li></ul>');
    res.write('</html>');
    return res.end();

  }
  if(url === '/createUser' ){
    const body = [];
    req.on('data', (chunk)=>{
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end',() =>{
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('user.txt',message,err =>{
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
      });
    });
   
  }
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<html>');
  // res.write('<head><title>My First Page</title><head>');
  // res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  // res.write('</html>');
  // res.end();
}

module.exports = requesHanlder;