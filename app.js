const express = require('express'), bodyParser = require('body-parser');
const app = express()
var fs = require('fs');
app.use(bodyParser.json())
initiateMultichain = function() {
let multichain = require("multichain-node")({
  port: 7436,
  host: '127.0.0.1',
  user: "multichainrpc",
  pass: "A3HyQyZ3j2FDYc11XWVsgwH76FXH7v5GqNPcxVvhBFmJ"
 });
 return multichain;
}
app.get("/publish", function (request, response) {
 var multichain = initiateMultichain();
multichain.publish({
  stream: 'root',
  key: 'chain1',
  data:{
   "json":
   {
    'exp_block' : 'EXP_BLOCKCHAIN',
    'exp_dev' :  'EXP_DEV',
    'location' : 'LOCATION',
    'linkedIn' : 'LINK',
    'contact' :  'EMAIL',
    'forHire' : TRUE | FALSE
   }
  }
 }, (err, info) => {
  console.log('Response: '+info);
  response.json({transactionId: info});
 })
});
app.listen(3500, () => console.log('Server is up and running'))

