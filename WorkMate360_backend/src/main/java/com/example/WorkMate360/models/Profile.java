package com.example.WorkMate360.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Index;
    private String Name;
    private String Email;
    private String PhoneNumber;
    private String Province;
    private String District;
    private String Street;
    private String HouseNumber;
    private String Gender;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    private Integer AgeNow;

   // private String ProfilePicture;

}
