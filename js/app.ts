/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./LoginPage.ts"/>
/// <reference path="./NewUserPage.ts"/>
/// <reference path="./ListPage.ts"/>
/// <reference path="./ArticlePage.ts"/>
/// <reference path="./TroublePage.ts"/>
/// <reference path="./Application.ts"/>
declare var $;
declare var _;
declare var Backbone;

function createRouter(app : Application) : any {
    var showPage = (p : Page) => {
        app.page = p;
        p.onCreate();
    };

    return Backbone.Router.extend({
        routes : {
            "" : "top",
            "login" : "login",
            "newuser" : "newuser",
            "list" : "list",
            "article" : "article",
            "trouble" : "trouble"
        },
        
        top : () => {
            showPage(new TopPage(app));
        },
        login : () => {
            showPage(new LoginPage(app));
        },
        newuser : () => {
            showPage(new NewUserPage(app));
        },
        list : () => {
            showPage(new ListPage(app));
        },
        article : () => {
            showPage(new ArticlePage(app));
        },
        trouble : () => {
            showPage(new TroublePage(app));
        },
    });
}

$(() => {
    var app = new Application();
    app.start();
    var AppRouter = createRouter(app);
    app.router = new AppRouter();
    Backbone.history.start();
});