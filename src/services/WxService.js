/**
 * Created by mapbar_front on 2017/9/27.
 */



export function startRecord() {
    wx.startRecord({
        cancel: function () {
            alert('用户拒绝授权录音');
        }
    });
}

export function startRecord() {
    wx.stopRecord({
        success: function (res) {
            voice.localId = res.localId;
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
}