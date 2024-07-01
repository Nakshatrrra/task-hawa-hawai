const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const airportRoutes = require('./routes/airport');

app.use('/airport', airportRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
