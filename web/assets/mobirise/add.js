var check = 0;
var home = true;
var eblock = false;
var all = false;
var path = [];


var intervalid1;//update status
var intervalid2;//update files

$.notify.defaults({
    // whether to hide the notification on click
    clickToHide: true,
    // whether to auto-hide the notification
    autoHide: true,
    // if autoHide, hide after milliseconds
    autoHideDelay: 10000,
    // show the arrow pointing at the element
    arrowShow: true,
    // arrow size in pixels
    arrowSize: 5,
    // position defines the notification position though uses the defaults below
    position: 'bottom right',
    // default positions
    elementPosition: 'bottom right',
    globalPosition: 'bottom right',
    // default style
    style: 'bootstrap',
    // default class (string or [string])
    className: 'info',
    // show animation
    showAnimation: 'slideDown',
    // show animation duration
    showDuration: 400,
    // hide animation
    hideAnimation: 'slideUp',
    // hide animation duration
    hideDuration: 200,
    // padding between element and notification
    gap: 2
});
var name="";
var cdirx = "";


function edit_file(){
	eblock=true;
	if($.isMobile()){
		$(".menu").slideUp(1000);
		$("#message-form1-1").attr("rows","2");
	}
	$("#efile_x").slideDown(1000,function(){$("#message-form1-1").focus();});
	$("#ind2").slideUp(1000);
	
	  var cdir = ".";
    
        for (var i = 0; i < path.length; i++) {
            cdir += path[i];
        }
        cdir += "\\";
    
    var st;
    var tmp = 0;
    while (1) {
        if (document.getElementById(tmp) != null) {
            if (document.getElementById("c_" + tmp).checked == true) {
                if (document.getElementById(tmp).getAttribute("class") == "file selected") {
                    st = (document.getElementById(tmp).getAttribute("path"));
                }
                break;
            }
            tmp += 1;
        } else break;
    }
	$('#message-form1-1').on('keyup',function(){
		$(this).css('height','auto');
		$(this).height(this.scrollHeight);
	});
	$.get("download_file:"+cdir+st+"|",function(data){
		$("#message-form1-1").val(data);
		$("#xsave").click(function(){
			$.post("rewrite_file","#"+cdir+st+"|"+$("#message-form1-1").val());
			eblock=false;
			$("#efile_x").slideUp(1000);
			$("#ind2").slideDown(1000);
			if($.isMobile())$(".menu").slideDown(1000);
			return false;
		});
		$("#xcancel").click(function(){
			eblock=false;
			if($.isMobile())$(".menu").slideDown(1000);
			if($.isMobile())$(".menu").slideDown(1000);
			$("#efile_x").slideUp(1000);
			$("#ind2").slideDown(1000);
			return false;
		});
		$("#xre").click(function(){
			$.get("download_file:"+cdir+st+"|",function(data){$("#message-form1-1").val(data);});
			return false;
		});

	});
	
	
}
function zgo(num){
	var tmp = num;
	var tmpn="";
	while (1) {
		if (document.getElementById(tmp) != null) {
			if (document.getElementById("c_" + tmp).checked == true) {
				document.getElementById("c_" + tmp).checked = false;
				$("#"+tmp).removeClass("selected");
				tmpn = document.getElementById(tmp).getAttribute("path");
				$.get("zip_files:add:"+cdirx+name+"|"+tmpn,function(){zgo(tmp);});
				
				
				
				
				if(document.getElementById("zipch").checked == true) {
					var st = document.getElementById(tmp).getAttribute("path");
					var cdir = ".";
					for (var i = 0; i < path.length; i++) {
						cdir += path[i];
					}
					cdir+="/";
					$.get("del_file:" + cdir + st, function (data) { 
						getfiles();
						ch();
						if(data=="OK"){
							$.notify.addStyle('foo', {
								html:
									"<div>" +
									"<div class='clearfix'>" +
									"<div class='title' data-notify-html='title'/>" +
									"<div class='buttons'>" +
									"<button onclick='$.get(\"undo_del_file:" + cdir + st + "\",function(){getfiles();ch();});' class=\"yes nvbtn\" data-notify-text='button'></button>" +
									"</div>" +
									"</div>" +
									"</div>"
							});
							
							$.notify({
								title: st +" will be deleted",
								button: 'undo'
							}, {
									clickToHide: true,
									autoHide: true,
									autoHideDelay: 18500,
									showDuration: 1000,
									hideDuration: 500,
								// hideAnimation: "fadeOut",
									style: 'foo',
							});
							setTimeout(function(){getfiles(); ch();},11000);
						}
					});
					
				}
				return;
			}
			tmp += 1;
		} else break;
	}
	getfiles();ch();
	eblock = false;
}
function unzip(){
	var tmpn="";
	var tmp=0;
	check=0;
	var cdir="";
	if (home == false) {
				cdir+=".";
				for (var i = 0; i < path.length; i++) {
					cdir += path[i];
				}
				cdir += "\\";
			}
	while (1) {
		if (document.getElementById(tmp) != null) {
			if (document.getElementById("c_" + tmp).checked == true) {
				document.getElementById("c_" + tmp).checked = false;
				$("#"+tmp).removeClass("selected");
				tmpn = document.getElementById(tmp).getAttribute("path");
				$.get("zip_files:unzip:"+cdir+tmpn,function(data){getfiles();ch();if(data!="OK"){$.notify("error unzipping this file");}});
				return;
			}
			tmp += 1;
		} else break;
	}
}
function zip(){
 var x3 = true;
    $(".new-content").removeClass("active");
    if ($.isMobile()) {
        $("#input #divin").css({ "top": "10px" });
    }
    eblock = true;
    $("#input").slideDown(1000);
    $("#info_file").slideUp(100);
	$(".info_zip").slideDown(100);
    $("#info_dir").slideUp(100);
    $("#input_text").focus()
    $("#input_form").submit(function () {
        if (x3 == true) {
            x3 = false;
            name = $("#input_text").val();
            $("#input_text").val("");
            $("#input").slideUp(1000);
			check=0;
			
			
				cdirx+=".";
				for (var i = 0; i < path.length; i++) {
					cdirx += path[i];
				}
				cdirx += "\\";
			zgo(0);
            
        }
    });	
}
function finden_und_entfernen(dasarray, wert) {

    var der_index = index_finden(dasarray, wert);
    if (der_index > -1) {
        return dasarray.splice(der_index, 1);
    }
    return dasarray;
}
function index_finden(dasarray, wert) {

    for (var i = 0; i < dasarray.length; i++) {
        if (dasarray[i] === wert) {
            return i; document.write(i);
        }
    }
    return -1;
}
var mvf=false;
var af=[];
function move_file(){
	eblock=true;
	window.clearInterval(intervalid2);
	$(".moveOK").slideDown(100);
	mvf=true;
	af=[];
	$("#sa").slideUp(100);
	$("#yname").slideUp(100);
	var tmp = 0;
	var cdirx =".";
	for (var i = 0; i < path.length; i++) {
		cdirx += path[i];
	}
	cdirx += "\\";
	while (1) {
		if (document.getElementById(tmp) != null) {
			if (document.getElementById("c_" + tmp).checked == true) {
				$("#"+tmp).slideUp(1);
				$("#"+tmp).removeClass("selected");
				document.getElementById("c_" + tmp).checked = false;
				var st=document.getElementById(tmp).getAttribute("path");
				af.push(cdirx+st);
			}
			tmp += 1;
		} else break;
	}
	tmp=0;
	while (1) {
		if (document.getElementById(tmp) != null) {
			if (document.getElementById(tmp).getAttribute("class")!="directory") {
				$("#"+tmp).slideUp(1);
			}
			tmp += 1;
		} else break;
	}
	check=0;
	ch();
	$("#movebuttoncancel").click(function(){
		mvf=false;
		$("#yname").slideDown(100);	
		$(".moveOK").slideUp(100);
		intervalid2 = window.setInterval("getfiles()", (sec3 * 1000));
		getfiles();
		ch();
		eblock=false;
	});
	$("#movebuttonOK").click(function(){
		mvf=false;
		$("#yname").slideDown(100);	
		$(".moveOK").slideUp(100);
		intervalid2 = window.setInterval("getfiles()", (sec3 * 1000));
		eblock=false;
		var cdirx =".";
		for (var i = 0; i < path.length; i++) {
			cdirx += path[i];
		}
		cdirx += "\\";
		
		for(var i=0;i<af.length;i++){
			var com="move_file:"+af[i]+"-rxdcvuzibu-"+cdirx;
			$.get(com,function(){
				getfiles();ch();
			});
		}
		getfiles();
		ch();
	});
}

