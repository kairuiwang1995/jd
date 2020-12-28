localStorage.getItem('username')
var p =false;
function login(obj){
    var s =obj.value
    var us=localStorage.getItem('username')

    if(s==us){
        p=true
    }
}
console.log(p);
var q=false;
function password(obj){
    var o =obj.value
    var ps2=localStorage.getItem('password')
    if(o=ps2){
        q=true
    }
}

function go(){
    if(p,q){
        window.location.href='./shop.html'
    }else{
        alert('账号或密码错误')
    }

}