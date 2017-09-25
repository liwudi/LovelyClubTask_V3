/**
 * Created by mapbar_front on 2017/9/7.
 */
export function deleteItemByIndex(arr,index) {

    if(arr.length >= index){
        arr.splice(index,1);
        console.log(arr);
        return arr;
    }else{
        return
    }
}