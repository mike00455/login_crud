<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();
// Recepción de los datos enviados mediante POST desde el JS  

$nombre_rest = (isset($_POST['nombre_rest'])) ? $_POST['nombre_rest'] : '';
$direccion = (isset($_POST['direccion'])) ? $_POST['direccion'] : '';
$opcionR = (isset($_POST['opcionR'])) ? $_POST['opcionR'] : '';
$id_rest = (isset($_POST['id_rest'])) ? $_POST['id_rest'] : '';

switch($opcionR){
    case 1: //alta
        $consulta = "INSERT INTO restaurantes (nombre_rest, direccion) VALUES('$nombre_rest', '$direccion') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 

        $consulta = "SELECT id_rest, nombre_rest, direccion FROM restaurantes ORDER BY id_rest DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2: //modificacion
        $consulta = "UPDATE restaurantes SET nombre_rest='$nombre_rest', direccion='$direccion' WHERE id_rest='$id_rest' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT id_rest, nombre_rest, direccion FROM restaurantes WHERE id_rest='$id_rest' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3: //baja
        $consulta = "DELETE FROM restaurantes WHERE id_rest='$id_rest' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();   
        break;
}


print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;