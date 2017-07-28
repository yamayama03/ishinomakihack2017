/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
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
            "second(/:id)" : "second",
        },
        top : () => {
            showPage(new TopPage(app));
        },
        second : (id : string) => {
            console.log('second ' + id);
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