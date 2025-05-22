package com.example.WorkMate360.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;

@Data
@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profile_seq")
    @SequenceGenerator(name = "profile_seq", sequenceName = "profile_seq", allocationSize = 1)
    private Integer Index;
    private String Name;
    private String Email;
    private String PhoneNumber;
    private String Province;
    private String District;
    private String Street;
    private String HouseNumber;
    private String Gender;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    private Integer AgeNow;
    private String Position;
    private String Country;
    private String Department;
    private Double Salary;

   // private String ProfilePicture;

    @Lob
    @Column(name = "profile_picture", columnDefinition = "BYTEA")

    private byte[] profilePicture;

    // Helper method to handle Base64 strings
    @Transient
    public String getProfilePictureBase64() {
        return this.profilePicture != null ?
                Base64.getEncoder().encodeToString(this.profilePicture) :
                null;
    }

    @Transient
    public void setProfilePictureFromBase64(String base64Image) {
        if (base64Image == null || base64Image.isEmpty()) {
            this.profilePicture = null;
            return;
        }
        // Remove data URL prefix if present
        String imageData = base64Image.contains(",") ?
                base64Image.split(",")[1] :
                base64Image;
        this.profilePicture = Base64.getDecoder().decode(imageData);
    }
}
