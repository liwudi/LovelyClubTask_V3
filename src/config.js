/**
 * Created by mapbar_front on 2017/9/6.
 */


//线上环境
const service = {
    main_url:`http://www.shsoapp.net/ttzyservice/`
};

//内网环境
const service_test = {
    main_url:`http://homework.shsoapp.com:80/ttzyservice/`
};


export default {
    server: service_test
}

const url = 'http://homework.shsoapp.com:80/ttzyservice/start';