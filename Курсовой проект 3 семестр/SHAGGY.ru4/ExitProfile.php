<?php
        setcookie("id", $data['Tel'], time()-60*60, "/");
        echo json_encode(array('success' => 1));
