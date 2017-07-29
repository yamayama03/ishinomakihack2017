class TroublePage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#TroubleTemplate',
            data : {
            	list:[{key : 1,value : ""},{key : 2,value : ""}]
            },
            showNext : () => {
                this.app.showPage('second/1234');
            },
            send : () => {
            	this.ractive.push("list",
            		{key : 1, value : this.ractive.get("text")})
            	this.ractive.set("text","")
            	setTimeout(() => {
            		this.ractive.push("list",
            			{key : 2, value : this.getAnsewer()})
            	},2000)
            },
        });
    }
    
    private getAnsewer(){
    	var reserveList = ["そんなやつはうんちだ、うんち以下だ。"
    	,"そんなやつはうんちだ、うんち以下だ。"
    	,"ふむふむ、ムフムフ♪"
    	,"そっか、大変だったね、ところでうんち派？うんこ派？"
    	,"うんぴ・うんにょ・うんこ・うんご？"
    	,"恥骨ってかわいそうだね、ぜんぜん恥ずかしい骨じゃないのに。恥骨の大変さ考えたことある？"
    	,"そうか、頭痛くなるまで悩んだんだね。痛くなったらすぐ屁です"
    	,"そんな上司も漏らしたことあるんだよ、人間だもの"
    	,"ふんふふ━━（　´_ゝ｀）━━ん"
    	];
    	var ansewer = reserveList[Math.floor( Math.random() * reserveList.length + 1 )];
    	return ansewer;
    }
}