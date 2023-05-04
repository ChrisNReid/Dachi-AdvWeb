// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');

// app.use(bodyParser.json());
// app.use(cors());


// const jwt = require('jsonwebtoken');

// function generateToken(email) {
//   // Logic for generating a token based on the email parameter
//   const token = jwt.sign({ email }, 'secret');
//   return token;
// }

// app.post('/api/signup', (req, res) => {
//   const { email, password } = req.body;
//   console.log('email here', email);
//   console.log(password); // access email and password from request body
//   // Here you can handle the sign-up request and send a response back to the client
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }
//   if (!email.endsWith('@surrey.ac.uk')) {
//     return res.status(400).json({ message: 'Email must end with @surrey.ac.uk' });
//   }
//   if (password.length < 6) {
//     return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//   }
 
//   // Here you can save the user data to a database or perform any other necessary actions
//   const token = generateToken(email);
//     // Here you can save the user data to a database or perform any other necessary actions
//     const user = { email, password };
//     axios.post('http://localhost:8080/api/signup', user) // make a POST request to the server with the data
//     .then(response => {
//       const { token } = response.data; // extract the token from the response
//       return res.json({ message: 'User signed up successfully', token }); // send a response back to the client with the token
//     })
//     .catch(error => {
//       console.error(error.message);
//       return res.status(500).json({ message: 'Failed to sign up user frontend' }); // handle errors
//     });  
//   });



// app.post('/api/signin', (req, res) => {
//     // Here you can handle the sign-up request and send a response back to the client
//     //if correct const jwt = require('jsonwebtoken');

//     // Inside the sign-in endpoint handler
//     // const user = { email, password };
//     // const token = jwt.sign(user, 'secret');
//     // res.json({ token });
//   });

//   app.get('/', (req, res) => {
//     res.send('Hello, world!');
//   });

// const serverPORT = process.env.PORT || 5000;
// app.listen(serverPORT, () => console.log(`Server started on port ${serverPORT}`));
