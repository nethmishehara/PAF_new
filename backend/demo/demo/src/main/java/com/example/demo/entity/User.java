package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;

//import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Document
@Getter
@Setter
public class User {
    private String id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String profilePictureUrl;
}
