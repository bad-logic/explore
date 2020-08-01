#!/usr/bin/env node

"use strict";
const fs = require('fs');
const Schema = require("./schema_pb");

const John = new Schema.Employee();
John.setEid(1001);
John.setName("John");
John.setLastname("Doe");
John.setSalary(2500);

const Mary = new Schema.Employee();
Mary.setEid(1005);
Mary.setName("Mary");
Mary.setLastname("Chang");
Mary.setSalary(5500);

const Brock = new Schema.Employee();
Brock.setEid(1009);
Brock.setName("Brock");
Brock.setLastname("Jr");
Brock.setSalary(1500);


function serialize(){
    const employees = new Schema.Employees();
    employees.addEmps(John);
    employees.addEmps(Brock);
    employees.addEmps(Mary);
    return employees.serializeBinary();
}

function writeToFile(path,data){
    fs.writeFileSync(path,data);
}

function readFile(path){
    return fs.readFileSync(path);
}

function deserialize(bytes){
    return Schema.Employees.deserializeBinary(bytes);
}

function getFileSizeInBytes(file){
    return fs.statSync(file).size;
}

function main(){
    const file = "binarydata";
    const serializedToBytes = serialize();
    writeToFile(file,serializedToBytes);
    const data = readFile(file);
    console.log("file contents",deserialize(data).toString());
    console.log("fileSize: "+getFileSizeInBytes(file)+' Bytes');
}

if(require.main===module)
    main();