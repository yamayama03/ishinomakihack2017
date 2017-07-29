/// <reference path="./kii.d.ts"/>
class PostPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#PostTemplate',
            showNext : () => {
                var title = this.ractive.get("title");
                var text = this.ractive.get("text")

                var obj=Kii.bucketWithName("anger").createObject()

                obj.set("title",title)
                obj.set("text",text)
                obj.set("point",0)
                obj.save().then((o:KiiObject)=>{
                    alert("投稿しました")
                    window.history.back()
                })
            },
        });
    }
}