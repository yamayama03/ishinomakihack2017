/// <reference path="./kii.d.ts"/>
class ArticlePage implements Page {
    app : Application;
    ractive : Ractive;
    private id : string
    constructor(app : Application,id:string) {
        this.app = app;
        this.id = id;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#ArticleTemplate',
            showNext : () => {
                this.app.showPage('second/1234');
            },
        });
        var obj = KiiObject.objectWithURI("KiiCloud://buckets/anger/objects/"+this.id)
        obj.refresh().then((o:KiiObject)=>{
            var title = o.get("title")
            var text = o.get("text")
            var point = o.get("point")
            this.ractive.set({title:title,text:text,point:point})
        })
    }
}