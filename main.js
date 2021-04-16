
//取得DOM元素
var btn = document.querySelector('.btn');
var list = document.querySelector('.list');
//取出localStorage的string轉乘object 前面若是空值回傳[]
var data = JSON.parse(localStorage.getItem('datalist')) || [];
