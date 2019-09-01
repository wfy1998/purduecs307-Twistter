<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if(!empty($_POST['contact_name']) && !empty($_POST['contact_email']) && !empty($_POST['contact_message'])) {
		$to = 'email@address.com'; // Replace with your email.
		$body = "Name: {$_POST['contact_name']}\n\nEmail: {$_POST['contact_email']}\n\nPhone: {$_POST['contact_phone']}\n\nMessage: {$_POST['contact_message']}";
		mail($to, "Contact Form Submission: {$_POST['contact_subject']}", $body, "From: {$_POST['contact_email']}");
	}
}
?>