if(!localStorage.getItem("loggedIn")!=="true"){
    window.Location.href="index.html";
}
const severityBox=document.getElementById("severityBox");
const searchInput=document.getElementById("searchInput");
const logBody=document.getElementById("logBody");
const fileInput=document.getElementById("logFile");
const analyzeBtn=document.getElementById("analyzeBtn");
function calculateSeverity(failureCount){
    if(failureCount<=2){
        severityBox.innerText="LOW RISK";
        severityBox.style.backgroundColor="green";
        severityBox.style.color="white";
    }
    else if(failureCount<=5){
        severityBox.innerText="MEDIUM RISK";
        severityBox.style.backgroundColor="orange";
        severityBox.style.color="white";
    }
    else{
       severityBox.innerText="HIGH RISK";
       severityBox.style.backgroundColor="red"; 
       severityBox.style.color="white";
    }
}
searchInput.addEventListener(
    "keyup", function(){
        const keyword=this.value.toLowerCase();
        const filteredLogs=logsData.filter(log=> log.eventId.toLowerCase().includes(keyword) || log.type.toLowerCase().includes(keyword) || log.message.toLowerCase().includes(keyword));
        displayLogs(filteredLogs);
    }
);
document.getElementById("eventFilter").addEventListener("change", function(){
    const value=this.value;
    if(value==="all"){
        displayLogs(logsData);
        return;
    }
    const filtered=logsData.filter(log=>log.eventId===value);
    displayLogs(filtered);
});
let logsData=[];
let adminCount=0;
let successCount=0;
let failureCount=0;
let lockedCount=0;
function displayLogs(data){
    logBody.innerHTML="";
    data.forEach(log=>{
        let row=`<tr>
        <td>${log.time}</td>
        <td>${log.eventId}</td>
        <td>${log.type}</td>
        <td>${log.message}</td>
        </tr>`;
        logBody.innerHTML+=row;
    });
}
const eventMap={
    "4624":{
        type:"Login Success",
        message:"User successfully logged in"
    },
    "4625":{
        type:"Login Failure",
        message:"Failed login attempt"
    },
    "4634":{
        type:"Logoff",
        message:"User logged off"
    },
    "4672":{
        type:"Admin Privileges",
        message:"Administrative privileges assigned"
    },
    "4740":{
        type:"Account Locked",
        message:"User account locked"
    },
     "4767":{
        type:"Account Unlocked",
        message:"User account unlocked"
    },
    "1102":{
        type:"Audit Log Cleared",
        message:"Security log was cleared"
    },
    "4798":{
        type:"Group Enumeration",
        message:"User group membership was checked"
    }
};
analyzeBtn.addEventListener("click", function(){
    const file=fileInput.files[0];
    if(!file){
        alert("Please select a CSV file");
        return;
    }
    const reader=new FileReader();
    reader.onload=function(event){
        const content=event.target.result;
        console.log(content);
        alert("File loaded Successfully");
        processLogs(content);
    };
    reader.readAsText(file);
});
function processLogs(content){
    const lines=content.split("\n");
    logsData=[];
    successCount=0;
    failureCount=0;
    lockedCount=0;
    adminCount=0;
        for(let i=1;i<lines.length;i++){
        const row=lines[i].split(",");
        if(row.length<2)
            continue;
        const time=row[0].replace(/"/g,"").trim();
        const eventId=row[1].replace(/"/g,"").replace(/\r/g,"").trim();
        const eventInfo=eventMap[eventId];
        console.log("Event ID:",eventId,"Mapped:",eventInfo);
        const type=eventInfo?eventInfo.type:"Unknown Event";
        const message=eventInfo?eventInfo.message:"Event ID Not Mapped";
        if(eventId==="4624"){
            successCount++;
        }
        if(eventId==="4625"){
            failureCount++;
        }
        if(eventId==="4740"){
            lockedCount++;
        }
        if(eventId==="4672"){
            adminCount++;
        }
        logsData.push({
            time,eventId,type,message
        });
    }
    document.getElementById("totalLogs").innerText=logsData.length;
    document.getElementById("successLogs").innerText=successCount;
    document.getElementById("failedlogs").innerText=failureCount;
    document.getElementById("lockedlogs").innerText=lockedCount;
    document.getElementById("adminLogs").innerText=adminCount;
    calculateSeverity(failureCount);
    displayLogs(logsData.slice(0,50));
    updateChart();
}
const ctx = document.getElementById("eventChart").getContext("2d");
const eventChart=new Chart(ctx,{
    type: "bar",
    data: {
        labels: ["Success", "Failure", "Locked"],
        datasets: [{
            label: "Event Count",
            data: [0,0,0]
        }]
    }
});
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("loggedIn"); 
    window.location.href = "index.html"; 
});
document.getElementById("downloadBtn").addEventListener("click", function(){
    const report = `
    Mini SIEM Report
    Total Logs: ${logsData.length}
    Success: ${document.getElementById("successLogs").innerText}
    Failed: ${document.getElementById("failedlogs").innerText}
    Locked: ${document.getElementById("lockedlogs").innerText}
    Admin Events: ${adminCount}
`;
const blob = new Blob([report], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "siem_report.txt";
a.click();
});
function updateChart(){
    eventChart.data.datasets[0].data=[
        successCount,failureCount,lockedCount];
        eventChart.update();
}
    const themeBtn=document.getElementById("themeBtn");
    themeBtn.addEventListener("click", function(){
        document.body.classList.toggle("light-mode");
        if(document.body.classList.contains("light-mode")){
            themeBtn.innerText="Dark Mode";
        }else{
            themeBtn.innerText="Light Mode";
        }
    });
   window.addEventListener("load", function () {
    setTimeout(() => {
        tour.drive();
    }, 1000);
});
