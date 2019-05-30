package com.mgx.bootweb;

import com.mgx.bootweb.controller.HelloController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BootWebApplicationTests {

    private MockMvc mvc;
    @Before
    public void setMvc() {
        this.mvc = MockMvcBuilders.standaloneSetup(new HelloController()).build();
    }

    @Test
    public void contextLoads()throws Exception {
//     mvc.perform(get("hello/indexR"))
//             .andExpect(status().isOk())
//                  .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
//              ;
        mvc.perform(post("/hello/index"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().string(equalTo("hello")));
    }

}
