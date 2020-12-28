//校验手机或邮箱
var a = false;
var b = false;
var c = false;
function checkPhone(obj) {
  var user;
  if (
    (user = /^1[3,5,7,8]\d{9}|[1,9 \w a-z A-Z]{2,8}\@[1,9 a-z A-Z ]{3,6}\.com$/.test(
      obj.value
    ))
  ) {
    obj.nextElementSibling.innerHTML = "√";
    obj.nextElementSibling.style.color = "green";
    a = true;
  } else {
    obj.nextElementSibling.innerHTML = "×";
    obj.nextElementSibling.style.color = "red";
  }
}
// 校验密码
function checkPassword(obj) {
  var ps;
  if ((ps = /^[a-z A-Z 0-9]{8,10}$/.test(obj.value))) {
    obj.nextElementSibling.innerHTML = "√";
    obj.nextElementSibling.style.color = "green";
    b = true;
  } else {
    obj.nextElementSibling.innerHTML = "×";
    obj.nextElementSibling.style.color = "red";
  }
}
//再次校验密码
function crPassword(obj) {
  var ps2;
  if ((ps2 = obj.value == document.getElementById("password").value)) {
    obj.nextElementSibling.innerHTML = "√";
    obj.nextElementSibling.style.color = "green";
    c = true;
  } else {
    obj.nextElementSibling.innerHTML = "×";
    obj.nextElementSibling.style.color = "red";
  }
}
var t;
function go() {
  var username = document.getElementById("us").value;
  var password = document.getElementById("password").value;
 
  var http = getXMLHttp();
  http.open("GET",ip+"register?username="+username+"&password="+password);
  http.send()
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      var t = http.responseText;
      console.log(t);
      if (t == 1) {
        localStorage.setItem("password", password);
        localStorage.setItem("username", username);
        alert("注册成功");
      } else {
        alert("注册失败");
      }
    }
    
  }
  
}
