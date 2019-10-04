var fs = require('fs')
var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2", 
    endpoint: "dynamodb.us-east-2.amazonaws.com",
    accessKeyId: "AKIAJ2LVHFHEX7ARP5JQ",
    secretAccessKey: "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"
});
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "DhjFNng38H3AQZ7p_sensor_tag_data";
var uid_from_file,x = 1,locked = 1,prev_req = -1;

function write_into_live_file(filename,insert_data){
  fs.writeFile(filename, insert_data, function (err) {
    if (err) throw err;
    //console.log('Saved!');
  });  
  }
  
  function write_into_historical_file(filename,insert_data){
  fs.appendFile(filename,insert_data, function (err) {
    if (err) throw err;
    //console.log('Updated!');
  });
  }

function update_uid_file(uiid){
fs.writeFile('read_from_dynamodb.txt', (uiid + 1), function (err) {
  if (err) throw err; 
});  
}

function fun(){
uid_from_file = fs.readFileSync('read_from_dynamodb.txt',{encoding: 'utf8'}); 
uid_from_file = Number(uid_from_file.toString());  
if(!uid_from_file){
  if(locked == 1){
  uid_from_file = x + 1;
  }
  else{
    uid_from_file = x;
  }
} 
  //console.log("UID = ",uid_from_file);
var params = {
    TableName: table,
    Key:{
        "uid": uid_from_file
        }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
	fun();
    } else { 
        console.log("UID = ",uid_from_file);
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        if(!(JSON.stringify(data, null, 2).length == 2)){
          //console.log(data["Item"]["x_axis"]);
            x_coordinate = data["Item"]["x_axis"];
            x_coordinate_live_data = '[[' + (new Date()).getTime() + ',' + x_coordinate + ']]';
            write_into_live_file('../x_live_data.json',x_coordinate_live_data);
            x_coordinate_historical_data = ',' + '[' + (new Date()).getTime() + ',' + x_coordinate + ']';
            write_into_historical_file('../x_historical_data.txt', x_coordinate_historical_data);
          
          //console.log(data["Item"]["y_axis"]);
          y_coordinate = data["Item"]["y_axis"];
          y_coordinate_live_data = '[[' + (new Date()).getTime() + ',' + y_coordinate + ']]';
          write_into_live_file('../y_live_data.json',y_coordinate_live_data);
          y_coordinate_historical_data = ',' + '[' + (new Date()).getTime() + ',' + y_coordinate + ']';
          write_into_historical_file('../y_historical_data.txt', x_coordinate_historical_data);
        
          //console.log(data["Item"]["z_axis"]);
          z_coordinate = data["Item"]["z_axis"];
          z_coordinate_live_data = '[[' + (new Date()).getTime() + ',' + z_coordinate + ']]';
          write_into_live_file('../z_live_data.json',z_coordinate_live_data);
          z_coordinate_historical_data = ',' + '[' + (new Date()).getTime() + ',' + z_coordinate + ']';
          write_into_historical_file('../z_historical_data.txt', z_coordinate_historical_data);
        
  x = uid_from_file; 
  update_uid_file(uid_from_file);
  locked = 1;
      }
      else{
        locked = 0;
      } 
	fun();
    }
});

} 
fun();