function ch() {
    if (check > 1) {
        $(".dropdown").slideDown(0);
        $("#delete_file").slideDown(0);
        $("#zip_file").slideDown(0);
        $("#unzip_file").slideUp(0);
        $("#move_file").slideDown(0);
        $("#edit_file").slideUp(0);
        $("#download_file").slideDown(0);
        $("#enter_file").slideUp(0);
        $("#uploadfileform").slideUp(0);
        $("#uploadfileform").css({ "position": "relative" });
        $("#back").slideUp(0);
		if($.isMobile)$("#sa").slideDown(0);
    }

    if (check == 1) {
        $(".dropdown").slideDown(0);
        $("#back").slideUp(0);
        $("#uploadfileform").slideUp(0);
        $("#uploadfileform").css({ "position": "relative" });
        $("#zip_file").slideDown(0);
        $("#unzip_file").slideDown(0);
        $("#download_file").slideDown(0);
        $("#delete_file").slideDown(0);
        $("#move_file").slideDown(0);
        var tmp = 0;
        while (1) {

            if (document.getElementById(tmp) != null) {
                if (document.getElementById("c_" + tmp).checked == true) {
                    if (document.getElementById(tmp).getAttribute("class") == "file selected") {
                        $("#edit_file").slideDown(0);
                        $("#enter_file").slideUp(99);
                    }
                    if (document.getElementById(tmp).getAttribute("class") == "directory selected") {
                        $("#enter_file").slideDown(99);
						if($.isMobile)$("#sa").slideUp(0);
                        $("#edit_file").slideUp(0);
                    }
                    break;
                }
                tmp += 1;
            }
        }
    }

    if (check == 0) {
        $(".dropdown").slideUp(0);
        $("#uploadfileform").slideDown(0);
        $("#uploadfileform").css({ "position": "fixed" });
        if (home == false) {
            $("#back").slideDown(0);
			if($.isMobile)$("#sa").slideUp(0);
        }
        if (home == true) {
            $("#back").slideUp(0);
			if($.isMobile)$("#sa").slideDown(0);
        }
        $("#delete_file").slideUp(0);
        $("#move_file").slideUp(0);
        $("#enter_file").slideUp(0);
        $("#edit_file").slideUp(0);
        $("#zip_file").slideUp(0);
        $("#unzip_file").slideUp(0);
        $("#download_file").slideUp(0);
		if($.isMobile)$("#sa").slideDown(0);
    }
	if(mvf){
		$("#sa").slideUp(0);
		var tmp=0;
		var cdirx=".";
		for (var i = 0; i < path.length; i++) {
			cdirx += path[i];
		}
		cdirx += "\\";
		while (1) {
			if (document.getElementById(tmp) != null) {
				if (document.getElementById(tmp).getAttribute("class")!="directory"&&document.getElementById(tmp).getAttribute("class")!="directory selected") {
					$("#"+tmp).slideUp(1);
				}
				for(var i=0;i<af.length;i++){
					if(af[i]==cdirx+document.getElementById(tmp).getAttribute("path")){
						
						$("#tmp").slideUp(1);
					}
				}
				
			} else break;
			tmp++;
		}
	}
}
function getfiles() {
		var selected = [];
		var tmp = 0;
		while (1) {
			if (document.getElementById(tmp) != null) {
				if (document.getElementById("c_" + tmp).checked == true) {
					selected.push(document.getElementById(tmp).getAttribute("path"));
				}
				tmp += 1;
			} else break;
		}
		var cdir = "";
		for (var i = 0; i < path.length; i++) {
			cdir += path[i];
		}
		$.get("get_files:" + cdir, function (data) {
			if(data=="NE"){back();return;}
			$("#tinhalt").html(data);
			var tmp2=0;
			check=0;
			for (tmp = 0; document.getElementById(tmp) != null; tmp++) {
				
					if(document.getElementById(tmp).getAttribute("path")==selected[tmp2]){
						$("#" + tmp).addClass("selected");
						document.getElementById("c_" + tmp).checked = true;
						tmp2++;
						check++;
					}
				
			}
			ch();
			sa(true);
			$("#px").html(cdir);
		});
	}

