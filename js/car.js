// 检查是否登录，未登录登录，登录就显示页面和商品数量
function checklogon(){
  if(localStorage.getItem("username")==null){
      alert("您还未登录！")
      location="../html/register.html"   
  }else{
      document.getElementById("count").innerHTML=JSON.parse(localStorage.getItem("book")).length
      var book=JSON.parse(localStorage.getItem("book"))
      for(var i=0;i<book.length;i++){
          var tab=document.getElementById("table");
          var tr=tab.insertRow(-1);
          var img=book[i].img;
          tr.insertCell(0).innerHTML="<input type='checkbox' class='choose' onclick='checkOne(this)' >"
          tr.insertCell(1).innerHTML="<img src='"+img+"'>";
          tr.insertCell(2).innerHTML=book[i].name;
          tr.insertCell(3).innerHTML=book[i].price;
          tr.insertCell(4).innerHTML="<span onclick='sup(this)'>-</span><span>"+JSON.parse(localStorage.getItem("book"))[i].n+"</span><span onclick='sub(this)'>+</span>";
          tr.insertCell(5).innerHTML="<span id='totalprice'>"+"￥"+(book[i].price.substring(1))*(JSON.parse(localStorage.getItem("book"))[i].n)+"</span>"
          tr.insertCell(6).innerHTML="<span onclick=del(this)>删除</span>"
     }
  }
}
// 修改剩余商品数量
var count=0;
function changeCount(arra){    
  document.getElementById("c").innerHTML=arra.length;
}
//  获得table对象
var table=document.getElementById("table");
// 计算金额
function sum(){
  var z=document.getElementsByClassName("choose")
  var c=0;
  for(var i=0;i<z.length;i++){
      if(z[i].checked){
      var a=z[i].parentNode.parentNode.children[5].children[0].innerHTML;  
      var sum= parseInt(a.substring(1));
      c+=sum;
      }
  }
  document.getElementById("m").innerText=c;
}
// 全选
function allin(obj){
  var z=document.getElementsByClassName("choose");
  for(var i=0;i<z.length;i++){
         if(z[i].checked=obj.checked){
           var arra=JSON.parse(localStorage.getItem("book"))
      changeCount(arra)  
         }else{
          document.getElementById("c").innerHTML=0
         }
      }
  sum();
}
 
var a =document.ge
//删除
function del(obj) {
  var n = obj.parentNode.parentNode.rowIndex;
  if (confirm("确定删除吗？")) {
    table.deleteRow(n);

    alert("删除成功");
    var arr = JSON.parse(localStorage.getItem("book"));
    arr.splice(n, 1);
    localStorage.setItem("book", JSON.stringify(arr));
    document.getElementById("count").innerHTML = JSON.parse(localStorage.getItem("book")).length;
    --count;
    document.getElementById("c").innerHTML=count 
    sum()
  }
}
//单选框判断是否全选
var count = 0;
function checkOne(obj) {
  var z = document.getElementsByClassName("choose");
  var all = document.getElementById("all");
  var flag = true;
  if (obj.checked) {
    count++;
  } else {
    document.getElementById("c").innerHTML = count--;
  }
  document.getElementById("c").innerHTML = count;
  for (var i = 0; i < z.length; i++) {
    if (!z[i].checked) {
      flag = false;
      break;
    }
  }
  all.checked = flag;
  sum()
}
// 结算
function pay(obj){
  var z=document.getElementsByClassName("choose")
  var money=document.getElementById("m").innerText
  alert("总共付款"+money+"元")
  for(var i=z.length-1;i>=0;i--){
      if(z[i].checked){
          z[i].parentNode.parentNode.remove()
          var arr=JSON.parse(localStorage.getItem("book"));
          arr.splice(i,1)
          localStorage.setItem("book",JSON.stringify(arr))
          count=0
          document.getElementById("c").innerHTML=count
          document.getElementById("count").innerHTML=JSON.parse(localStorage.getItem("book")).length
          
      }
 }
  sum();
}


// 删除选择项
function delcheck(obj) {
  if (confirm("确定要删除购物车中所有选中的订单吗？")) {
    var z = document.getElementsByClassName("choose");
    for (var i = z.length - 1; i >= 0; i--) {
      if (z[i].checked) {
        z[i].parentNode.parentNode.remove();
        var arr = JSON.parse(localStorage.getItem("book"));
        arr.splice(i, 1);
        //重新存储
        localStorage.setItem("book", JSON.stringify(arr));
        document.getElementById("c").innerHTML = 0;
        document.getElementById("count").innerHTML=JSON.parse(localStorage.getItem("book")).length
      }
    }
    document.getElementById('all').checked=false
  }
  alert("删除成功！");
  sum()
}
//清空
function dele() {
  var index = table.rows.length;
  for (var i = index - 1; i >= 0; i--) {
    table.deleteRow(i);
    localStorage.setItem("book", "[]");
    sum()
    var arra = JSON.parse(localStorage.getItem("book"));
    changeCount(arra)
    document.getElementById("count").innerHTML=JSON.parse(localStorage.getItem("book")).length
  }
}
//++
function sub(obj){
  var arr=JSON.parse(localStorage.getItem("book"))
      for(var i=0;i<arr.length;i++){
          if(obj.parentNode.parentNode.children[2].innerHTML==arr[i].name){
                  arr[i].n=parseInt(arr[i].n)+1
                   localStorage.setItem("book",JSON.stringify(arr))
          }
      }
  obj.parentNode.children[1].innerHTML=parseInt(obj.previousSibling.innerHTML)+1
  obj.parentNode.parentNode.children[5].children[0].innerHTML="￥"+(parseInt((obj.previousSibling.innerHTML)))*(obj.parentNode.parentNode.children[3].innerHTML).substring(1)
  var z=document.getElementsByClassName("choose")
  for(var i=0;i<z.length;i++){ 
      if(z[i].checked){
          sum()
      }
  }
}
// --
function sup(obj){
  var arr=JSON.parse(localStorage.getItem("book"))
  if(obj.nextSibling.innerHTML>1){
      for(var i=0;i<arr.length;i++){
          if(obj.parentNode.parentNode.children[2].innerHTML==arr[i].name){
                  arr[i].n=parseInt(arr[i].n)-1
                   localStorage.setItem("book",JSON.stringify(arr))
          }
      }
      obj.parentNode.children[1].innerHTML=obj.nextSibling.innerHTML-1
      obj.parentNode.parentNode.children[5].children[0].innerHTML="￥"+(obj.nextSibling.innerHTML)*(obj.parentNode.parentNode.children[3].innerHTML).substring(1)
      var z=document.getElementsByClassName("choose")
      for(var i=0;i<z.length;i++){ 
          if(z[i].checked){
              sum()
          }
      }
  }else{
      alert("请至少保留一本书！") 
  }      
}




