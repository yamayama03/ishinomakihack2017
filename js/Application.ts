/// <reference path="./kii.d.ts"/>
var APP_ID = 'orueuntaxbsi';
var APP_KEY = 'c681148710d045fe9ad1bc94f4a209b0';

class Application {
    router : any;
    page : Page;
    start() {
        Kii.initializeWithSite(APP_ID, APP_KEY, KiiSite.JP);
    }

    showPage(page : string) {
        this.router.navigate(page, {trigger:true});
    }
}