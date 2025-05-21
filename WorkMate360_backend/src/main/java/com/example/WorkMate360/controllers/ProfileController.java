package com.example.WorkMate360.controllers;

import com.example.WorkMate360.dao.ProfileDao;
import com.example.WorkMate360.dto.ProfileDTO;
import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService profileService;
    @Autowired
    private ProfileDao profileDao;

    @GetMapping("/all")
    public ResponseEntity<List<Profile>> getAllProfiles() {
        return profileService.getAllDetails();
    }

    @GetMapping(value = "/details/{index}")
    public ResponseEntity<Profile> getProfileByIndex(@PathVariable Integer index) {
        return profileService.getAllDetailsByIndex(index);
    }

    @GetMapping("/count")
    public  ResponseEntity<Long> getEmployeeCount(){
        int count = profileService.count();
        return ResponseEntity.ok((long) count);
    }
    @PostMapping("/add")
    public ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {
        return profileService.addProfile(profile);
    }

    @DeleteMapping("/delete/{index}")
    public ResponseEntity<String> deleteProfile(@PathVariable Integer index) {
        return profileService.deleteProfile(index);
    }

    @PutMapping("/update")
//    public Profile updateProfile(@RequestBody Profile profile) {
//
//         return profileService.updateProfile(profile);
//    }
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO profileDTO) {
        try {
            // Use findById with the correct ID field from your DTO
            Profile profile = profileDao.findById(profileDTO.getIndex())
                    .orElseThrow(() -> new RuntimeException("Profile not found"));

            // Update all relevant fields
            profile.setName(profileDTO.getName());
            profile.setEmail(profileDTO.getEmail());
            profile.setPhoneNumber(profileDTO.getPhoneNumber());
            profile.setProvince(profileDTO.getProvince());
            profile.setDistrict(profileDTO.getDistrict());
            profile.setStreet(profileDTO.getStreet());
            profile.setHouseNumber(profileDTO.getHouseNumber());
            profile.setGender(profileDTO.getGender());
            profile.setDepartment(profileDTO.getDepartment());
            profile.setDateOfBirth(profileDTO.getDateOfBirth());
            profile.setAgeNow(profileDTO.getAgeNow());
            profile.setProfilePicture(profile.getProfilePicture());

            // Handle profile picture if that method exists
            if (profileDTO.getProfilePictureBase64() != null &&
                    !profileDTO.getProfilePictureBase64().isEmpty()) {
                // Make sure this method exists in your Profile class
                profile.setProfilePictureFromBase64(profileDTO.getProfilePictureBase64());
            }

            // Save to database
            Profile savedProfile = profileDao.save(profile);

            // Add logging to check if save operation occurred
            System.out.println("Profile updated: " + savedProfile.getIndex());

            return ResponseEntity.ok(savedProfile);
        } catch (Exception e) {
            // Log the specific exception
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

}
