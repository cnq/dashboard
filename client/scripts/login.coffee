$("#login-form").find("button[type=submit]").click (e) ->
  e.preventDefault()
  $err = $("#login-form").find("#contact-error")
  $err.html "" #clear any existing message
  username = $("#login-form").find("#username").val()
  if $.trim(username).length is 0
    $err.html "You must specify a username."
    return e.preventDefault()
  password = $("#login-form").find("#password").val()
  if $.trim(password).length is 0
    $err.html "You must specify an password."
    return e.preventDefault()
  l = Ladda.create(this)
  l.start()
  $.ajax
    url: "/api/auth/signin"
    type: "POST"
    data: $("#login-form").serialize()
    success: (data, textStatus, jqXHR) ->
      window.location.href = "/"
      return

    error: (jqXHR, textStatus, errorThrown) ->
      l.stop()
      if jqXHR.responseJSON and jqXHR.responseJSON.message
        $err.html jqXHR.responseJSON.message
      else
        $err.html "Sign In failed."
      return

  return
