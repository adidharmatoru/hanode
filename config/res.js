'use strict';

exports.success = function(values, res) {
  var data = {
    'status': 200,
    'message': 'success',
    'data': values
  };
  res.json(data);
  res.end();
};

exports.err = function(values, res) {
  res.json(values);
};

exports.notFound = function(res) {
  var data = {
    'status': 404,
    'message': 'Data Not Found'
  };
  res.json(data);
  res.end();
};