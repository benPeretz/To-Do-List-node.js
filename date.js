

// module.exports.getDate=getDate;

// function getDate(){
//     //לעשות שעון 
//     let today=new Date();
//     let options={
//         weekday:"long",
//         day:"numeric",
//         month:"long"
//     };

//     let day = today.toLocaleDateString("en-US",options);

//     return day;
// }


exports.getDate= function (){
    //לעשות שעון 
    let today=new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    return today.toLocaleDateString("en-US",options);

}






module.exports.getDay=getDay;


function getDay(){
    //לעשות שעון 
    let today=new Date();
    let options={
        weekday:"long"

    };

    let day = today.toLocaleDateString("en-US",options);

    return day;
}
