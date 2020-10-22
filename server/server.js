const express = require('express');

require('dotenv').config();

//express server
const app = express();

//rest endpoint
app.get('/rest', (req, res) => {
  res.json({ data: 'you hit rest endpoint' });
});

// port
app.listen(process.env.PORT, () =>
  console.log(`server is ready at PORT:${process.env.PORT}`)
);
