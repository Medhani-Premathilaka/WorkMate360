package com.example.WorkMate360.dto;

import com.example.WorkMate360.models.Profile;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Base64;

public class ProfileDTO {
    // Getters and setters for all fields
    @Setter
    @Getter
    private Integer index;
    @Getter
    private String name;
    @Getter
    private String email;
    @Getter
    private String phoneNumber;
    @Getter
    private String province;
    @Getter
    private String district;
    @Getter
    private String street;
    @Getter
    private String houseNumber;
    @Getter
    private String gender;
    @Getter
    private LocalDate dateOfBirth;
    @Getter
    private Integer ageNow;
    @Getter
    private String position;
    @Getter
    private String country;
    @Getter
    private String department;
    @Getter
    private Double salary;

    // Base64 encoded string for the profile picture
    @Setter
    @Getter
    private String profilePictureBase64;

    // Constructors
    public ProfileDTO() {}

    // ... other getters and setters ...

    // Conversion methods
    public static ProfileDTO fromEntity(Profile profile) {
        ProfileDTO dto = new ProfileDTO();
        dto.setIndex(profile.getIndex());
        dto.setName(profile.getName());
        // ... set other fields ...

        if (profile.getProfilePicture() != null) {
            dto.setProfilePictureBase64(Base64.getEncoder().encodeToString(profile.getProfilePicture()));
        }

        return dto;
    }

    private void setName(String name) {
    }

    public Profile toEntity() {
        return null;
    }


}
