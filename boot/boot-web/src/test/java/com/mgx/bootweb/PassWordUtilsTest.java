package com.mgx.bootweb;

import com.mgx.bootweb.common.PasswordUtils;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;

/**
 * @author miguanxiong
 * @description 测试注解
 * @date 2019/5/23
 */
public class PassWordUtilsTest {
    @Test
    public void test(){
        Assert.assertEquals("解析错误",true, new PasswordUtils().validatePassword("qwe"));;
    }
}
