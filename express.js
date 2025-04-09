const express = require('express')
const app = express()
const PORT = 5501;
app.get('/',(req, res) => {
   res.end('Server is running!'); 
});
app.listen(PORT,() => {
    console.log('Server running on http://localhost:${PORT}');
});