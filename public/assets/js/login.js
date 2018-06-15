var loginForm = $("#loginForm");
var username = $("#username");
var password = $("#password");

$(loginForm).on("submit", function handleLoginSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
        return;
    }

    var admin = {
        username: username.val().trim(),
        password: password.val().trim()
    };

    console.log(admin);

    $.post("/login", admin, function(session) {
        document.cookie = "SessionId=" + session.session;
        window.location.href = "/";
    });

});