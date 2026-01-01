#!/usr/bin/env node


"use strict";

const fs = require('fs');

const employees = [];

employees.push({
    "name":"john",
    "lastname":"Doe",
    "salary": 2500,
    "eid":1001
});
employees.push({
    "name":"Mary",
    "lastname":"Chang",
    "salary": 5500,
    "eid":1005
});

employees.push({
    "name":"Brock",
    "lastname":"Jr",
    "salary": 1500,
    "eid": 1009
});


function main(){
    const file = 'data.json';
    fs.writeFileSync(file,JSON.stringify(employees));
    const fileSizeInBytes = fs.statSync(file).size;
    console.log("fileSize: "+fileSizeInBytes+' Bytes');
}


if(require.main===module)
    main();