function delete_file() {
    var cdir = ".";
    for (var i = 0; i < path.length; i++) {
        cdir += path[i];
    }
	cdir+="/";
    var tmp = 0;
    while (1) {
        if (document.getElementById(tmp) != null) {
            if (document.getElementById("c_" + tmp).checked == true) {
                var st="";st = document.getElementById(tmp).getAttribute("path");
				//document.getElementById("c_" + tmp).checked = false;
				//$("#"+tmp).removeClass("selected");
				if(document.getElementById(tmp).getAttribute("del")=='0'){
					$.notify.addStyle('foo', {
							html:
								"<div>" +
								"<div class='clearfix'>" +
								"<div class='title' data-notify-html='title'/>" +
								"<div class='buttons'>" +
								"<button onclick='$.get(\"undo_del_file:" + cdir + st + "\",function(){getfiles();ch();});' class=\"yes nvbtn\" data-notify-text='button'></button>" +
								"</div>" +
								"</div>" +
								"</div>"
						});
						$.notify({
							title: st +" will be deleted",
							button: 'undo'
						}, {
								autoHide: true,
								clickToHide: true,
								autoHideDelay: 18500,
								showDuration: 1000,
								hideDuration: 500,
							// hideAnimation: "fadeOut",
								style: 'foo',
						});
						setTimeout(function(){getfiles(); ch();},10000);
				}
                $.get("del_file:" + cdir + st, function (data) { 
				getfiles();
				ch();
				});
			}
            tmp += 1;
        } else { break };
    }
}

