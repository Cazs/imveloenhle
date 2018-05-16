<?php
	if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']))
	{
		if(!empty($_POST['email']) && !empty($_POST['message']))
		{
			$to = "support@imveloenhle.co.za";
			$from = strip_tags($_POST['email']);
			$headers = "From: Imveloenhle Mailing System\r\n";
			$headers .= "Reply-To: ". $from . "\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			$subject = "New Mail From Website";
			$name = "";
			
			if(empty($_POST['name']))
				$name = "Anonymous";
			else
				$name = strip_tags($_POST['name']);
				
			$msg = "New message from " . $name . "<br/>";
			$msg .= "Email Address: " . $from . "<br/>";
			$msg .= "Message: " . $_POST['message'] . "<br/>";
			$msg .= "<br/>Regards<br/>---------<br/>Imveloenhle Mailing System";
			
			mail($to,$subject,$msg,$headers);
			
			echo "SUCCESS";
		}
		else
		{
			echo "Empty_fields_error";
			return;
		}
	}
	else
	{
		echo "Invalid_parameters";
		return;
	}
?>