var ip='http://192.168.0.25:8888/'

function getXMLHttp(){ 
      if (XMLHttpRequest) {
       return new XMLHttpRequest();
      } else {
        return  new ActiveXObject("Microsoft.XMLHTTP");
      }
}
