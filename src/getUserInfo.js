/**
 * Created by mapbar_front on 2017/9/29.
 */
import { getUserInfo } from './services/AppServices';

getuserInfo();

export default function getuserInfo() {
    let userInfo = localStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    if(userInfo){
        return Promise.resolve(userInfo);
    }else {
        return getUserInfo(openId).then(res => {
            localStorage.setItem("userInfo",res);
        });
    }
}

