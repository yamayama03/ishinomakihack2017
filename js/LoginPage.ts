/// <reference path="./kii.d.ts"/>
/// <reference path="./Application.ts"/>
class LoginPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#LoginTemplate',
            showNext : () => {
                var email = this.ractive.get("email");
                var password = this.ractive.get("password")

                KiiUser.authenticate(email, password).then(
                (theUser : KiiUser) => {
                    alert("ログインしました")
                    this.app.showPage("/")
                }
                ).catch(
                    function(error) {
                        var theUser = error.target;
                        var errorString = error.message;
                        alert("ログイン失敗")
                    }
                );
            },
        });
    }
}