
//取得DOM元素
var btn = document.querySelector('.btn');
var list = document.querySelector('.list');
//取出localStorage的string轉乘object 前面若是空值回傳[]
var data = JSON.parse(localStorage.getItem('datalist')) || [];


//監聽觸發事件
btn.addEventListener('click', calculateBMI);
list.addEventListener('click', beDone);


UpdateList(data);


function calculateBMI(e){
    e.preventDefault();
    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value;
    var lightBar = '';
    var status = '';
    var h = (height)/100;
    var w = weight;
    var BMI = (w/(h*h)).toFixed(2); //四捨五入

    //輸入資料判斷
    if(BMI == 'NaN'){
        alert('請輸入正確的數值');
        return;
    }else if(height == ''){
        alert('尚未輸入身高')
    }else if (weight == '') {
        alert ('尚未輸入體重');
        return;
    }else if ( height > 300) {
        alert ('請重新輸入身高');
        return;
    }else if (weight > 1000) {
        alert ('請重新輸入體重');
        return;
    }


    
    if(BMI<18.5) {
        status = '過輕';
        lightBar = 'blue';
        btn.setAttribute("class","blue");  
    }else if(18.5<=BMI && BMI<24) {
        status = '理想';
        lightBar = 'green';
        btn.setAttribute("class","green");
    }else if(24<=BMI && BMI<27) {
        status = '過重';
        lightBar = 'orange1';
        btn.setAttribute("class","orange1");
    }else if(27<=BMI && BMI<30) {
        status = '輕度肥胖';
        lightBar = 'orange2';
        btn.setAttribute("class","orange2");
    }else if(30<=BMI && BMI<35) {
        status = '中度肥胖';
        lightBar = 'orange2';
        btn.setAttribute("class","orange2");
    }else if(BMI>=35) {
        status = '重度肥胖';
        lightBar = 'red';
        btn.setAttribute("class","red");
    }

     // bnt被點擊後 改變畫面內容
     document.querySelector('.value').textContent = BMI;
     document.querySelector('.bmi').textContent = 'BMI';
     document.querySelector('.click').textContent = '';

    //放入物件中
    var allBMI = {
        lightBar: lightBar, 
        bmi:BMI, 
		status: status,
        height : height,
        weight : weight,
        
    }
    //傳入localStorage
    data.push(allBMI);
    localStorage.setItem('datalist', JSON.stringify(data));
    UpdateList(data);
    
    
}


//更新

function UpdateList(items){
    var str ='';
    for(var i=0; i<items.length; i++){
      str+= '<div class="container"><div class="lightBar" id ='+items[i].lightBar +'> </div><div class="getbmi">'+items[i].status+'</div><div class="getbmi"><div class="getbmi eng">BMI</div><div class="getbmi">'+items[i].bmi+'</div></div><div class="getbmi"><div class="getbmi eng"> Weight</div><div class="getbmi">'+items[i].weight+'kg</div></div><div class="getbmi"><div class="getbmi eng">Height</div><div class="getbmi">'+items[i].height+'com</div></div><a data-index='+i+'class="getbmi">✗</a></div>'
    }
    list.innerHTML = str;
  }
  

//刪除事件

function beDone(e){
    e.preventDefault();
    if(e.target.nodeName !== "A"){return}
    //取出刪除項目的data
    var index = e.target.dataset.index;
    data.splice(index,1);
    localStorage.setItem('datalist', JSON.stringify(data));
    UpdateList(data);
}