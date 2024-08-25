const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogpostRoutes = require('./routes/blogRoutes');

const cors = require('cors');


const USER_NAME = 'Anoushka';
const PASSWORD = '1234';
const DB_NAME = 'merndb';
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.gtl2u.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=MernCluster`;
const PORT = 3099;


const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

mongoose.connect(DB_URI)
    .then((result) => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1); 
    });



app.get('/', (req, res) => {
    res.send({ message: 'Blogpost API 2.0' });
});


app.use('/blogs', blogpostRoutes);


app.use((req, res) => {
    res.status(404).send({ error: '404: Page not found' });
});
