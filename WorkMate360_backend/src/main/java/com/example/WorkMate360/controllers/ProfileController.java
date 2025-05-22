package com.example.WorkMate360.controllers;

import com.example.WorkMate360.dao.ProfileDao;
import com.example.WorkMate360.dto.ProfileDTO;
import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ProfileDao profileDao;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/all")
    public ResponseEntity<List<Profile>> getAllProfiles() {
        return profileService.getAllDetails();
    }

    @GetMapping("/details/{index}")
    public ResponseEntity<Profile> getProfileByIndex(@PathVariable Integer index) {
        return profileService.getAllDetailsByIndex(index);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getEmployeeCount() {
        int count = profileService.count();
        return ResponseEntity.ok((long) count);
    }

    @PostMapping("/add")
    public ResponseEntity<ProfileDTO> createProfile(@RequestBody ProfileDTO profileDTO) {
        Profile profile = profileDao.save(profileDTO.toEntity());
        return ResponseEntity.ok(ProfileDTO.fromEntity(profile));
    }

    @DeleteMapping("/delete/{index}")
    public ResponseEntity<String> deleteProfile(@PathVariable Integer index) {
        return profileService.deleteProfile(index);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO profileDTO) {
        try {
            // 1. First update everything EXCEPT the profile picture
            Optional<Profile> optionalProfile = profileDao.findById(profileDTO.getIndex());
            if (optionalProfile.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
            }

            Profile profile = optionalProfile.get();

            // Update all text fields
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

            // Temporarily set profile picture to null to avoid ORM issues
            profile.setProfilePicture(null);

            // Save profile with text data only
            Profile updatedProfile = profileDao.save(profile);

            // 2. Update profile picture separately with native SQL query
            if (profileDTO.getProfilePictureBase64() != null && !profileDTO.getProfilePictureBase64().isEmpty()) {
                try {
                    String base64Data = profileDTO.getProfilePictureBase64();
                    if (base64Data.contains(",")) {
                        base64Data = base64Data.split(",")[1];
                    }

                    byte[] imageData = Base64.getDecoder().decode(base64Data);

                    // Use jdbcTemplate with proper type mapping
                    jdbcTemplate.update(
                            "UPDATE profile SET profile_picture = ? WHERE index = ?",
                            ps -> {
                                ps.setBytes(1, imageData);
                                ps.setInt(2, profile.getIndex());
                            }
                    );
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body("Invalid image format: " + e.getMessage());
                }
            }

            // Return the updated profile (need to fetch again to include image)
            return ResponseEntity.ok(ProfileDTO.fromEntity(
                    profileDao.findById(profile.getIndex()).orElse(profile)
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }
}


//@RestController
//@CrossOrigin(origins = "http://localhost:5174")
//@RequestMapping("/profile")
//public class ProfileController {
//
//    @Autowired
//    ProfileService profileService;
//    @Autowired
//    private ProfileDao profileDao;
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Profile>> getAllProfiles() {
//        return profileService.getAllDetails();
//    }
//
//    @GetMapping(value = "/details/{index}")
//    public ResponseEntity<Profile> getProfileByIndex(@PathVariable Integer index) {
//        return profileService.getAllDetailsByIndex(index);
//    }
//
//    @GetMapping("/count")
//    public  ResponseEntity<Long> getEmployeeCount(){
//        int count = profileService.count();
//        return ResponseEntity.ok((long) count);
//    }
//    @PostMapping("/add")
////    public ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {
////        return profileService.addProfile(profile);
////    }
////    public ResponseEntity<ProfileDTO> createProfile(@RequestBody ProfileDTO profileDTO) {
////        Profile profile = profileDao.save(profileDTO.toEntity());
////        return ResponseEntity.ok(ProfileDTO.fromEntity(profile));
////    }
//    public ResponseEntity<ProfileDTO> createProfile(@RequestBody ProfileDTO profileDTO) {
//        Profile profile = profileDao.save(profileDTO.toEntity());
//        return ResponseEntity.ok(ProfileDTO.fromEntity(profile));
//    }
//
//    @DeleteMapping("/delete/{index}")
//    public ResponseEntity<String> deleteProfile(@PathVariable Integer index) {
//        return profileService.deleteProfile(index);
//    }
//
//    @PutMapping("/update")
////    public Profile updateProfile(@RequestBody Profile profile) {
////
////         return profileService.updateProfile(profile);
////    }
//
//    public ResponseEntity<?> updateProfile(@RequestBody ProfileDTO profileDTO) {
//        try {
//            Profile profile = profileDao.findById(profileDTO.getIndex())
//                    .orElseThrow(() -> new RuntimeException("Profile not found"));
//
//            // Update regular fields
//            profile.setName(profileDTO.getName());
//            profile.setEmail(profileDTO.getEmail());
//            profile.setPhoneNumber(profileDTO.getPhoneNumber());
//            profile.setProvince(profileDTO.getProvince());
//            profile.setDistrict(profileDTO.getDistrict());
//            profile.setStreet(profileDTO.getStreet());
//            profile.setHouseNumber(profileDTO.getHouseNumber());
//            profile.setGender(profileDTO.getGender());
//            profile.setDepartment(profileDTO.getDepartment());
//            profile.setDateOfBirth(profileDTO.getDateOfBirth());
//            profile.setAgeNow(profileDTO.getAgeNow());
//
//            // Don't set profile picture directly like this
//            // profile.setProfilePicture(profile.getProfilePicture());
//
//            // Handle profile picture conversion properly
//            if (profileDTO.getProfilePictureBase64() != null &&
//                    !profileDTO.getProfilePictureBase64().isEmpty()) {
//
//                String base64Image = profileDTO.getProfilePictureBase64();
//                // Remove data:image prefix if present
//                if (base64Image.contains(",")) {
//                    base64Image = base64Image.split(",")[1];
//                }
//
//                byte[] imageBytes = Base64.getDecoder().decode(base64Image);
//                // Use setter without any ORM annotation logic
//                profile.setProfilePicture(imageBytes);
//            }
//
//            // If the above still fails, try using a native query
//        /*
//        if (profileDTO.getProfilePictureBase64() != null &&
//                !profileDTO.getProfilePictureBase64().isEmpty()) {
//
//            // Save the profile without the image first
//            Profile savedProfile = profileDao.save(profile);
//
//            // Then update the image separately using a native query
//            String base64Image = profileDTO.getProfilePictureBase64().split(",")[1];
//            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
//
//            // Use EntityManager to execute a native query
//            EntityManager entityManager = entityManagerFactory.createEntityManager();
//            entityManager.getTransaction().begin();
//            Query query = entityManager.createNativeQuery(
//                "UPDATE profile SET profile_picture = ? WHERE index = ?");
//            query.setParameter(1, imageBytes);
//            query.setParameter(2, profile.getIndex());
//            query.executeUpdate();
//            entityManager.getTransaction().commit();
//            entityManager.close();
//
//            return ResponseEntity.ok(savedProfile);
//        }
//        */
//
//            Profile savedProfile = profileDao.save(profile);
//            return ResponseEntity.ok(savedProfile);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
//        }
//    }
//
//}
