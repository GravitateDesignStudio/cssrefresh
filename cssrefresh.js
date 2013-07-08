/*	
 *	CSSrefresh v1.0.1
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
 
 /* This has been modified from the original script by GG 
  * This Original was causing the css to be removed then reloaded which caused the page to jitter as the css was reloaded.
  * This modification fixes that.
  */

(function(){
	
	var cssFiles=['master.css']; /* remove or leave as an empty array to search all local css files */

var phpjs={array_filter:function(arr,func)
{var retObj={};for(var k in arr)
{if(func(arr[k]))
{retObj[k]=arr[k];}}
return retObj;},filemtime:function(file)
{var headers=this.get_headers(file,1);return(headers&&headers['Last-Modified']&&Date.parse(headers['Last-Modified'])/1000)||false;},get_headers:function(url,format)
{var req=window.ActiveXObject?new ActiveXObject('Microsoft.XMLHTTP'):new XMLHttpRequest();if(!req)
{throw new Error('XMLHttpRequest not supported.');}
var tmp,headers,pair,i,j=0;try
{req.open('HEAD',url,false);req.send(null);if(req.readyState<3)
{return false;}
tmp=req.getAllResponseHeaders();tmp=tmp.split('\n');tmp=this.array_filter(tmp,function(value)
{return value.toString().substring(1)!=='';});headers=format?{}:[];for(i in tmp)
{if(format)
{pair=tmp[i].toString().split(':');headers[pair.splice(0,1)]=pair.join(':').substring(1);}
else
{headers[j++]=tmp[i];}}
return headers;}
catch(err)
{return false;}}};var cssRefresh=function(){this.reloadFile=function(links)
{var haveMatch;var link;for(var a=0,l=links.length;a<l;a++)
{link=links[a];haveMatch=false;if(typeof cssFiles==='undefined')
{haveMatch=true;}
else if(!cssFiles.length)
{haveMatch=true;}
else if(cssFiles.length&&this.inArray(this.basename(link.href),cssFiles))
{haveMatch=true;}
if(link.href.indexOf(window.location.href)>-1&&haveMatch)
{var newTime=phpjs.filemtime(this.getRandom(link.href));if(link.last&&newTime)
{if(link.last!=newTime)
{this.swapFile(link.href);}}
link.last=newTime;}}
setTimeout(function()
{this.reloadFile(links);},1000);};this.swapFile=function(file)
{var fileref;var newFile=this.getRandom(file);fileref=document.createElement("link");fileref.setAttribute("rel","stylesheet");fileref.setAttribute("type","text/css");fileref.setAttribute("href",newFile);if(typeof fileref!="undefined")
{document.getElementsByTagName("head")[0].appendChild(fileref);}
setTimeout(function(){this.removeFiles(newFile,file);},600);}
this.removeFiles=function(newFile,file)
{var files=document.getElementsByTagName('link');for(var i=0;i<files.length;i++)
{var elem=files[i];if(elem.rel=='stylesheet'&&elem.href!=newFile&&this.getHref(elem)==file)
{document.getElementsByTagName("head")[0].removeChild(elem);}}}
this.getHref=function(f)
{return f.getAttribute('href').split('?')[0];};this.getRandom=function(f)
{return f+'?x='+Math.random();};this.inArray=function(needle,haystack)
{for(var i in haystack){if(haystack[i]==needle)return true;}
return false;}
this.basename=function(str)
{var base=new String(str).substring(str.lastIndexOf('/')+1);return base;}
var files=document.getElementsByTagName('link'),links=[];for(var a=0,l=files.length;a<l;a++)
{var elem=files[a],rel=elem.rel;if(typeof rel!='string'||rel.length==0||rel=='stylesheet')
{links.push({'elem':elem,'href':this.getHref(elem),'last':false});}}
this.reloadFile(links);};cssRefresh();})();