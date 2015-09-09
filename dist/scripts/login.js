(function() {
  $("#login-form").find("button[type=submit]").click(function(e) {
    var $err, l, password, username;
    e.preventDefault();
    $err = $("#login-form").find("#contact-error");
    $err.html("");
    username = $("#login-form").find("#username").val();
    if ($.trim(username).length === 0) {
      $err.html("You must specify a username.");
      return e.preventDefault();
    }
    password = $("#login-form").find("#password").val();
    if ($.trim(password).length === 0) {
      $err.html("You must specify an password.");
      return e.preventDefault();
    }
    l = Ladda.create(this);
    l.start();
    $.ajax({
      url: "/api/auth/signin",
      type: "POST",
      data: $("#login-form").serialize(),
      success: function(data, textStatus, jqXHR) {
        window.location.href = "/";
      },
      error: function(jqXHR, textStatus, errorThrown) {
        l.stop();
        if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
          $err.html(jqXHR.responseJSON.message);
        } else {
          $err.html("Sign In failed.");
        }
      }
    });
  });

}).call(this);
