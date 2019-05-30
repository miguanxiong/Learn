package com.mgx.bootweb.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.Map;

/**
 * @author miguanxiong
 * @description hello
 * @date 2019/4/28
 * RestController value为""
 */
@RestController
@RequestMapping(value = "hello",produces="application/json;charset=UTF-8")
public class HelloController extends BaseController {

    @Autowired
    private DiscoveryClient client;

@RequestMapping("index")
    public String index(){
        logger.info("index");
//    ServiceInstance instance=client.getInstances("hello").get(0);

        return "hello";
    }
@RequestMapping("index1")
    public String indexR(@RequestBody Map param){
        logger.info("indexR");
        return "hello";
    }

}
