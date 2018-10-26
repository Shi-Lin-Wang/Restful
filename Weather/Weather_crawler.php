      <?php
      /*initial */
      date_default_timezone_set("Asia/Taipei");
      $url= "kappa.sytes.net";
      $user = "test";
      $passwd = "410375003";

      $link = mysqli_connect($url, $user, $passwd);
      mysqli_query($link, "SET NAMES utf8");
      mysqli_select_db($link, "crawler");

      /*Crawler(weather)
      1. get uvi url
      2. crawl every country url
      3. get information
      4. send to DB
      5. close the sql connect
      */
      $URL_1 = "http://www.cwb.gov.tw/V7/forecast/UVI/UVI.htm";
      $StrCurl = getCrawler($URL_1);
         $Arr_URL = getURL($StrCurl); // return is every contry urls
         $Arr_location = array("臺北市","新北市","桃園市","新竹市","苗栗縣","臺中市","彰化縣","雲林縣","嘉義縣","臺南市","高雄市","屏東縣","南投縣","基隆市","宜蘭縣","花蓮縣","臺東縣","連江縣","金門縣","澎湖縣","新竹縣","嘉義市");
         for($i = 1 ; $i < (count($Arr_URL)+1) ; $i ++){
            $htmlcode = getWeb($Arr_URL[$i]);
            $arrTemperature = getTemperature($htmlcode);
            $arrStatus = getStatus($htmlcode);
            $arrAttitude = getAttitude($htmlcode);
            $arrRainRate = getRainRate($htmlcode);

            for($t = 0 ; $t < 2 ;$t++){
               $time = date("Y-m-d H");
               //$Time,$location,$T1,$T2,$status,$Attitude,$rainRate
               $T1 = $arrTemperature[$t*2];
               $T2 = $arrTemperature[($t*2)+1];
               $status = strval($arrStatus[$t]);
               $Attitude = strval($arrAttitude[$t]);
               $rainRate = strval($arrRainRate[$t]);
               $TimeTerval = analyzeTime()+$t;
               insertionWeather($TimeTerval,$time,$Arr_location[($i-1)],$T1,$T2,$status,$Attitude,$rainRate,$link);
            }

         }
         mysqli_close($link);
         /**************************************main end***********************************************/


         function insertionWeather($TimeTerval ,$Time,$location,$T1,$T2,$status,$Attitude,$rainRate,$link){
            $sql = "INSERT INTO `weather` (`Period`, `DataExtractingTime`, `Location`, `TemperatureSmall`, `TemperatureBig`, `WeatherCondition`, `ComfortDegree`, `RainningProbability`) VALUES ($TimeTerval, '$Time', '$location', $T1, $T2, '$status', '$Attitude', '$rainRate');";
            mysqli_query($link, $sql);
         }

         function getCrawler($URL){
            $ch = curl_init(); // ch type is resource

            curl_setopt($ch, CURLOPT_URL, $URL);
            curl_setopt($ch, CURLOPT_HEADER , false);

            curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
            $temp = curl_exec($ch);
            curl_close($ch);
            return $temp;
         }

         function getURL($curl){
            $urlArray;

            for($i = 1 ; $i < 23 ; $i ++){
               if($i < 10){
                  $Area = "uvimapArea0".(String)$i;
               }else{
                  $Area = "uvimapArea".(String)$i;
               }

               $htmlStr = "#<a href=\"(\S)*\" class=\"".$Area."#";
               preg_match_all($htmlStr,$curl,$match);
               $tempStr = substr($match[0][0], 9);
               $len = strlen($tempStr);
               $stop = $len - 21 ;
               $urlArray[$i] = substr($match[0][0],9,$stop);
               $httpHead = "http://www.cwb.gov.tw/";
               $urlArray[$i] = $httpHead.$urlArray[$i];
            }

            return $urlArray;

         }

         function getWeb($URL){
            $temp = getCrawler($URL);

            $weatherArr;
            $html_Str = "#th scope=\"row\">[(\S)*(\s)*]*</th>[(\S)*(\s)*]*</tr></tbody>#";
            preg_match($html_Str,$temp,$match);
            $html_Str2 = "#\"[(\S)*(\s)*]*%#";
            preg_match($html_Str2, $match[0],$m);
            $ss =  substr($m[0],6);
            $sss =  "<th scope=\"row\">".$ss."</td>";
            return  $sss;
         }

         function getTemperature($html_code){
      $html_pattern = "#<td>(\S)*(\s)(\S)(\s)(\S)*#"; // temperature
      preg_match_all($html_pattern, $html_code,$a);

      $pattern = "#(\d)(\d)#";
      for($i = 0 ; $i < 3 ; $i++){
         preg_match_all($pattern,$a[0][$i],$b);
         $res[2*$i] = $b[0][0];
         $res[(2*$i)+1] = $b[0][1];
      }
      print_r($res);
      return $res;
   }

   function getStatus($html_code){
      $html_Str4 = "#(\s)alt=(\S)*(\s)(\S)*#"; //
      preg_match_all($html_Str4, $html_code,$a);

      for($i = 0 ; $i < 3 ; $i++){
         $pattern = "#\"(\S)*\"#";
         preg_match_all($pattern,$a[0][$i],$b);
         $str = $b[0][0];
         $str2 = str_replace("\"", "", $str);

         $res[$i] = $str2;
      }
      print_r($res);
      return $res;
   }

   function getAttitude($html_code){
      $html_Str5 = "#<td>(\S)*</td>#"; //the attitude of weather
      preg_match_all($html_Str5, $html_code,$c);
      for($i = 0 ; $i < count($c[0]) ; $i++){
         $len = count($c[0][$i]);
         $res[$i] = substr($c[0][$i], 4,$len-6);
      }
      return $res;
   }
   function getRainRate($html_code){
      $html_Str6 = "#<td>(\S)*(\s)(\S)</td>#"; //the % of rain
      preg_match_all($html_Str6, $html_code,$d);
      for($i = 0 ; $i < count($d[0]) ; $i++){
         $len = count($d[0][$i]);
         $res[$i] = substr($d[0][$i], 4,$len-6);
      }
      print_r($res);
      return $res;
   }

   function analyzeTime(){
      $time = date("Y-m-d H:00:00");
      $time1 = date("Y-m-d 00:00:00");
      $time2 = date("Y-m-d 06:00:00");
      $time3 = date("Y-m-d 18:00:00");
      $time4 = date("Y-m-d 00:00:00", mktime(date('H'), date('i'), date('s'), date('m'), date('d')+1, date('Y')));

      if (strtotime($time) > strtotime($time1) && strtotime($time) < strtotime($time2)){
         return 0;
      }
      else if (strtotime($time) > strtotime($time2) && strtotime($time) < strtotime($time3)){
         return 1;
      }
      else if (strtotime($time) > strtotime($time3) && strtotime($time) < strtotime($time4)){
         return 2;
      }
   }
   ?>