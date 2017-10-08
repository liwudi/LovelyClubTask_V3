/**
 * Created by mapbar_front on 2017/9/29.
 */
import { getUserInfo } from './services/AppServices';

getUserInfo(openId).then(res => {
    //alert(res);
    localStorage.setItem("userInfo",res);
});

export default function getuserInfo() {
    getUserInfo(openId).then(res => {
        //alert(res);
        localStorage.setItem("userInfo",res);
    });
}