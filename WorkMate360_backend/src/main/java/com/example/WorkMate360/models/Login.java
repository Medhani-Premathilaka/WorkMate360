package com.example.WorkMate360.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "login")
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String username;
    private String password;

}
