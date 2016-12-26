var RSS = require('rss-parser');

function getUtvarpsFrettir(){
  return new Promise(function (fulfill, reject){
    var thaettir = [];
    var oneDone = false;
    RSS.parseURL('http://podcast.ruv.is/kvoldfrettir/podcast.xml', function(err, parsed) {
      if(err) reject(err);
      parsed.feed.entries.forEach(function(entry) {
        thaettir.push({date: (new Date(entry.pubDate)), link: entry.guid});
      });
      if(!oneDone){oneDone = true} else{
        thaettir.sort(function(a,b){
          return b.date - a.date;
        });
        fulfill(thaettir);
      }
    });
    RSS.parseURL('http://podcast.ruv.is/hadegisfrettir/podcast.xml', function(err, parsed) {
      if(err) reject(err);
      parsed.feed.entries.forEach(function(entry) {
        thaettir.push({date: (new Date(entry.pubDate)), link: entry.guid});
      });
      if(!oneDone){oneDone = true} else{
        thaettir.sort(function(a,b){
          return b.date - a.date;
        });
        fulfill(thaettir);
      }
    });
  });
}

function getNewestUtvarpsFrettir(){
  return new Promise(function (fulfill, reject){
    getUtvarpsFrettir().then(function(frettir) {
      fulfill(frettir);
    }).catch(reject(error));
  });
}

module.exports = getUtvarpsFrettir;
