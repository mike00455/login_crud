$(document).ready(function(){
    tablaPersonas = $("#tablaPersonas").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div></div>"  
       }],
        
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
    
$("#btnNuevo").click(function(){
    $("#formPersonas").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nueva Persona");            
    $("#modalCRUD").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    nombre = fila.find('td:eq(1)').text();
    apellido = fila.find('td:eq(2)').text();
    documento = fila.find('td:eq(3)').text();
    celular = fila.find('td:eq(4)').text();
    correo = fila.find('td:eq(5)').text();
    
    $("#nombre").val(nombre);
    $("#apellido").val(apellido);
    $("#documento").val(documento);
    $("#celular").val(celular);
    $("#correo").val(correo);

    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Persona");            
    $("#modalCRUD").modal("show");  

    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablaPersonas.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});
    
$("#formPersonas").submit(function(e){
    e.preventDefault();    
    nombre = $.trim($("#nombre").val());
    apellido = $.trim($("#apellido").val());
    documento = $.trim($("#documento").val());    
    celular = $.trim($("#celular").val());   
    correo = $.trim($("#correo").val()); 
    $.ajax({
        url: "bd/crud.php",
        type: "POST",
        dataType: "json",
        data: {nombre:nombre, apellido:apellido, documento:documento, celular:celular, correo:correo, id:id, opcion:opcion},
        success: function(data){  
            console.log(data);
            id = data[0].id;            
            nombre = data[0].nombre;
            apellido = data[0].apellido;
            documento = data[0].documento;
            celular = data[0].celular;
            correo = data[0].correo;
            if(opcion == 1){tablaPersonas.row.add([id,nombre,apellido,documento,celular,correo]).draw();}
            else{tablaPersonas.row(fila).data([id,nombre,apellido,documento,celular,correo]).draw();}            
        }        
    });
    $("#modalCRUD").modal("hide");    
    
});    


//restaurantes

tablaRestaurantes = $("#tablaRestaurantes").DataTable({
    "columnDefs":[{
     "targets": -1,
     "data":null,
     "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditarR'>Editar</button><button class='btn btn-danger btnBorrarR'>Borrar</button></div></div>"  
    }],
     
 "language": {
         "lengthMenu": "Mostrar _MENU_ registros",
         "zeroRecords": "No se encontraron resultados",
         "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
         "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
         "infoFiltered": "(filtrado de un total de _MAX_ registros)",
         "sSearch": "Buscar:",
         "oPaginate": {
             "sFirst": "Primero",
             "sLast":"Último",
             "sNext":"Siguiente",
             "sPrevious": "Anterior"
          },
          "sProcessing":"Procesando...",
     }
 });

 $("#btnNuevo").click(function(){
    $("#formRestaurantes").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-titleR").text("Nuevo Restaurante");            
    $("#modalRESTAURANTE").modal("show");        
    id_rest=null;
    opcionR=1; //alta
});    
    
//botón EDITAR    
$(document).on("click", ".btnEditarR", function(){
    fila = $(this).closest("tr");
    id_rest = parseInt(fila.find('td:eq(0)').text());
    nombre_rest = fila.find('td:eq(1)').text();
    direccion = fila.find('td:eq(2)').text();
    
    $("#nombre_rest").val(nombre_rest);
    $("#direccion").val(direccion);

    opcionR = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Restaurante");            
    $("#modalRESTAURANTE").modal("show");  

    
});

//botón BORRAR
$(document).on("click", ".btnBorrarR", function(){    
    fila = $(this);
    id_rest = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcionR = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id_rest+"?");
    if(respuesta){
        $.ajax({
            url: "bd/tabla_restaurante.php",
            type: "POST",
            dataType: "json",
            data: {opcionR:opcionR, id_rest:id_rest},
            success: function(){
                tablaRestaurantes.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});
    
$("#formRestaurantes").submit(function(e){
    e.preventDefault();    
    nombre_rest = $.trim($("#nombre_rest").val());
    direccion = $.trim($("#direccion").val());
    $.ajax({
        url: "bd/tabla_restaurante.php",
        type: "POST",
        dataType: "json",
        data: {nombre_rest:nombre_rest, direccion:direccion, id_rest:id_rest, opcionR:opcionR},
        success: function(data){  
            console.log(data);
            id_rest = data[0].id_rest;            
            nombre_rest = data[0].nombre_rest;
            direccion = data[0].direccion;
            if(opcionR == 1){tablaRestaurantes.row.add([id_rest,nombre_rest,direccion]).draw();}
            else{tablaRestaurantes.row(fila).data([id_rest,nombre_rest,direccion]).draw();}        
        }        
    });
    $("#modalRESTAURANTE").modal("hide");    
    
});    



//platos

tablaPlatos = $("#tablaPlatos").DataTable({
    "columnDefs":[{
     "targets": -1,
     "data":null,
     "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditarP'>Editar</button><button class='btn btn-danger btnBorrarP'>Borrar</button></div></div>"  
    }],
     
 "language": {
         "lengthMenu": "Mostrar _MENU_ registros",
         "zeroRecords": "No se encontraron resultados",
         "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
         "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
         "infoFiltered": "(filtrado de un total de _MAX_ registros)",
         "sSearch": "Buscar:",
         "oPaginate": {
             "sFirst": "Primero",
             "sLast":"Último",
             "sNext":"Siguiente",
             "sPrevious": "Anterior"
          },
          "sProcessing":"Procesando...",
     }
 });

 $("#btnNuevo").click(function(){
    $("#formPlatos").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-titleP").text("Nuevo Plato");            
    $("#modalPLATO").modal("show");        
    id_plat=null;
    opcionP=1; //alta
});    
    
//botón EDITAR    
$(document).on("click", ".btnEditarP", function(){
    fila = $(this).closest("tr");
    id_plat = parseInt(fila.find('td:eq(0)').text());
    nombre_plat = fila.find('td:eq(1)').text();
    descripcion = fila.find('td:eq(2)').text();
    
    $("#nombre_plat").val(nombre_plat);
    $("#descripcion").val(descripcion);

    opcionP = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Plato");            
    $("#modalPLATO").modal("show");  

    
});

//botón BORRAR
$(document).on("click", ".btnBorrarP", function(){    
    fila = $(this);
    id_plat = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcionP = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id_plat+"?");
    if(respuesta){
        $.ajax({
            url: "bd/tabla_plato.php",
            type: "POST",
            dataType: "json",
            data: {opcionP:opcionP, id_plat:id_plat},
            success: function(){
                tablaPlatos.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});
    
$("#formPlatos").submit(function(e){
    e.preventDefault();    
    nombre_plat = $.trim($("#nombre_plat").val());
    descripcion = $.trim($("#descripcion").val());
    $.ajax({
        url: "bd/tabla_plato.php",
        type: "POST",
        dataType: "json",
        data: {nombre_plat:nombre_plat, descripcion:descripcion, id_plat:id_plat, opcionP:opcionP},
        success: function(data){  
            console.log(data);
            id_plat = data[0].id_plat;            
            nombre_plat = data[0].nombre_plat;
            descripcion = data[0].descripcion;
            if(opcionP == 1){tablaPlatos.row.add([id_plat,nombre_plat,descripcion]).draw();}
            else{tablaPlatos.row(fila).data([id_plat,nombre_plat,descripcion]).draw();}        
        }        
    });
    $("#modalPLATO").modal("hide");    
    
});    
    
});