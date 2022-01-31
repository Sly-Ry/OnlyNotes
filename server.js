const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// Tells the server that any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. 
app.use('/api', apiRoutes);
// Router serves back our HTML routes.
app.use('/', htmlRoutes);



// The app.listen() method returns an http.Server object 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
