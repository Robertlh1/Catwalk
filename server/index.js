const express = require('express');
const axios = require('axios');
const path = require('path');
const { API_ROUTE, API_KEY } = require('./config');

const app = express();
app.use('/product', express.static(path.join(__dirname, '../client/dist/')));
app.use(express.urlencoded({ extended: true }));

app.all('/api/*', async (req, res, next) => {
  const config = {
    url: `${API_ROUTE}${req.params['0']}`,
    method: `${req.method}`,
    data: `${req.body}`,
    headers: {
      Authorization: API_KEY,
    },
  };
  const responseData = await axios(config);
  res.json(responseData.data);
  res.end();
  next();
});

app.listen(3000, () => {
  console.log('running on port 3000');
});