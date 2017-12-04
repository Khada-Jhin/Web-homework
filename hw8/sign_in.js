var http=require('http');
var url=require('url');
var fs=require('fs');
var path=require('path');
var querystring=require('querystring');
var users=[];

var server=http.createServer(function(request,response){
	var temp=fs.readFileSync('user.json');
	if(temp!=''){
		users=JSON.parse(temp);
	}
	//console.log(users);
	var pathname=url.parse(request.url).pathname;
	var query=url.parse(request.url).query;
	var queryjson=querystring.parse(query);
	var htmlpath='./index/index.html';
	var exit=false;
	var query_arr=[];
	var user;

	if('/favicon.ico'==pathname||'/index/favicon.ico'==pathname){
		return;
	}	

	for(var temp in queryjson){
		query_arr.push(temp);
	}

	for(var i=0;i<users.length;i++){
		if(users[i].username==queryjson.username){
			exit=true;
            user=users[i];
		}
	}
	if(request.method=='GET'){
		if(pathname=='/'){
			if(exit==true&&query_arr.length==1&&query_arr[0]=='username'){
				reply(user,response);
			}
			else {
				var html=fs.readFileSync(htmlpath);	
				response.writeHead(200);
				response.write(html);
				response.end();							
			}
		}
		else{
			var file=fs.readFileSync('./index'+pathname,function(err,data){
				if(err){
					not_found(response,pathname);
					return console.error(err);
				}
				else{
					return data;
				}
			});
			response.writeHead(200);
			response.write(file);
			response.end();			
		}
	}
	if(request.method=='POST'){
		addnew(request,response);
	}
});
server.listen(8000,function(){
	console.log("Server listening on port 8000!");
});
function reply(user, response) {
    console.log(user);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<style type='text/css' >"+
        "body { "+
            "background-image: url('2.png');"+
			"background-size: 100%;"+
    		"background-repeat: no-repeat;"+            
        "} \
        p, h1 { \
            text-align: center; \
            color: white; \
        } \
        p {font-size: 16pt;} \
        </style>"
    );
    response.write("<title>Hello World Page</title>");
    response.write("<meta charset='utf-8' />");
    response.write("</head>");
    response.write("<body>");
    response.write("<h1>用户详情</h1> \
                    <p>用户名: " + user.username + "</p></ br>"
                    + "<p>学号: " + user.std_id + "</p></ br>"
                    + "<p>电话: " + user.phone + "</p></ br>"
                    + "<p>邮箱: " + user.email + "</p></ br>"
        );
    response.write("</body>");
    response.write("</html>");
    response.end();
}
function addnew(request,response){
	var userflag = false, idflag = false, phoneflag = false, emailflag = false;
    var userdata="" ;
    var userjson ;

    request.setEncoding('utf8');
    request.addListener('data', function(chunk) {
        userdata += chunk;
    });
    request.addListener('end', function() {
        userjson = querystring.parse(userdata);
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == userjson.username) {
                userflag = true;
            }
            if (users[i].std_id == userjson.std_id) {
                idflag = true;
            }
            if (users[i].phone == userjson.phone) {
                phoneflag = true;
            }
            if (users[i].email == userjson.email) {
                emailflag = true;
            }
        }

        // 信息重复时保存已填的内容再返回注册页
        if (userflag || idflag || phoneflag || emailflag) {
            var htmlpath = './index/index.html';
            var htmlfile = fs.readFileSync(htmlpath, "utf-8");
            htmlfile = insertHTML(htmlfile, userjson.username);
            htmlfile = insertHTML(htmlfile, userjson.std_id);
            htmlfile = insertHTML(htmlfile, userjson.phone);
            htmlfile = insertHTML(htmlfile, userjson.email);

            // 信息重复时插入错误提示
            if (userflag) {
                htmlfile = insertErr(htmlfile, "Error:用户名重复");
            }
            if (idflag) {
                htmlfile = insertErr(htmlfile, "Error:学号重复");
            }
            if (phoneflag) {
                htmlfile = insertErr(htmlfile, "Error:电话重复");
            }
            if (emailflag) {
                htmlfile = insertErr(htmlfile, "Error:邮箱重复");
            }
            response.writeHead(
                200,
                {'Content-Type': 'text/html'}
            );
            response.end(htmlfile);
        } else {
            users.push(userjson);
            fs.writeFileSync('user.json',JSON.stringify(users));
            reply(userjson, response);
        }
    });	
}
function insertHTML(htmlfile,in_str){
	var index = htmlfile.indexOf('value=""');
    var firststr = htmlfile.slice(0, index + 7);
    var secondstr = htmlfile.slice(index + 7);
    var htmlfile = firststr + in_str + secondstr;
    return htmlfile;	
}
function insertErr(htmlfile,err_str){
	var index = htmlfile.indexOf('></p>');
    var firststr = htmlfile.slice(0, index+1);
    var secondstr = htmlfile.slice(index+1);
    var htmlfile = firststr + err_str + secondstr;
    return htmlfile;	
}
function not_found(response,str){
	response.writeHead(404);
	response.write("<!DOCTYPE html>"+
"<html>"+
    "<head>"+
        "<meta charset='utf-8' />"+
        "<title>404 NOT FOUND</title>"+
        "<style type='text/css' >"+
        	"body{"+
        		"text-align: center;"+
        	"}"+
        "</style>"+
    "</head>"+
    "<body>" +                      
    "<h1>404 NOT FOUND</h1>");
    response.write("<h2>"+str.slice(1)+"</h2>\
    </body>\
</html>");
    response.end();
}