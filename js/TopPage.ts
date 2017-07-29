class TopPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#topTemplate',
            data : {
                loggedIn : (KiiUser.getCurrentUser() != null),
                list : [],
            },
            showLogin : () => {
                this.app.showPage("login");
            },
            newArticle : () => {
                if (KiiUser.getCurrentUser() == null) {
                    this.app.showPage("login");
                } else {
                    this.app.showPage("post");
                }
            },
            showTrouble : () => {
                this.app.showPage("trouble");
            },
            logout : () => {
                KiiUser.logOut();
                localStorage.setItem('token', '');
                this.ractive.set('loggedIn', false);
            },
            showArticle : (o:KiiObject) =>{
                this.app.showPage("article/"+o.getID())
            },
            showList : (o:KiiObject) =>{
                this.app.showPage("list")
            }
        });
        var bucket = Kii.bucketWithName("anger")
        var allQuery:KiiQuery = KiiQuery.queryWithClause(null);
        allQuery.setLimit(5)
        allQuery.sortByDesc("point")
        bucket.executeQuery(allQuery).then((v:any[])=>{
            this.ractive.set("list",v[1])
        })
        var bucket = Kii.bucketWithName("anger")
        var allQuery:KiiQuery = KiiQuery.queryWithClause(null);
        allQuery.setLimit(3)
        allQuery.sortByDesc("_created")
        bucket.executeQuery(allQuery).then((v:any[])=>{
            this.ractive.set("list2",v[1])
        })
    }
}