$(document).keydown(function (e) {
    if (eblock == false) {
        //tab
        if (e.keyCode === 9) {
            if (check == 0) {
				if(document.getElementById("0") != null){
					check = 1;
					document.getElementById("c_0").checked = true;
					$("#0").addClass("selected");
					ch();
				}
			}
            else if (check == 1) {
                check = 0;
                var tmp = 0;
                while (1) {
                    if (document.getElementById(tmp) != null) {
                        if (document.getElementById("c_" + tmp).checked == true) {
                            document.getElementById("c_"+tmp).checked = false;
                            $("#"+tmp).removeClass("selected");
                            break;
                        }
                        tmp += 1;
                    } else break;
                }
                ch();
            }

            return false;
        }
        if (e.keyCode == 46) {
            delete_file();
            return false;
        }
       
        if (e.keyCode == 27) {
            if (check == 0)
                index();
            else {
                var x = 0;
                while (1) {
                    check = 0;
                    if (document.getElementById(x) != null) {
                        document.getElementById("c_" + x).checked = false;
                        $("#" + x).removeClass("selected");

                    } else { break; }
                    x++;
                }
            }
            return false;
        }
        //ctrl a
        if (e.ctrlKey && e.keyCode === 65) {
            sa(false);
            ch();
            return false;
        }
        //up
        if (e.keyCode === 38) {
			all=false;
            var tmp = 1;
            while (1) {
                if (document.getElementById(tmp) != null) {

                    if (document.getElementById("c_" + tmp).checked == true) {
                        if (!e.shiftKey) {
                            var tmp3 = 0;
                            while (1) {
                                if (document.getElementById(tmp3) != null) {
                                    document.getElementById("c_" + tmp3).checked = false;
                                    $("#" + tmp3).removeClass("selected");
                                    tmp3++;
                                    check = 0;
                                } else break;
                            }
                        }
                        check += 1;
                        document.getElementById("c_" + (tmp - 1)).checked = true;
                        $("#" + (tmp - 1)).addClass("selected");
                        ch();
                        return false;
                    }
                } else break;
                tmp += 1;
            }
        }
        //down
        if (e.keyCode === 40) {
			all=false;
            var tmp = 0;

            while (1) {
                if (document.getElementById(tmp + 1) != null) {
                    if (document.getElementById("c_" + tmp).checked == true) {
                        var tmp2 = tmp;
                        if (e.shiftKey) {
                            while (document.getElementById("c_" + tmp2).checked == true) { tmp2++; }
                        } else {
                            var tmp3 = 0;
                            while (1) {
                                if (document.getElementById(tmp3) != null) {
                                    document.getElementById("c_" + tmp3).checked = false;
                                    $("#" + tmp3).removeClass("selected");
                                    check = 0;
                                    tmp3++;
                                } else break;
                            }
                            tmp2 += 1;
                        }
                        check += 1;
                        document.getElementById("c_" + (tmp2)).checked = true;
                        $("#" + (tmp2)).addClass("selected");
                        ch();
                        return false;
                    }

                    tmp += 1;
                } else break;

            }
        }
        //enter
        if (e.keyCode === 13) {
            if (check == 1) {
                var tmp = 0;
                while (1) {
                    if (document.getElementById(tmp) != null) {
                        if (document.getElementById("c_" + tmp).checked == true) {
                            if (document.getElementById(tmp).getAttribute("class") == "file selected") {
                                download_file();
                            }
                            if (document.getElementById(tmp).getAttribute("class") == "directory selected") {
                                enter_file();
                            }
                            return false;
                        }
                    } else break;
                    tmp += 1;
                }
            } else if (check == 0) {
                back();
            } else if (check > 1) {
				download_file();
			}
        }
    }
});

