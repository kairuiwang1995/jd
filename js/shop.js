// 获取服务器对象
getXMLHttp();

// 获取左侧图书信息
function ad() {
  var httpRequest = getXMLHttp();
  httpRequest.open("GET", ip + "/showADBooks");
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var a = httpRequest.responseText;
      var b = JSON.parse(a);
      console.log(b);
      addad(b); //传参
    }
  };
  httpRequest.send();
}
ad();
// 拿到左侧图书信息
function addad(p) {
  for (var i = 0; i < p.length; i++) {
    var newp = document.createElement("p");
    var newp1 = document.createElement("p");
    var newp2 = document.createElement("p");
    var newp3 = document.createElement("p");
    newp.innerHTML = "<img src='" + ip + p[i].img + "'>";
    newp1.innerHTML = "￥" + p[i].price;
    newp1.style.color = "red";
    newp2.innerHTML = p[i].name;
    newp3.innerHTML = "共计2W+评价";
    document.getElementById("bottom").appendChild(newp);
    document.getElementById("bottom").appendChild(newp1);
    document.getElementById("bottom").appendChild(newp2);
    document.getElementById("bottom").appendChild(newp3);
  }
}
// 获取book信息
function book() {
  var httpRequest = getXMLHttp();
  httpRequest.open("GET", ip + "getBooks");
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var a = httpRequest.responseText;
      var b = JSON.parse(a);
      addbook(b); //传参
    }
  };
  httpRequest.send();
}
book();
// 拿到getbooks信息
function addbook(p) {
  for (var i = 0; i < p.length; i++) {
    var div = document.createElement("div");
    var anewp = document.createElement("p");
    var anewp1 = document.createElement("p");
    var anewp2 = document.createElement("p");
    var anewp3 = document.createElement("p");
    var anewp4 = document.createElement("p");
    anewp.innerHTML =
      "<img src='" + ip + p[i].img + "'onclick='godetail(this)'>";
    anewp.style.marginTop = "5px";
    anewp1.innerHTML = "￥" + p[i].price;
    anewp1.style.color = "red";
    anewp2.innerHTML = p[i].name;
    anewp2.style.fontSize = "12px";
    anewp3.innerHTML =
      "<span class='span'>自营</span><span class='span1'>放心购</span><span class='span2'>秒杀</span>";
    anewp4.innerHTML =
      "<span class='span3' onclick='gocar(this)'>加入购物车</span>";
    div.appendChild(anewp);
    div.appendChild(anewp1);
    div.appendChild(anewp2);
    div.appendChild(anewp3);
    div.appendChild(anewp4);
    document.getElementById("righttop").appendChild(div);
  }
}



if (localStorage.getItem("book") == null) {
  localStorage.setItem("book", "[]");
}

// 加入购物车时判断是否登录
function gocar(obj) {
  if (localStorage.getItem("username") == null) {
    alert("您还未登录！");
    location.href = "./login.html";
  } else {
    var c = obj.parentNode.parentNode.children[2].innerHTML;
    //校验书本是否存在
    // console.log();
    if (checkbook(c, JSON.parse(localStorage.getItem("book")))) {
      //拿到本地存储中[],一开始为[]
      var a = JSON.parse(localStorage.getItem("book"));
      var f = {
        name: obj.parentNode.parentNode.children[2].innerHTML,
        price: obj.parentNode.parentNode.children[1].innerHTML,
        img: obj.parentNode.parentNode.firstChild.firstChild.src,
        n:1
      };
      //把f的对象添加到a中
      a.push(f);
      //转换为字符串
      a = JSON.stringify(a);
      alert("加入购物车成功！");
      //把a存储再本地存储中
      localStorage.setItem("book", a);
    } else {
      alert("您已添加过该商品，请勿重复添加！");
    }
  }
}

// 检查书本是否已经存在
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

//跳转详情
function godetail(obj) {
  localStorage.setItem("img", "[]");
  var a = JSON.parse(localStorage.getItem("img"));
  var messages = {
    name: obj.parentNode.parentNode.children[2].innerHTML,
    price: obj.parentNode.parentNode.children[1].innerHTML,
    img: obj.src,
  };
  console.log(messages);
  a.push(messages);
  a = JSON.stringify(messages);
  localStorage.setItem("img", a);
  location = "/html/detail.html";
}


//轮播图

function initPage(){
  getPlayImages();
  getAdBook();

}

// 轮播图
function getPlayImages(){
  var r=getXMLHttp();
  r.open("GET",ip+"showImages");
  r.send();
  r.onreadystatechange=function(){
      if(r.readyState==4&&r.status==200){
          var arr=JSON.parse(r.responseText);
          createPlayBtn(arr);
          var m="";
          var flag=setInterval(function a(t){
              if(!m){
                  m=t;
              }
              test(m);
          }, 1000,arr);
      }
  }
}

var count=0;
// 添加小圆点的方法
function createPlayBtn(arr){
  var ul=document.getElementById("u");
  for(var i=0;i<arr.length;i++){
      var li=document.createElement("li");
      li.setAttribute("name","play");
      // li.addEventListener("mouseover",stopPlay)
      // li.addEventListener("mouseout",startPlay)
      ul.appendChild(li)
      
  }
}

// 小圆点的色彩变化
function changeColor(n){
   var lis=document.getElementsByName("play")
   for(var i=0;i<lis.length;i++){
       if(i==n){
           lis[i].style.backgroundColor="#ffffff";
       }else{
           lis[i].style.backgroundColor="blue";
       }
   }
}
// 切换的函数
function test(arr){
   var img=document.getElementById("img");
   img.src=ip+arr[count].img;
   changeColor(count);
   count++;
   if(count==arr.length){
       count=0;
   }
}



function addBooks(arr){
  var books=document.getElementById("books");
  for(var i=0;i<arr.length;i++){
      var dl=document.createElement("dl");
      var img=document.createElement("img");
      img.src=ip+arr[i].img;
      var price=document.createElement("span");
      price.innerHTML="￥"+arr[i].price;
      var name=document.createElement("span");
      name.innerHTML=arr[i].name;
      var btns=document.createElement("span");
      btns.innerHTML="<em>自营</em><em>放心购</em><em>秒杀</em>"
      var addCarBtn=document.createElement("span");
      addCarBtn.innerHTML="加入购物车";
      function addB(index){
          addCarBtn.onclick=function(){
              // console.log(arr[index]);
             var car=[];
              if(localStorage.getItem("car")){
                  car=JSON.parse(localStorage.getItem("car"));
             }else{
                 localStorage.setItem("car",JSON.stringify(car));
             }
             var temp=0;
             for(var i=0;i<car.length;i++){
              if(car[i].name==arr[index].name){
                  temp++;
                  break;
              }
             }
             if(temp==0){
                  arr[index].number=1;
                  car.push(arr[index]);
                  localStorage.setItem("car",JSON.stringify(car))
             }
          }
      }
      addB(i);
      dl.appendChild(img);
      dl.appendChild(price);
      dl.appendChild(name);
      dl.appendChild(btns);
      dl.appendChild(addCarBtn);
      books.appendChild(dl)
  }
}
