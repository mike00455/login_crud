<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();
// Recepción de los datos enviados mediante POST desde el JS  

$nombre_plat = (isset($_POST['nombre_plat'])) ? $_POST['nombre_plat'] : '';
$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';
$opcionP = (isset($_POST['opcionP'])) ? $_POST['opcionP'] : '';
$id_plat = (isset($_POST['id_plat'])) ? $_POST['id_plat'] : '';

switch($opcionP){
    case 1: //alta
        $consulta = "INSERT INTO platos (nombre_plat, descripcion) VALUES('$nombre_plat', '$descripcion') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 

        $consulta = "SELECT id_plat, nombre_plat, descripcion FROM platos ORDER BY id_plat DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2: //modificacion
        $consulta = "UPDATE platos SET nombre_plat='$nombre_plat', descripcion='$descripcion' WHERE id_plat='$id_plat' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT id_plat, nombre_plat, descripcion FROM platos WHERE id_plat='$id_plat' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3: //baja
        $consulta = "DELETE FROM platos WHERE id_plat='$id_plat' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();   
        break;
}


print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;