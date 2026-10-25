// Which platform the iPhone/Android tabs show first, before the first paint.
// Order: ?platform=, then the reader's last choice, then the user agent.
// An app link (?platform plus source=app) also hides the switch, as on getintake.de/hilfe.
export const PLATFORM_SCRIPT = `(function(){try{
var q=new URLSearchParams(location.search),p=q.get('platform');
var k='starlight-synced-tabs__platform',label={ios:'iPhone',android:'Android'};
if(p!=='ios'&&p!=='android'){p=null}
if(p){localStorage.setItem(k,label[p])}
else if(!localStorage.getItem(k)){localStorage.setItem(k,/android/i.test(navigator.userAgent)?'Android':'iPhone')}
if(p&&q.get('source')==='app'){document.documentElement.dataset.platformSwitch='hidden'}
}catch(e){}})()`;
