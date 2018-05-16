var offset = 400;//when to start animating

$(document).ready(function()
{
	$("#first").css("height",window.innerHeight);
	$("#first").css("max-height",window.innerHeight);
	//
	$("#second").css("height",window.innerHeight + 400);
	$("#second").css("max-height",window.innerHeight + 400);
	//
	$("#third").css("height",window.innerHeight + 400);
	$("#third").css("max-height",window.innerHeight + 400);
	//
	$("#fourth").css("height",window.innerHeight + 300);
	$("#fourth").css("max-height",window.innerHeight + 300);
	
	/*window.onresize = function()
	{
		$("#first").css("height",window.innerHeight);
		$("#second").css("height",window.innerHeight);
		$("#third").css("height",window.innerHeight);
		$("#fourth").css("height",window.innerHeight + 200);

	}*/
	var $window = $(window);
	var $animatables = $(".animatables");

	function refresh()
	{
		var wh = $window.height();
		var wtop = $window.scrollTop();
		var wbot = wtop + wh;
		var i = 1;

		var nav_top = $("nav").offset().top;
		var nav_height = $("nav").height();
		var sec_nav_height = $("#secondary_nav").height();
		
		//$("#leaf").css("margin-top",wtop + wh);
		
		if(wtop >= nav_top + nav_height - sec_nav_height)
		{
			$("#secondary_nav").css("visibility","visible");
			$("nav").css("visibility","hidden");
		}
		else
		{
			$("#secondary_nav").css("visibility","hidden");
			$("nav").css("visibility","visible");
		}

		$.each($animatables,function()
		{
			var elem_top = $(this).parent().offset().top;//"#second"
			var elem_h = $(this).parent().outerHeight();//"#second"
			var elem_bottom = elem_top + elem_h;

			if(wtop >= elem_top-offset /*&& wtop <= elem_bottom*/)
			{
				$(this).removeClass("invisibles");
				$(this).addClass("visibles");
			}
			else
			{
				$(this).addClass("invisibles");
			}
			i++;
		});
	}

	$window.trigger("scroll");
	$window.on("scroll resize",refresh);

	$("#btn-enter").click(function()
	{
		$("nav").css("visibility","visible");
		$("#container").addClass("slideaway");
		$("#rest").css("display","initial");
		$("#first_page_content").css("display","initial");
		$("footer").css("display","block");
	});
	
	$("#btn-send").click(function()
	{
		var naam = $("#txt-name").val();
		var msg = $("#txt-msg").val();
		var mail = $("#txt-email").val();
		var valid = true;
		//Client side email validations
		if(mail.toString().length < 4 || mail.toString().indexOf("@") == -1)
		{
			$("#txt-email").css("border","2px solid red");
			$("#email-notif").text("We need a valid email address.");
			valid = false;
		}
		else
		{
			$("#txt-email").css("border","2px solid #027ec1");
			$("#email-notif").text("*");
		}
		
		//Client side message validations
		if(msg.toString().length < 20)
		{
			$("#txt-msg").css("border","2px solid red");
			$("#msg-notif").text("Message must be greater than or equal to 20 characters");
			valid = false;
		}
		else
		{
			$("#txt-msg").css("border","2px solid #027ec1");
			$("#msg-notif").text("*");
		}
		
		if(valid)
		{
			//var json_obj = JSON.stringify({name: naam,email: mail,message: msg});

			$.ajax(
			{
				type:"post",
				url:"/www/Imveloenhle/mail.php",
				data:{name:naam,email:mail,message:msg},
				success:function(data)
						{
							if(data.toString().indexOf("SUCCESS") != -1)
							{
								alert("Mail sent, we will contact you soon.");
							}
							else
							{
								alert("Mail NOT sent - something went wrong: " + data.toString());
							}
						}
			});
		}
	});
	
	function showSuccess(data)
	{
		alert("Mail sent: " + data);
	}
});
