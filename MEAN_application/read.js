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