<?php



    class DB{
        private function connect(){

            $link = new mysqli(HOST, USER, PASS, DB_NAME);
            if(!$link){
                die("error");
            }
            return $link;

        }

        public function select($sql){

            $result = $this->connect()->query($sql);
            $data = [];
            while($row = $result->fetch_assoc()){
                $data[] = $row;
            }
            return $data;
        }
    }


?>

