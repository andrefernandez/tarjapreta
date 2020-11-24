const express = require('express');
const path = require('path');
const nomeApp = 'donttouch';
const app = express();

app.use(express.static(`${__dirname}/${nomeApp}`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/views/index.handlebars`));
});

app.listen(process.env.PORT || 4200);
