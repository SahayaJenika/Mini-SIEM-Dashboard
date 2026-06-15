const driver=window.driver.js.driver;
const tour=driver({
    showProgress:true,
    steps:[{
        element:"#logFile",
        popover:{
            title:"Upload Logs",
            description:"Upload CSV security logs here."
        }
    },{
        element:"#analyzeBtn",
        popover:{
            title:"Analyze Logs",
            description:"Click to analyze uploaded logs."
        }
    },{
        element:"#severitBox",
        popover:{
            title:"Security Severity",
            description:"Shows risk level."
        }
    },{
        element:"#logTable",
        popover:{
            title:"Log Table",
            description:"Diaplayed analyzed logs."
        }
    },{
        element:"#searchInput",
        popover:{
            title:"Search Logs",
            description:"Search logs using Event ID or messsage."
        }
    }]
});
document.getElementById("tourBtn").addEventListener("click", function(){
    tour.drive();
});