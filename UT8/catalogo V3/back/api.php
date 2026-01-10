<?php
    header("Content-Type: application/json; charset=utf-8");
    $data = file_get_contents("php://input");
    $producto = json_decode($data, true);

    switch ($producto['accion']) {
        case 'guardar':
            guardar_producto($producto);
            break;
    }

    // guardar_producto($producto)

    function guardar_producto($producto) {
        
        try {
            $conn = conexion();
            $conn -> beginTransaction();

            $stmt = $conn -> prepare(
                "INSERT INTO productos (id, nombre, descripcion, precio, imagen)
                VALUES (:id, :nombre, :descripcion, :precio, :imagen)"
            );

            $stmt -> bindParam('id', $producto['id']);
            $stmt -> bindParam('nombre', $producto['nombre']);
            $stmt -> bindParam('descripcion', $producto['descripcion']);
            $stmt -> bindParam('precio', $producto['precio']);
            $stmt -> bindParam('imagen', $producto['imagen']);

            $stmt -> execute();

            $conn -> commit();

            echo json_encode(["success" => true, "message" => "Producto guardado"]);
        }

        catch (PDOException $e) {
            $conn -> rollBack();
            echo json_encode(["success" => false, "error" => "ID duplicado"]);
        }

        $conn = null;
    }


    // conexion()

    function conexion() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname="productos";

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $conn;
    }
?>
