class Application {
    router : any;
    page : Page;
    start() {
    }

    showPage(page : string) {
        this.router.navigate(page, {trigger:true});
    }
}