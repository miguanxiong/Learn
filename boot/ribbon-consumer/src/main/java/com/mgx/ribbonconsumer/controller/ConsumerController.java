package com.mgx.ribbonconsumer.controller;

import com.mgx.ribbonconsumer.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * @author miguanxiong
 * @description ribbon负载调用服务
 * @date 2019/5/10
 */
@RestController
public class ConsumerController {
/*    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("ribbon-consumer")
    public  String helloConsumer(){
return restTemplate.getForEntity("http://HELLO/hello/index",String.class).getBody();
    }*/

@Autowired
    HelloService helloService;
    @RequestMapping("ribbon-consumer")
    public  String helloConsumer(){
        return helloService.helloService();
    }
}