function download_file() {
    var cdir = "";
    if (home == false) {
        for (var i = 0; i < path.length; i++) {
            cdir += path[i];
        }
        cdir += "\\";
    }
    var st="";
    var tmp = 0;
	var tmp2=0;
	var fileName="";
    while (1) {
        if (document.getElementById(tmp) != null) {
            if (document.getElementById("c_" + tmp).checked == true) {
                if (document.getElementById(tmp).getAttribute("class") == "file selected") {
                    st += (document.getElementById(tmp).getAttribute("path"));
					st+="|";
					fileName=document.getElementById(tmp).getAttribute("path");
					tmp2++;
                }
            }
            tmp += 1;
        } else break;
    }



	$.notify("preparing download...  please wait\nIf you select many files, this may take a while");
    var req = new XMLHttpRequest();
    req.open("GET", "download_file:" + cdir + st, true);
    req.responseType = "blob";
    req.onload = function (event) {
        var blob = req.response;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
		if(tmp2==1)
        link.download = fileName;
		else
		link.download = "download.zip";
        link.click();
		$(document).focus();
    };

    req.send();
	
}
function sa(tre) {
    var x = 0;
    while (1) {
        if (document.getElementById(x) != null) {
			if(tre==false){
				if (all == false) {
					if (document.getElementById("c_" + x).checked == false) {
						document.getElementById("c_" + x).checked = true;
						check += 1;
						$("#" + x).addClass("selected");
					}
				} else {
					document.getElementById("c_" + x).checked = false;
					$("#" + x).removeClass("selected");
					check = 0;
				}
			}else{
				if (all == true) {
					if (document.getElementById("c_" + x).checked == false) {
						document.getElementById("c_" + x).checked = true;
						check += 1;
						$("#" + x).addClass("selected");
					}
				}
			}
        } else { break; }
        x++;
    }
	if(tre==false){
    if (all == false) {
        all = true;
    }
    else {
        all = false;
        check = 0;
    }
	}
    ch();
}
function create_directory() {
   var x2 = true;
    $(".new-content").removeClass("active");
    if ($.isMobile()) {
        $("#input #divin").css({ "top": "10px" });
    }

    eblock = true;
    $("#input").slideDown(1000);
    $("#info_dir").slideDown(100);
    $("#info_file").slideUp(100);
	$(".info_zip").slideUp(100);
    $("#input_text").focus()
    $("#input_form").submit(function () {
        if (x2 == true) {
            x2=false
            var name = $("#input_text").val();
            $("#input_text").val("");


            $("#input").slideUp(1000);
            if (home == true) { $.get("create_directory:" + name, function () { getfiles(); ch(); }); }
            else {
                var cdir = "";
                for (var i = 0; i < path.length; i++) {
                    cdir += path[i];
                }
                cdir += "/";
                $.get("create_directory:" + cdir + name, function () { getfiles(); ch(); });
            }
            eblock = false;
        }
    });
}
function create_file() {
    var x = true;
    $(".new-content").removeClass("active");
    if ($.isMobile()) {
        $("#input #divin").css({ "top": "10px" });
    }
    eblock = true;
    $("#input").slideDown(1000);
    $("#info_file").slideDown(100);
    $("#info_dir").slideUp(100);
	$(".info_zip").slideUp(100);
    $("#input_text").focus()
    $("#input_form").submit(function () {
        if (x == true) {
            x = false;
            var name = $("#input_text").val();
            $("#input_text").val("");

            $("#input").slideUp(1000);
            if (home == true) { $.get("create_file:" + name, function () { getfiles(); ch(); }); }
            else {
                var cdir = "";
                for (var i = 0; i < path.length; i++) {
                    cdir += path[i];
                }
                cdir += "/";
                $.get("create_file:" + cdir + name, function () { getfiles(); ch(); });
            }
            eblock = false;
        }
    });
}
function back() {
    if (home == false) {
        path.pop();
        getfiles();
        check = 0;
    }

    if (path.length == 0) {
        home = true;
    }
    ch();
}
function enter_file() {
    $(".new-content").removeClass("active");
    var tmp = 0;
    home = false;
    $("#back").slideDown(0);
    while (1) {
        if (document.getElementById(tmp) != null) {
            if (document.getElementById("c_" + tmp).checked == true) {
				document.getElementById("c_" + tmp).checked = false;
				$("#"+tmp).removeClass("selected");
                var st = document.getElementById(tmp).getAttribute("path");
                path.push("/" + st);
				check = 0;
				ch();
                getfiles();
				return;
			}
        } else { 
			return;
		}
		tmp += 1;
    }
}
function sel(x) {
	all=false;
    if (document.getElementById("c_" + x).checked == false) {
        document.getElementById("c_" + x).checked = true;
        check += 1;
        $("#" + x).addClass("selected");
    } else {
        document.getElementById("c_" + x).checked = false;
        all = false;
        check -= 1;
        $("#" + x).removeClass("selected");
    }

    ch();
}
var nerr = 0;
var onof = true;
var timer;
function update() {
    timer = window.setTimeout(function () {
        nerr += 1;
        return;
    }, 5000);
    if (nerr >= 2) {
        nerr = 0;
        if ($.isMobile()) {
            $("#status").html("status: <br>server unreachable");
            $("#sdiv").css({ "width": "100%" });
        } else {
            $("#status").html("&nbsp;&nbsp;status: server unreachable&nbsp;&nbsp;");
            $("#sdiv").css({ "font-size": "35px", "border-radius": "35px" });
        }
        $("#mcstatus").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;&nbsp;?&nbsp;&nbsp;?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        $("#stop").slideUp(2000);
        $("#restart").slideUp(2000);
        $("#start").slideUp(2000);
        $("#kill").slideUp(2000);
    }


    $.get("is_server_online", function (data) {
        clearTimeout(timer);
		if(data=="NA"){}
        nerr = 0;
        if ($.isMobile()) {
            $("#status").html("status: <br>" + data);
            $("#sdiv").css({ "width": "100%", "font-size": "15px" });
        } else {
            $("#status").html("&nbsp;&nbsp;status: " + data + "&nbsp;&nbsp;");
            $("#sdiv").css({ "border-radius": "35px", "margin-bottom": "0" });
        }
        if (data == "server is online and accepting players") {
            $.get("mcquery", function (data) {
                if ($.isMobile()) {
                    $("#mcstatus").html(data);
                    $("#mcstatus").css({ "width": "100%", "font-size": "12px" });
                    $("#padding__").html("<br><br>");
                } else {
                    $("#mcstatus").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                    $("#mcstatus").css({ "font-size": "25px", "border-radius": "35px", "padding-bottom": "0", "margin": "auto" });
                }
            });
            $("#mcstatus").slideDown(1000);
            if (Boolean(onof) == 1) {
                $("#circularG").slideUp(1000);
                onof = 0;
            }
            $("#stop").slideDown(0);
            $("#start").slideUp(0);
            $("#restart").slideDown(0);
            $("#kill").slideDown(0);
            $("#mcstatus").slideDown(0);
        }
        else if (data == "server is not running") {
            if (Boolean(onof) == 1) {
                $("#circularG").slideUp(1000);
                onof = 0;
            }
            $("#mcstatus").slideUp(1000);
            $("#stop").slideUp(0);
            $("#restart").slideUp(0);
            $("#start").slideDown(0);
            $("#kill").slideUp(0);

        }
        else if (data == "server is getting ready to start") {
            if (Boolean(onof) == 0) {
                $("#circularG").slideDown(1000);
                onof = 1;
            }
            $("#restart").slideDown(0);
            $("#start").slideUp(0);
            $("#stop").slideDown(0);
            $("#kill").slideDown(0);

        }
        else if (data == "server is shutting down") {
            if (Boolean(onof) == 0) {
                $("#circularG").slideDown(1000);
                onof = 1;
            }

            $("#kill").slideDown(0);
            $("#restart").slideUp(0);
            $("#start").slideUp(0);
            $("#stop").slideUp(0);
            $("#mcstatus").slideUp(0);
        }
        else if (data == "server is shutting down and restarting") {
            if (Boolean(onof) == 0) {
                $("#circularG").slideUp(1000);
                $("#circularG").slideDown(1000);
                onof = 1;
            }
            $("#kill").slideDown(0);
            $("#restart").slideUp(0);
            $("#start").slideUp(0);
            $("#stop").slideUp(0);
            $("#mcstatus").slideUp(0);

        }

    });
}
function startserver() {
    $.get("start_server",update);
    update();
}
function stopserver() {
    $.get("stop_server",update);
    update();
}
function killserver() {
    $.get("kill_server",update);
    update();
}
function ArrayBufferToString(buffer) {
    return BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
}

