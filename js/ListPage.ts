class ListPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#ListTemplate',
            showNext : () => {
                this.app.showPage('second/1234');
            },
             showArticle : (o:KiiObject) =>{
                this.app.showPage("article/"+o.getID())
            },
        });
     var bucket = Kii.bucketWithName("anger")
        var allQuery:KiiQuery = KiiQuery.queryWithClause(null);
        allQuery.sortByDesc("point")
        bucket.executeQuery(allQuery).then((v:any[])=>{
            this.ractive.set("list",v[1])
        })
    }
}