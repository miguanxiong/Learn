### 1. 高可用服务启动
```cmd
 java -jar  boot-web/target/boot-web-0.0.1-SNAPSHOT.jar --spring.profiles.active=debug1;
  java -jar boot-web/target/boot-web-0.0.1-SNAPSHOT.jar --spring.profiles.active=debug
  
   java -jar euraka/target/euraka-0.0.1-SNAPSHOT.jar --spring.profiles.active=peer1
   java -jar euraka/target/euraka-0.0.1-SNAPSHOT.jar --spring.profiles.active=peer2
 
 ```
