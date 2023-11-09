package com.example.rentz.data.domain;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "user")
@Getter
public class User {

    @Id
    private String id;

    @Field("name")
    @NotBlank
    private String name;

    @Field("email")
    private String email;

    @Field("personal_information")
    private String personalInformation;

    @Field("profile_picture_id")
    private Long profilePictureId;

    // Getters and setters omitted for brevity
}
