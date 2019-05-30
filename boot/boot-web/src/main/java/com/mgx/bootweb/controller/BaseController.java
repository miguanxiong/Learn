package com.mgx.bootweb.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author miguanxiong
 * @description controller基类
 * @date 2019/4/28
 */
public class BaseController {
      Logger logger;
  public  BaseController() {
        logger=LoggerFactory.getLogger(this.getClass().getName());
    }

}
