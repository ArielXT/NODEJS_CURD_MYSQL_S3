const agenda={
    listar:`SELECT * FROM agenda`,

    agenda:(id)=>{
        return `SELECT * FROM agenda WHERE agenda.id=${id}`
    },
    actualizarimagen:(data)=>{
        return `UPDATE agenda SET 
                imagen = '${data.imagen}'
                WHERE agenda.id=${data.id}`
    },
    actualizar:(data)=>{
        return `UPDATE agenda SET 
                nombre='${data.nombre}',
                apellido='${data.apellido}',
                correo='${data.correo}',
                fecha_nac = '${data.fecha_nac}',
                imagen = '${data.imagen}'
                WHERE agenda.id=${data.id}`
    },
    eliminar:(id)=>{
        return `DELETE FROM agenda
        WHERE agenda.id=${id}`
    },
    agregar:(data)=>{
        return `INSERT INTO agenda (id, nombre, apellido, correo, fecha_nac) 
        VALUES (${data.id},'${data.nombre}', '${data.apellido}' ,'${data.correo}','${data.fecha_nac}');`
    }
    
};

module.exports=agenda;