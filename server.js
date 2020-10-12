const  express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const path = require('path');

const PORT = 8800;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/getblogs', async (req,res,next) => {
  const {
    query: {
      offset,
      count,
    } = {},
  } = req;

  var options = {
    uri: `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts?number=${count}&offset=${offset}`,
    json: true
  };
 
  try {
    const data = await request(options);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      errors: 'Unable to fetch data'
    });
  }
});

app.post('/relatedposts', async (req,res,next) => {
  const {
    query: {
      postId,
    } = {},
  } = req;

  var options = {
    uri: `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/${postId}/related`,
    method: 'POST',
    body: {},
    json: true,
  };
 
  try {
    const data = await request(options);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      errors: 'Unable to fetch data'
    });
  }
});

app.get('/post', async (req,res,next) => {
  const {
    query: {
      postId,
    } = {},
  } = req;

  var options = {
    uri: `https://public-api.wordpress.com/rest/v1/sites/107403796/posts/${postId}`,
    json: true
  };
 
  try {
    const data = await request(options);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      errors: 'Unable to fetch data'
    });
  }
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, err => {
  if (err) console.error(err);
  console.log(`Ready on port ${PORT}`);
});
