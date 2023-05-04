// // const { createClient } = require('@supabase/supabase-js');
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(express.json());

// // const supabaseUrl = 'https://ppayoicayizfiezyqdtf.supabase.co';
// // const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYXlvaWNheWl6ZmllenlxZHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI0NDU2NzcsImV4cCI6MTk5ODAyMTY3N30.8BhS7mRtSyEZKeQMg9B80A_Tv9PbocQZjCQ0ZU3YisI';
// // const supabase = createClient(supabaseUrl, supabaseKey);

// // const authRouter = require('./auth');
// // app.use('/auth', authRouter);

// const corsOptions = {
//   origin: 'http://localhost:3000', // allow requests from this origin
//   optionsSuccessStatus: 200// return 200 instead of 204 for OPTIONS requests
// };

// app.use(cors(corsOptions));


// app.post('/api/signup',(req, res) => {
//   const { email, password } = req.body;
//   console.log('email here', email);
//   console.log(password); 
//   // email validation
//   if (!email || !password) {
//     return res.json({ message: 'Email and password are required' });
//   }
//   if (!email.endsWith('@surrey.ac.uk')) {
//     return res.json({ message: 'Email must end with @surrey.ac.uk' });
//   }
//   if (password.length < 6) {
//     return res.json({ message: 'Password must be at least 6 characters long' });
//   }
//   const user = { email, password };

//   try {
//     console.log('backend connection made.');
//     // handle sign up
//     return res.json({ message: 'Sign up successful' });

//   } catch (error) {
//     console.error(error.message);
//     res.json({ message: 'Failed to sign up server' });
//   }
 
// });

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });






// // 

// process.env.PORT = 8080;
// // Start server
// app.listen(process.env.PORT, () => {
//   console.log(`hii Server started on port ${process.env.PORT}`);
// });


// // module.exports = { supabase };

