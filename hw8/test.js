var querystring=require('querystring');
var fs=require('fs');
var arr=[];
var json=JSON.stringify(arr);
fs.writeFileSync('output.json',json,function(err){
	if(err){
		return console.error(err);
	}
	console.log('123');
});
fs.readFile('output.json',function(err,data){
			if(err){
				return console.error(err);
			}
			console.log(JSON.parse(data));
});