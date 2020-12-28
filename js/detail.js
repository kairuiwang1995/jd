//检查本地存储
if (localStorage.getItem("book") == null) {
  localStorage.setItem("book", "[]");
}
// 加入购物车 
function gocar(obj) {
  if (localStorage.getItem("username") == null) {
    alert("您还未登录");
    location = "../html/register.html";
  } else {
    var c = localStorage.getItem("img");
    console.log(c);
     c=checkbook(JSON.parse(c).name,JSON.parse(localStorage.getItem("book")))
    if(c){
      var books = JSON.parse(localStorage.getItem("img"));
      console.log(books);
      var ss =JSON.parse(localStorage.getItem('book'))
      var news ={
        name:books.name,
        price:books.price,
        img:books.img,
        n:1
      }
      ss.push(news)
      ss=JSON.stringify(ss)
      alert("加入成功");
      localStorage.setItem("book",ss)
    } else {
      alert("请勿重复添加！");
    }
  }
}

// function gocar(obj) {
//   if (localStorage.getItem("username") == null) {
//     alert("您还未登录");
//     location = "../html/register.html";
//   } else {
//     var c = localStorage.getItem("img");
//     if(checkbook(JSON.parse(c).name,JSON.parse(localStorage.getItem("book")))){
//       var books = JSON.parse(localStorage.getItem("img"));
//       books.JSON.parse(books)
//       books.push(c);
//       books = JSON.stringify(books);
//       localStorage.setItem("book", books);
//       alert("加入成功");
//       localStorage.setItem("book",books)
//     } else {
//       alert("请勿重复添加！");
//     }
//   }
// }

//更新详情页
var ip = "http://192.168.0.25:8888/";
function showdetail() {
  var c = JSON.parse(localStorage.getItem("img"));
  document.getElementById("imgs").src = c.img;
  document.getElementById("name").innerHTML = c.name;
  document.getElementById("price").innerHTML = c.price + "元";
}
//校验是否添加过
function checkbook(name, book) {
  var flag = true;
  for (var i = 0; i < book.length; i++) {
    if (book[i].name == name) {
      flag = false;
      break;
    }
  }
  return flag;
}
