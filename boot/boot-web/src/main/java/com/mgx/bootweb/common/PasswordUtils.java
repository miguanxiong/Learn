package com.mgx.bootweb.common;

/**
 * @author miguanxiong
 * @description 密码校验
 * @date 2019/5/23
 */
public class PasswordUtils {

    @UseCase(id="2",desc = "password must contain at least one numeric")
    public boolean validatePassword(String password) {
        return (password.matches("\\w*\\d\\w*"));
    }
}
