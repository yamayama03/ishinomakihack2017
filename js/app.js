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
                loggedIn: (KiiUser.getCurrentUser() != null),
                list: []
            },
            showLogin: function () {
                _this.app.showPage("login");
            },
            newArticle: function () {
                if (KiiUser.getCurrentUser() == null) {
                    _this.app.showPage("login");
                }
                else {
                    _this.app.showPage("post");
                }
            },
            showTrouble: function () {
                _this.app.showPage("trouble");
            },
            logout: function () {
                KiiUser.logOut();
                localStorage.setItem('token', '');
                _this.ractive.set('loggedIn', false);
            },
            showArticle: function (o) {
                _this.app.showPage("article/" + o.getID());
            }
        });
        var bucket = Kii.bucketWithName("anger");
        var allQuery = KiiQuery.queryWithClause(null);
        allQuery.setLimit(5);
        allQuery.sortByDesc("point");
        bucket.executeQuery(allQuery).then(function (v) {
            _this.ractive.set("list", v[1]);
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
            showSignUp: function () {
                _this.app.showPage("newuser");
            },
            showNext: function () {
                var email = _this.ractive.get("email");
                var password = _this.ractive.get("password");
                KiiUser.authenticate(email, password).then(function (theUser) {
                    localStorage.setItem('token', theUser.getAccessToken());
                    _this.playAudio();
                    _this.app.showPage("/");
                })["catch"](function (error) {
                    var theUser = error.target;
                    var errorString = error.message;
                    alert("ログイン失敗");
                });
            },
            back: function () {
                window.history.back();
            }
        });
    };
    LoginPage.prototype.playAudio = function () {
        var num = Math.floor(Math.random() * 2);
        var audio = new Audio();
        audio.src = "./voice/login" + num + ".mp3";
        audio.play();
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
                    _this.app.showPage("/");
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
/// <reference path="./kii.d.ts"/>
var ArticlePage = (function () {
    function ArticlePage(app, id) {
        this.app = app;
        this.id = id;
    }
    ArticlePage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#ArticleTemplate',
            sendComment: function () {
                var comment = _this.ractive.get("comment");
                var obj = Kii.bucketWithName("comment").createObject();
                obj.set("parent", _this.id);
                obj.set("comment", comment);
                obj.save().then(function (o) {
                    _this.playSendVoice();
                    window.history.back();
                });
            },
            addPoint: function () {
                _this.playPointVoice();
                _this.addPoint();
            }
        });
        var obj = KiiObject.objectWithURI("KiiCloud://buckets/anger/objects/" + this.id);
        obj.refresh().then(function (o) {
            _this.obj = o;
            var title = o.get("title");
            var text = o.get("text");
            var point = o.get("point");
            _this.ractive.set({ title: title, text: text, point: point });
        });
        obj = KiiObject.objectWithURI("KiiCloud://buckets/comment/objects/");
        var bucket = Kii.bucketWithName("comment");
        var allQuery = KiiQuery.queryWithClause(KiiClause.equals("parent", this.id));
        allQuery.sortByDesc("_created");
        bucket.executeQuery(allQuery).then(function (v) {
            _this.ractive.set("list", v[1]);
        });
    };
    ArticlePage.prototype.addPoint = function () {
        var _this = this;
        this.obj.set("point", this.obj.get("point") + 1);
        this.obj.saveAllFields(null, false).then(function (o) {
            _this.ractive.set('point', o.get("point"));
        })["catch"](function (e) {
            console.log(e);
        });
    };
    ArticlePage.prototype.playSendVoice = function () {
    };
    ArticlePage.prototype.playPointVoice = function () {
        var num = Math.floor(Math.random() * 4);
        var audio = new Audio();
        audio.src = "./voice/point" + num + ".mp3";
        audio.play();
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
                list: [{ key: 1, value: "" }, { key: 2, value: "" }]
            },
            showNext: function () {
                _this.app.showPage('second/1234');
            },
            send: function () {
                _this.ractive.push("list", { key: 1, value: _this.ractive.get("text") });
                _this.ractive.set("text", "");
                setTimeout(function () {
                    _this.ractive.push("list", { key: 2, value: _this.getAnsewer() });
                }, 2000);
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
/// <reference path="./kii.d.ts"/>
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
                var title = _this.ractive.get("title");
                var text = _this.ractive.get("text");
                var obj = Kii.bucketWithName("anger").createObject();
                obj.set("title", title);
                obj.set("text", text);
                obj.set("point", 0);
                obj.save().then(function (o) {
                    alert("投稿しました");
                    window.history.back();
                });
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
            "article(/:id)": "article",
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
        article: function (id) {
            showPage(new ArticlePage(app, id));
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
