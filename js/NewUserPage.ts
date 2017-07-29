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

                user.register().then((theUser:KiiUser)=> {
                    localStorage.setItem('token', theUser.getAccessToken());
                    var obj=KiiObject.objectWithURI("kiicloud://buckets/user/objects/"+theUser.getID());
                    obj.set("point",0);
                    return obj.saveAllFields();
                }).then((o:KiiObject)=>{
                    alert("成功")
                }).catch(
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