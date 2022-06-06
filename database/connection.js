var mysql= require('mysql');
var conn=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tecsup2022',
    database: 'agenda',
    multipleStatements: true
});

conn.connect(err =>{
    if(!err){
        console.log(`Conexion a MYSQL correctamente!!!`)
    }else{
        console.log(`FALLO EN CONECTARSE A MYSQL: ${err}`)
    }
});

module.exports= conn;