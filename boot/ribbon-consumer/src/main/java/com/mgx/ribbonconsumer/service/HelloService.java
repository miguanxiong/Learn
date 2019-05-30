package com.mgx.ribbonconsumer.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * @author miguanxiong
 * @description 服务
 * @date 2019/5/27
 */
@Service
public class HelloService {
    @Autowired
    RestTemplate restTemplate;

    @HystrixCommand(fallbackMethod = "helloCallBack")
    public String helloService(){
        return restTemplate.getForEntity("http://HELLO/hello/index",String.class).getBody();
    }
    public String helloCallBack(){
        return "error";
    }
}
