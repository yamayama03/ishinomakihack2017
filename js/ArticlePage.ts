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
            sendComment : () => {
                var comment = this.ractive.get("comment");
                if (comment.trim().length == 0) {
                    return false;
                }
                this.playSendVoice();

                var obj = Kii.bucketWithName("comment").createObject()
                obj.set("parent",this.id)
                
                obj.set("comment",comment)
                obj.save().then((o:KiiObject)=>{
                    window.history.back()
                })
            },
            addPoint : () => {
                this.playPointVoice();
                this.addPoint();
            },
            back : () => {
                window.history.back();
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

        obj = KiiObject.objectWithURI("KiiCloud://buckets/comment/objects/")
        var bucket = Kii.bucketWithName("comment")
        var allQuery:KiiQuery = KiiQuery.queryWithClause(KiiClause.equals("parent",this.id));
        allQuery.sortByDesc("_created")
        bucket.executeQuery(allQuery).then((v:any[])=>{
            this.ractive.set("list",v[1])
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

    private playSendVoice() {
        var num = Math.floor(Math.random() * 3);
        var audio = new Audio();
        audio.src = "./voice/post" + num + ".mp3";
        audio.play();
    }

    private playPointVoice() {
        var num = Math.floor(Math.random() * 4);
        var audio = new Audio();
        audio.src = "./voice/point" + num + ".mp3";
        audio.play();        
    }
}