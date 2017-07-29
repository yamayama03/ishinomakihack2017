/// <reference path="./kii.d.ts"/>
class NewUserPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#NewUserTemplate',
            showNext : () => {
                var email = this.ractive.get("email");
                var password = this.ractive.get("password");
                

                var user = KiiUser.userWithEmailAddress(email, password);

                user.register().then(
                function(theUser) {
                    alert("成功")
                }
                ).catch(
                    function(error) {
                    var theUser = error.target;
                    var errorString = error.message;
                    alert("登録できません")
                    }
                );        
            },
        });
    }
}