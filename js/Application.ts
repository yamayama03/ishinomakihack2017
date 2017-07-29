/// <reference path="./kii.d.ts"/>
/// <reference path="./es6-promise.d.ts"/>
var APP_ID = 'orueuntaxbsi';
var APP_KEY = 'c681148710d045fe9ad1bc94f4a209b0';

class Application {
    router : any;
    page : Page;
    start() : Promise<Boolean>{
        Kii.initializeWithSite(APP_ID, APP_KEY, KiiSite.JP);
        var token = localStorage.getItem('token');
        if (token != null && token.length > 0) {
            // restore
            return KiiUser.authenticateWithToken(token).then((u : KiiUser) => {
                return Promise.resolve(true);
            });
        } else {
            return Promise.resolve(true);
        }
    }

    showPage(page : string) {
        this.router.navigate(page, {trigger:true});
    }
}