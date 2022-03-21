const express = require('express');
const getUSstates = require('./getpop');
//const getPopulation = require('./getpop');

const app = express();
app.use(express.static('home'));
app.get('/api/states', async(req, res)=>{
const states = await getUSstates();
res.json(states);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    //console.log(`listening port http://localhost:${port}`);
    console.log('listening port http://localhost:', port);

});
