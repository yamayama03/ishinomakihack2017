/// <reference path="./kii.d.ts"/>
class ArticlePage implements Page {
    app : Application;
    ractive : Ractive;
    private id : string
    private obj : KiiObject;

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
            addPoint : () => {
                this.addPoint();
            },
        });
        var obj = KiiObject.objectWithURI("KiiCloud://buckets/anger/objects/"+this.id)
        obj.refresh().then((o:KiiObject)=>{
            this.obj = o;

            var title = o.get("title")
            var text = o.get("text")
            var point = o.get("point")
            this.ractive.set({title:title,text:text,point:point})
        })
    }

    private addPoint() {
        this.obj.set("point", this.obj.get<number>("point") + 1);
        this.obj.saveAllFields(null, false).then((o : KiiObject) => {
            this.ractive.set('point', o.get("point"));
        }).catch((e : any) => {
            console.log(e);
        });
    }
}