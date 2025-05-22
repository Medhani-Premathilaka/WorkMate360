package com.example.WorkMate360.dto;

import com.example.WorkMate360.models.Profile;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Base64;

@Getter
@Setter
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

    // Conversion from Entity to DTO
    public static ProfileDTO fromEntity(Profile profile) {
        ProfileDTO dto = new ProfileDTO();
        dto.setIndex(profile.getIndex());
        dto.setName(profile.getName());
        dto.setEmail(profile.getEmail());
        dto.setPhoneNumber(profile.getPhoneNumber());
        dto.setProvince(profile.getProvince());
        dto.setDistrict(profile.getDistrict());
        dto.setStreet(profile.getStreet());
        dto.setHouseNumber(profile.getHouseNumber());
        dto.setGender(profile.getGender());
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setAgeNow(profile.getAgeNow());
        dto.setPosition(profile.getPosition());
        dto.setCountry(profile.getCountry());
        dto.setDepartment(profile.getDepartment());
        dto.setSalary(profile.getSalary());

        if (profile.getProfilePicture() != null) {
            dto.setProfilePictureBase64(
                    "data:image/png;base64," +
                            Base64.getEncoder().encodeToString(profile.getProfilePicture())
            );
        }

        return dto;
    }

    // Conversion from DTO to Entity
    public Profile toEntity() {
        Profile profile = new Profile();
        profile.setIndex(this.index);
        profile.setName(this.name);
        profile.setEmail(this.email);
        profile.setPhoneNumber(this.phoneNumber);
        profile.setProvince(this.province);
        profile.setDistrict(this.district);
        profile.setStreet(this.street);
        profile.setHouseNumber(this.houseNumber);
        profile.setGender(this.gender);
        profile.setDateOfBirth(this.dateOfBirth);
        profile.setAgeNow(this.ageNow);
        profile.setPosition(this.position);
        profile.setCountry(this.country);
        profile.setDepartment(this.department);
        profile.setSalary(this.salary);

        if (this.profilePictureBase64 != null && this.profilePictureBase64.startsWith("data:")) {
            String base64Image = this.profilePictureBase64.split(",")[1]; // remove data:image/... prefix
            profile.setProfilePicture(Base64.getDecoder().decode(base64Image));
        }

        return profile;
    }
}
