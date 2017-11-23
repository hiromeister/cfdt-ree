function stats(){
    $.ajax({
        url: 'mongodb://localhost:27017/cfdtvote/users',
        type:'GET',
        data:data,
        contentType: "application/json; charset=utf-8",
        success:function(data){
            console.log("ça marche");
        },
        error:function(err, Status){
            console.log("Status", Status);
            console.log("ERR", err);
        }
    })

}   