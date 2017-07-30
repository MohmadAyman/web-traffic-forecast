const googleTrends = require('google-trends-api');
var fs = require('fs');
var csvWriter = require('csv-write-stream')

var topics = JSON.parse(fs.readFileSync('../topics', 'utf8'));
var dates = ['2015-07-02 ', '2016-03-15', '2016-03-17 ', '2016-11-15', '2016-11-17 ', '2016-12-31']

var _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

var diff1 = dateDiffInDays(new Date(dates[0]), new Date(dates[1]));
var diff2 = dateDiffInDays(new Date(dates[2]), new Date(dates[3]));
var diff3 = dateDiffInDays(new Date(dates[4]), new Date(dates[5]));

var days_diff = 0;

var wrote=0;

console.log(process.argv[2])

k = process.argv[2];

console.log(topics[k]);

var writer = csvWriter({ headers: [topics[k]]})
writer.pipe(fs.createWriteStream('../trends/'+k+'.csv'))

for (var i = 0; i < 5; i++) {
        googleTrends.interestOverTime({keyword: topics[k], startTime: new Date(dates[i]), 
            endTime: new Date(dates[i+1])}, function(err, results) {
          if (err) console.log('oh no error!', err);
          else {

            json_result = JSON.parse(results);
            // console.log(json_result['default']['timelineData'])

            if(json_result['default']['timelineData'].length == 0){
                if(i==0 || i==1){
                    days_diff = diff1;  
                }else if(i==2 || i==3){
                    days_diff = diff2;
                }else{
                    days_diff = diff3;   
                }

                for (var j = 0; j < days_diff; j++) {
                    // console.log(json_result['default']['timelineData'][j].value);
                    writer.write([0]);
                    wrote++;
                }
            }else{
                for (var j = 0; j < json_result['default']['timelineData'].length; j++) {
                    // console.log(json_result['default']['timelineData'][j].value);
                    writer.write([json_result['default']['timelineData'][j].value])
                    wrote++;
                }
            }
          } 
        }).then(function(){
            if(i==4){
                end_writing();
            }
        })
    i++;
}

var end_writing = function(){
    console.log('time to stop');
    writer.end();
}