function BinaryToString(binary) {
    var error;

    try {
        return decodeURIComponent(escape(binary));
    } catch (_error) {
        error = _error;
        if (error instanceof URIError) {
            return binary;
        } else {
            throw error;
        }
    }
}
function upll(){
	var fi = document.getElementById('files').files;
	var len=fi.length;
	for(var i=0;i<len;i++){
		var formData = new FormData();
		var cdir = ".";
		for (var ix = 0; ix < path.length; ix++) {
			cdir += path[ix];
		}
		cdir += "/";
		formData.append('path', cdir);
		formData.append('file', $('#files')[0].files[i]);
	
		$.ajax({
			url : 'upload_file',
			type : 'POST',
			data : formData,
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			
		});
	}
}
		
					
					
	


function index() {
    $("#ind2").slideUp(1200);
    $("#ind3").slideUp(1200);
    $("#ind4").slideUp(1200);
    setTimeout(function () {
        $("#ind1").slideDown(1200);
    }, 100);
    window.clearInterval(intervalid2);
}

function fmanager() {
    $("#ind1").slideUp(1200);
    $("#ind4").slideUp(1200);
    $("#ind3").slideUp(1200);
    setTimeout(function () {
        $("#ind2").slideDown(1200);
    }, 100);
    getfiles();
    intervalid2 = window.setInterval("getfiles()", (sec3 * 1000));
}

