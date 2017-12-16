var Traffic = require('mongoose').model('Traffic');
    //geoip = require('./geoip/service.geoip.server.js');

exports.register = function(req, res, page, data) {

  var newTraffic = new Traffic();


  if(req.headers)                      newTraffic.ip = req.headers['x-forwarded-for'];
  if(!newTraffic.ip && req.connection) newTraffic.ip = req.connection.remoteAddress;
  if(!newTraffic.ip && req.socket)     newTraffic.ip = req.socket.remoteAddress
  if(!newTraffic.ip && req.connection)
    if(req.connection.socket) newTraffic.ip = req.connection.socket.remoteAddress;

  if(!newTraffic.ip) newTraffic.ip = '0.0.0.0';

  newTraffic.page = page;
  newTraffic.data = data;

  newTraffic.save( function(err) {
    if (err) {
      console.log(err);
    }
  });
}

function dailyTrafficOf(date, callback) {
  var yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  var tomorrow = new Date(yesterday.valueOf() + 1*864E5);

  return Traffic.
          where('date').gt(yesterday).lt(tomorrow).
          sort({ date: 1 }).
          select('ip date page data').
          exec(callback);
}

function dailyData(date, callback) {

  var weekDayName = ['Sun', 'Mon', 'Tue', 'Wdn', 'Thu', 'Fri', 'Sat'];

  dailyTrafficOf(date, function (err, traffic) {
    data = {};
    data.date = date;
    data.label = weekDayName[date.getDay()];
    data.traffic = [];

    if (!traffic) return;

    traffic.forEach( function(record) {
      if( data.traffic.some( function(e) {
        return e.ip === record.ip;
      } ))
        return;

      var i = {};
      i.ip = record.ip;
      i.data = traffic.filter ( function(t) {
          return t.ip === i.ip;
      });
      data.traffic.push(i);
    });

    return callback(data);

  });
};

function weeklyData(date, callback) {
  var week = [];

  week.push(new Date(date.valueOf() - 0 * 864E5));
  week.push(new Date(date.valueOf() - 1 * 864E5));
  week.push(new Date(date.valueOf() - 2 * 864E5));
  week.push(new Date(date.valueOf() - 3 * 864E5));
  week.push(new Date(date.valueOf() - 4 * 864E5));
  week.push(new Date(date.valueOf() - 5 * 864E5));
  week.push(new Date(date.valueOf() - 6 * 864E5));

  var weekData = []

  dailyData(week[0], function(data) {
    //if(data) data.label = 'today'
    weekData.push((data));
    dailyData(week[1], function(data) {
      //if(data) data.label = 'yesterday'
      weekData.push((data));
      dailyData(week[2], function(data) {
        weekData.push((data));
        dailyData(week[3], function(data) {
          weekData.push((data));
          dailyData(week[4], function(data) {
            weekData.push((data));
            dailyData(week[5], function(data) {
              weekData.push((data));
              dailyData(week[6], function(data) {
                weekData.push((data));
                return callback(weekData);
              });
            });
          });
        });
      });
    });
  });
}


exports.render = function(req, res) {

    var trafficData = {};

    if(!req.query.year || !req.query.month || !req.query.day) trafficData.date = new Date(Date.now());
    else trafficData.date = new Date(req.query.year,req.query.month,req.query.day);

    trafficData.weekChart = {
        labels: [],
        datasets: [{
          label: "",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: []
        }]
      };

//    geoip.lookup('88.22.128.1');

    weeklyData(trafficData.date, function(week){

        trafficData.weekData = week;

        trafficData.weekData.forEach( function(day){
          trafficData.weekChart.labels.push(day.label);
          if(day.traffic) trafficData.weekChart.datasets[0].data.push(day.traffic.length);
          else trafficData.weekChart.datasets[0].data.push(0);
        });

        res.render('backend/traffic', trafficData);

    });

}
