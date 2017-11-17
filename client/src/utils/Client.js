/* eslint-disable no-undef */
function listItems(callback) {
  fetch('items/', {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback)
    .catch(() => {
      console.error('Error in fetching items!'); // eslint-disable-line no-console
    });
}

function addItem(item, callback) {
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('items/', fetchData)
    .then(checkStatus)
    .then(callback)
    .catch(() => {
      console.error('Error in adding items!'); // eslint-disable-line no-console
    });
}

function deleteItem(itemId, callback) {
  const fetchData = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('items/'.concat(itemId), fetchData)
    .then(checkStatus)
    .then(callback)
    .catch(() => {
      console.error('Error in deleting items!'); // eslint-disable-line no-console
    });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { listItems, addItem, deleteItem };
export default Client;
