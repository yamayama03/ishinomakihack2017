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
var LoginPage = (function () {
    function LoginPage(app) {
        this.app = app;
    }
    LoginPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#LoginTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return LoginPage;
}());
var NewUserPage = (function () {
    function NewUserPage(app) {
        this.app = app;
    }
    NewUserPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#NewUserTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return NewUserPage;
}());
var TimeLinePage = (function () {
    function TimeLinePage(app) {
        this.app = app;
    }
    TimeLinePage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#TimeLineTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return TimeLinePage;
}());
var NewsPage = (function () {
    function NewsPage(app) {
        this.app = app;
    }
    NewsPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#NewsTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return NewsPage;
}());
var TroublePage = (function () {
    function TroublePage(app) {
        this.app = app;
    }
    TroublePage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#TroubleTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return TroublePage;
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
/// <reference path="./LoginPage.ts"/>
/// <reference path="./NewUserPage.ts"/>
/// <reference path="./TimeLinePage.ts"/>
/// <reference path="./NewsPage.ts"/>
/// <reference path="./TroublePage.ts"/>
/// <reference path="./Application.ts"/>
function createRouter(app) {
    var showPage = function (p) {
        app.page = p;
        p.onCreate();
    };
    return Backbone.Router.extend({
        routes: {
            "": "top",
            "login": "login",
            "newuser": "newuser",
            "timeline": "timeline",
            "news": "news",
            "trouble": "trouble"
        },
        top: function () {
            showPage(new TopPage(app));
        },
        login: function () {
            showPage(new LoginPage(app));
        },
        newuser: function () {
            showPage(new NewUserPage(app));
        },
        timeline: function () {
            showPage(new TimeLinePage(app));
        },
        news: function () {
            showPage(new NewsPage(app));
        },
        trouble: function () {
            showPage(new TroublePage(app));
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
