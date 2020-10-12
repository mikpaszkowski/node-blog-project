"use strict";

var deleteButton = document.querySelector('a.delete');
deleteButton.addEventListener('click', function (e) {
  var endPoint = "/blogs/".concat(deleteButton.dataset.doc);
  fetch(endPoint, {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return console.log(data);
  })["catch"](function (err) {
    console.log(err);
  });
});