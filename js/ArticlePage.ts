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
            sendComment : () => {
                var comment = this.ractive.get("comment")

                var obj = Kii.bucketWithName("comment").createObject()
                obj.set("parent",this.id)
                
                obj.set("comment",comment)
                obj.save().then((o:KiiObject)=>{
                    alert("投稿しました")
                    window.history.back()
                })
            },
        });
        var obj = KiiObject.objectWithURI("KiiCloud://buckets/anger/objects/"+this.id)
        obj.refresh().then((o:KiiObject)=>{
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
}