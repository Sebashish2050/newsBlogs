const callToApi = (url, methods, body = {}) => {
  switch(methods) {
    case 'GET':
      return fetch(url)
        .then(response => response.json())
        .catch(error => error);
    case 'POST':
      return fetch(url, {
        method: 'post',
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .catch(error => error);
    default:
      console.log('No methods found');
  }
}

module.exports = callToApi;