function wmanager() {
    window.clearInterval(intervalid2);
    $("#ind2").slideUp(1200);
    $("#ind4").slideUp(1200);
    $("#ind1").slideUp(1200);
    setTimeout(function () {
        $("#ind3").slideDown(1200);
    }, 100);
}

function pmanager() {
    window.clearInterval(intervalid2);
    $("#ind3").slideDown(1200);
    $("#ind2").slideUp(1200);
    $("#ind1").slideUp(1200);
    setTimeout(function () {
        $("#ind4").slideDown(1200);
    }, 100);
}

function init() {
    update();
    $("#ind4").slideUp(0);
    $("#ind2").slideUp(0);
    $("#ind3").slideUp(0);
    $("#ind1").slideDown(0);
    intervalid1 = window.setInterval("update()", (sec * 1000));
    $(".btn-black-outline").css({ "color": "black" });
    $("#uploadfileform").hover(function () {
        if ($.isMobile() == false) {
            $(".new-content").addClass("active");
        }
    }, function () {
        if ($.isMobile() == false) {
            $(".new-content").removeClass("active");
        }
    });
	if ($.isMobile()) {
        $("#divin").css({"width":"100%","left":"0"});
		$("#paddi").slideUp(0);	
    }
    ch();
}


function drd() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function drd2() {
    document.getElementById("new-content").classList.toggle("active");
}

window.onclick = function (event) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    var y = false;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            $(".dropdown").css({ "postion": "fixed" });
            y = true;
        }
    }
    if (y == false) { $(".dropdown").css({ "postion": "relative" }); }
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


