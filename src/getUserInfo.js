/**
 * Created by mapbar_front on 2017/9/29.
 */
import { getUserInfo } from './services/AppServices';

getUserInfo("oNye5t8DFmkU_mSGrgj3nRvwC9KM").then(res => {
    alert(res);
    localStorage.setItem("userInfo",res);
});

setInterval(()=>{
    localStorage.clear();
},1000*60*60);