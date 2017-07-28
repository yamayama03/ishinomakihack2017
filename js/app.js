var TopPage = (function () {
    function TopPage(app) {
        this.app = app;
    }
    TopPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#topTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return TopPage;
}());
var Application = (function () {
    function Application() {
    }
    Application.prototype.start = function () {
    };
    Application.prototype.showPage = function (page) {
        this.router.navigate(page, { trigger: true });
    };
    return Application;
}());
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./Application.ts"/>
function createRouter(app) {
    var showPage = function (p) {
        app.page = p;
        p.onCreate();
    };
    return Backbone.Router.extend({
        routes: {
            "": "top",
            "second(/:id)": "second"
        },
        top: function () {
            showPage(new TopPage(app));
        },
        second: function (id) {
            console.log('second ' + id);
        }
    });
}
$(function () {
    var app = new Application();
    app.start();
    var AppRouter = createRouter(app);
    app.router = new AppRouter();
    Backbone.history.start();
});
