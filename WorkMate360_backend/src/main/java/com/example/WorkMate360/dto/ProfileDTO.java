package com.example.WorkMate360.dto;

import com.example.WorkMate360.models.Profile;

import java.time.LocalDate;
import java.util.Base64;

public class ProfileDTO {
    private Integer index;
    private String name;
    private String email;
    private String phoneNumber;
    private String province;
    private String district;
    private String street;
    private String houseNumber;
    private String gender;
    private LocalDate dateOfBirth;
    private Integer ageNow;
    private String position;
    private String country;
    private String department;
    private Double salary;

    // Base64 encoded string for the profile picture
    private String profilePictureBase64;

    // Constructors
    public ProfileDTO() {}

    // Getters and setters for all fields
    public Integer getIndex() { return index; }
    public void setIndex(Integer index) { this.index = index; }
    // ... other getters and setters ...

    public String getProfilePictureBase64() { return profilePictureBase64; }
    public void setProfilePictureBase64(String profilePictureBase64) {
        this.profilePictureBase64 = profilePictureBase64;
    }

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
        Profile profile = new Profile();
        profile.setIndex(this.index);
        profile.setName(this.name);
        // ... set other fields ...

        if (this.profilePictureBase64 != null && !this.profilePictureBase64.isEmpty()) {
            profile.setProfilePicture(Base64.getDecoder().decode(this.profilePictureBase64));
        }

        return profile;
    }
}
