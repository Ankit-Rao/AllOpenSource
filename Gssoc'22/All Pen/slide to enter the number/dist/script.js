function onInput(input){
  var characterLength=input.getAttribute("max").length;
  var label = document.querySelector("label[for="+input.getAttribute("id")+"]");
  var value = input.value+"0000";
  value = value.substr(0,characterLength);
  label.innerHTML=value;
}