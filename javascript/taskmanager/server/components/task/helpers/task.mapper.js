module.exports = function dataMapper(dbData, reqData) {
    if (reqData.title) {
        dbData.title = reqData.title;
    }
    if (reqData.listId) {
        dbData._listid = reqData.listId;
    }
    // In other fields values are either string or numbers or objects
    // if they exists true otherwise false
    // but completed is a boolean value either true or false
    // and if we want to update false value on completed 
    // reqData.completed is a false value which restricts from going inside 
    // the if condition
    // if (reqData.completed) {
    //     dbData.completed = reqData.completed;
    // }

    //  SOLUTION ONE--> assuming that completed field is never empty
    // this solution involves that req data always contains either true or false in the 
    // req Objects completed field

    // dbData.completed = reqData.completed;


    // SOLUTION TWO --> One of the condition is always true
    // or another solution is to check both condition
    //  reqdata.completed and dbdata.completed
    // and inside both if cases implement the same mapping statement
    // for every true or false one is always true
    if (reqData.completed) {
        dbData.completed = reqData.completed;
    }
    if (dbData.completed) {
        dbData.completed = reqData.completed;
    }


}