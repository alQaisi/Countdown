const currentDate=new Date().toISOString().split('T')[0];
const inputContainer=document.getElementById("input-container");
const countdownContainer=document.getElementById("countdown");
const completeContainer=document.getElementById("complete");
const countdownTitle=document.getElementById("countdown-title");
const completeInfo=document.getElementById("complete-info");
const completeButton=document.getElementById("complete-button");
const countdownButton=document.getElementById("countdown-button");
const timeElements=Array.from(document.querySelectorAll("span")).slice(2).reverse();
let countdownValue="";
document.getElementById("date").setAttribute('min',currentDate);
const time=[1000,60000,3600000,86400000]
const upDatePage=()=>{
    countdownTimer=setInterval(()=>{
        const now=new Date().getTime();
        const distance=countdownValue-now;
        const days=Math.floor(distance/time[3]);
        const hours=Math.floor((distance%time[3])/time[2]);
        const minutes=Math.floor((distance%time[2])/time[1]);
        const seconds=Math.floor((distance%time[1])/time[0]);
        const newTimeElements=[seconds,minutes,hours,days];
        inputContainer.hidden=true;
        countdownContainer.hidden=false;
        timeElements.forEach((element,index)=>{
        element.textContent=newTimeElements[index];
        if(seconds<0){
            completeCountdown("completed");
        }
    })
    },1000)   
}
if(localStorage.length){
    countdownValue=localStorage.getItem("countdownValue");
    countdownTitle.textContent=localStorage.getItem("countdownTitle");
    upDatePage();
}else{
    inputContainer.hidden=false;
}
const completeCountdown=(status)=>{
    localStorage.clear();
    countdownContainer.hidden=true;
    if(status==='reset'){
        inputContainer.hidden=false;
        completeContainer.hidden=true;
    }else{
        completeContainer.hidden=false;
        completeInfo.textContent=`${inputContainer.children[2].value} Finished on ${countdownDate}`;
    }
    clearInterval(countdownTimer);
    countdownValue='';
    countdownContainer.hidden=true;
}
countdownButton.addEventListener('click',completeCountdown.bind(this,'reset'))
completeButton.addEventListener('click',completeCountdown.bind(this,'reset'))
inputContainer.addEventListener("submit",function(event){
    event.preventDefault()
    countdownTitle.textContent=event.srcElement[0].value;
    countdownDate=event.srcElement[1].value;
    countdownValue=new Date(countdownDate).getTime();
    localStorage.setItem('countdownValue',countdownValue);
    localStorage.setItem('countdownTitle',textContent=event.srcElement[0].value);
    upDatePage();
})

