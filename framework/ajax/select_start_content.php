<?php 
    include_once "../../config.php";
    include_once "../db.php";

    $db = new DB();

    $data = [];

    $sql = "SELECT * FROM status";
    $data['status'] = $db->select($sql);

    $sql = "SELECT * FROM works";
    $data['works'] = $db->select($sql);


    echo json_encode($data);