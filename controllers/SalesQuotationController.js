'use strict';

var connection = require('../config/database/conn');

exports.index = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocNum" as "docnum", "DocEntry" as "dockey", SUBSTR_BEFORE("DocDate", ' + "'" + '.' + "'" + ') as "DocDate" from oqut where CANCELED = ' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'O' + "'" + ' and "OwnerCode" =  ' + "'" + req.query.uid + "'" + 'order by "DocNum" DESC';

  connection.runQuery(res, sql);
};

exports.addSQ = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select * from oqut where CANCELED = ' + "'" + 'N' + "'" + ' and "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" LIKE  ' + "'%" + req.query.code + "%'" + ' and "OwnerCode" =  ' + "'" + req.query.uid + "'" + 'order by "DocNum" DESC limit 20';

  connection.runQuery(res, sql);
};

exports.close = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var sql = 'select "DocEntry" from oqut where "DocStatus" = ' + "'" + 'O' + "'" + ' and "DocNum" in  (190340641,190340675,190341112,190341224,190341400,190341439,190341472,190341498,190341502,190341524,190341527,190341532,190341533,190341537,190341551,190341554,190341555,190341556,190341558,190341559,190341560,190341561,190341562,190341569,190341570,190341575,190341576,190341583,190341595,190341605,190341607,190341612,190341616,190341617,190341618,190341619,190341620,190341621,190341622,190341624,190341630,190341631,190341637,190341639,190341640,190341641,190341642,190341651,190341652,190341668,190341669,190341674,190341675,190341676,190341679,190341680,190341681,190341687,190341689,190341691,190341694,190341697,190341699,190341700,190341704,190341707,190341708,190341713,190341714,190341716,190341718,190341721,190341726,190341728,190341732,190341734,190341735,190341740,190341742,190341750,190341753,190341756,190341764,190341767,190341769,190341773,190341774,190341779,190341780,190341783,190341788,190341789,190341791,190341792,190341793,190341797,190341802,190341803,190341808,190341813,190341814,190341818,190341820,190341823,190341828,190341833,190341834,190341837,190341840,190341842,190341847,190341848,190341850,190341853,190341856,190341857,190341859,190341863,190341871,190341877,190341878,190341879,190341885,190341888,190341889,190341891,190341897,190341899,190341903,190341909,190341911,190341918,190341926,190341927,190341931,190341935,190341936,190341937,190341938,190341948,190341949,190341968,190341969,190341970,190341971,190341972,190341976,190341977,190360018,190360019,190360020,190360021,190360022)';

  connection.runQuery(res, sql);
};