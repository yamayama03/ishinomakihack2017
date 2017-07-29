var TopPage = (function () {
    function TopPage(app) {
        this.app = app;
    }
    TopPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#topTemplate',
            data: {
                loggedIn: (KiiUser.getCurrentUser() != null)
            },
            showSignup: function () {
                _this.app.showPage("newuser");
            },
            newArticle: function () {
                if (KiiUser.getCurrentUser() == null) {
                    _this.app.showPage("login");
                }
                else {
                    _this.app.showPage("article");
                }
            },
            showTrouble: function () {
                _this.app.showPage("trouble");
            },
            logout: function () {
                KiiUser.logOut();
                localStorage.setItem('token', '');
                _this.ractive.set('loggedIn', false);
            }
        });
    };
    return TopPage;
}());
/// <reference path="./kii.d.ts"/>
/// <reference path="./es6-promise.d.ts"/>
var APP_ID = 'orueuntaxbsi';
var APP_KEY = 'c681148710d045fe9ad1bc94f4a209b0';
var Application = (function () {
    function Application() {
    }
    Application.prototype.start = function () {
        Kii.initializeWithSite(APP_ID, APP_KEY, KiiSite.JP);
        var token = localStorage.getItem('token');
        if (token != null && token.length > 0) {
            // restore
            return KiiUser.authenticateWithToken(token).then(function (u) {
                return Promise.resolve(true);
            });
        }
        else {
            return Promise.resolve(true);
        }
    };
    Application.prototype.showPage = function (page) {
        this.router.navigate(page, { trigger: true });
    };
    return Application;
}());
/// <reference path="./kii.d.ts"/>
/// <reference path="./Application.ts"/>
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
                var email = _this.ractive.get("email");
                var password = _this.ractive.get("password");
                KiiUser.authenticate(email, password).then(function (theUser) {
                    localStorage.setItem('token', theUser.getAccessToken());
                    alert("ログインしました");
                    _this.app.showPage("newuser");
                })["catch"](function (error) {
                    var theUser = error.target;
                    var errorString = error.message;
                    alert("ログイン失敗");
                });
            }
        });
    };
    return LoginPage;
}());
/// <reference path="./kii.d.ts"/>
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
                var email = _this.ractive.get("email");
                var password = _this.ractive.get("password");
                var user = KiiUser.userWithEmailAddress(email, password);
                user.register().then(function (theUser) {
                    localStorage.setItem('token', theUser.getAccessToken());
                    var obj = KiiObject.objectWithURI("kiicloud://buckets/user/objects/" + theUser.getID());
                    obj.set("point", 0);
                    return obj.saveAllFields();
                }).then(function (o) {
                    alert("成功");
                })["catch"](function (error) {
                    var theUser = error.target;
                    var errorString = error.message;
                    alert("登録できません");
                });
            }
        });
    };
    return NewUserPage;
}());
var ListPage = (function () {
    function ListPage(app) {
        this.app = app;
    }
    ListPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#ListTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return ListPage;
}());
var ArticlePage = (function () {
    function ArticlePage(app) {
        this.app = app;
    }
    ArticlePage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#ArticleTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return ArticlePage;
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
            data: {
                list: []
            },
            showNext: function () {
                _this.app.showPage('second/1234');
            },
            send: function () {
                _this.ractive.push("list", _this.ractive.get("text"));
                setTimeout(function () {
                    _this.ractive.push("list", _this.getAnsewer());
                }, 2000);
                setTimeout(function () {
                    _this.ractive.push("list", _this.getAnsewer());
                }, 1000);
            }
        });
    };
    TroublePage.prototype.getAnsewer = function () {
        var reserveList = ["そんなやつはうんちだ、うんち以下だ。",
            "そんなやつはうんちだ、うんち以下だ。",
            "ふむふむ、ムフムフ♪",
            "そっか、大変だったね、ところでうんち派？うんこ派？",
            "うんぴ・うんにょ・うんこ・うんご？",
            "恥骨ってかわいそうだね、ぜんぜん恥ずかしい骨じゃないのに。恥骨の大変さ考えたことある？",
            "そうか、頭痛くなるまで悩んだんだね。痛くなったらすぐ屁です",
            "そんな上司も漏らしたことあるんだよ、人間だもの",
            "ふんふふ━━（　´_ゝ｀）━━ん"
        ];
        var ansewer = reserveList[Math.floor(Math.random() * reserveList.length + 1)];
        return ansewer;
    };
    return TroublePage;
}());
var PostPage = (function () {
    function PostPage(app) {
        this.app = app;
    }
    PostPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#PostTemplate',
            showNext: function () {
                _this.app.showPage('second/1234');
            }
        });
    };
    return PostPage;
}());
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./LoginPage.ts"/>
/// <reference path="./NewUserPage.ts"/>
/// <reference path="./ListPage.ts"/>
/// <reference path="./ArticlePage.ts"/>
/// <reference path="./TroublePage.ts"/>
/// <reference path="./PostPage.ts"/>
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
            "post": "post",
            "list": "list",
            "article": "article",
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
        list: function () {
            showPage(new ListPage(app));
        },
        article: function () {
            showPage(new ArticlePage(app));
        },
        trouble: function () {
            showPage(new TroublePage(app));
        },
        post: function () {
            showPage(new PostPage(app));
        }
    });
}
$(function () {
    var app = new Application();
    app.start().then(function (b) {
        var AppRouter = createRouter(app);
        app.router = new AppRouter();
        Backbone.history.start();
    });
});
