<?php

        $data = array();

        if ($data['status'] = 'OK'){
        $data['text'] = '';
        }
        else{
            $data['text'] = 'Ошибка! Невозможно зайти в личный кабинет!';
            }

    header("Content-Type: application/json");
    echo json_encode($data);
    exit;

?>
