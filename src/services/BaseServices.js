/**
 * Created by mapbar_front on 2017/9/6.
 */
import 'whatwg-fetch';
import 'es6-promise';


let request = () => {

};
function isObject(value) {
    return typeof value === 'object';
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function dealData(jsonData) {
    let str = '';
    if(isObject(jsonData)){
        str+='?';
        let strs = '';
        for(let i in jsonData){
            strs += `${i}=${jsonData[i]}&`
        }
        strs.length = strs.length - 1 ;
        str += strs;
        return str;
    }else{
        return str;
    }
}
function fetchData(url,data,type) {
    if(type == "POST"){

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: data && JSON.stringify(data) || null
        });
    }else{
        let requestUrl = data ? url : url +  dealData(data);
        return fetch(requestUrl,{

        }).then(res => {
            return res.json()
        });
    }

}
export let RequestService = {
    get: function (url,data,) {
        return fetchData(url,data)
    },
    post: function (url,data) {
        return fetchData(url,data,'POST')
    },
    request: fetchData
};

export function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    opt.dataType = opt.dataType || "json";
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }var params = [];
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if(opt.dataType != 'jsonp'){
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(xmlHttp.responseText);
            }
        }else{
            //alert(1);
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var oScript = document.createElement('script');
                document.body.appendChild(oScript);

                var callbackname = 'callback'
                oScript.src = opt.url + "?" +  postData+'&callback='+callbackname;

                window['callback'] = function(data) {
                    opt.success(data);
                    document.body.removeChild(oScript);
                };
            }


        }

    };
}


export default RequestService;
