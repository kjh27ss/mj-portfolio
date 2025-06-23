<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["names"];
    $email = $_POST["email"];
    $message = $_POST["text"];

    $to = "anio27832@gmail.com";
    $subject = "웹사이트에서 새로운 메시지가 도착했습니다";
    $body = "이름: $name\n이메일: $email\n\n내용:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('메일이 전송되었습니다!'); history.back();</script>";
    } else {
        echo "<script>alert('메일 전송에 실패했습니다.'); history.back();</script>";
    }
}
?>