
function getCookie(name) { 
  var start = document.cookie.indexOf(name+'='),
      len = start+name.length+1,
      end = document.cookie.indexOf(';',len);
  if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
  if (start === -1) {return null;}
  if (end === -1) {end = document.cookie.length; }
  return decodeURIComponent(document.cookie.substring(len,end));
}

export {getCookie};