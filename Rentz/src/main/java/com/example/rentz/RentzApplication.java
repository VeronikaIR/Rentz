package com.example.rentz;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
//@ComponentScan("com.example.rentz.mapper")
//@SpringBootApplication(exclude = {HibernateJpaAutoConfiguration.class})
public class RentzApplication {

    public static void main(String[] args) throws IOException {

//		FileInputStream serviceAccount = new FileInputStream("src/main/resources/rentz-63d22-cae0d3f240b7.json");
//		GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
//
//        FirebaseOptions options = new FirebaseOptions.Builder()
//                .setCredentials(credentials)
//                .build();
//        FirebaseApp.initializeApp(options);


//        try (FileInputStream serviceAccount = new FileInputStream("src/main/resources/rentz-63d22-cae0d3f240b7.json")) {
//            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(credentials)
//                    .build();
//
//            FirebaseApp.initializeApp(options, "rentz-63d22");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        SpringApplication.run(RentzApplication.class, args);
    }


}
