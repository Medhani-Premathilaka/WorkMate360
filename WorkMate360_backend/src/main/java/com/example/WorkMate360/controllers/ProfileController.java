package com.example.WorkMate360.controllers;

import com.example.WorkMate360.dao.ProfileDao;

import com.example.WorkMate360.dto.ChangePasswordRequest;
import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.services.JWTService;
import com.example.WorkMate360.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService profileService;
    @Autowired
    private ProfileDao profileDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtUtil;

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

    @GetMapping("/name")
    public ResponseEntity<Profile> getProfileByName(@RequestParam String name) {
        return profileService.getProfileByName(name);
    }
//    @PostMapping("/add")
//    public ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {
//        return profileService.addProfile(profile);
//    }
//@PostMapping("/add")
//public ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {
//    Profile savedProfile = profileService.createProfileWithCredentials(profile);
//    return ResponseEntity.ok(savedProfile);
//}
@PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<Profile> addProfile(
        @RequestPart("profile") Profile profile,
        @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {

try{
    Profile savedProfile = profileService.createProfileWithCredentials(profile, imageFile);

    if (savedProfile != null) {
        return ResponseEntity.ok(savedProfile);
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null);
    }
}catch (Exception e){
    e.printStackTrace();
    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
}

}

    @DeleteMapping("/delete/{index}")
    public ResponseEntity<String> deleteProfile(@PathVariable Integer index) {
        return profileService.deleteProfile(index);
    }

    @PutMapping("/update")
    public Profile updateProfile(@RequestBody Profile profile) {

         return profileService.updateProfile(profile).getBody();
    }


//    @PostMapping(value = "/addProfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> addProfile(
//            @RequestPart("profile") Profile profile,
//            @RequestPart("imageFile") MultipartFile imageFile) {
//        try {
//            Profile savedProfile = profileService.addProfile(id, imageFile);
//            return new ResponseEntity<>(savedProfile, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//    @PostMapping("/change-password")
//    public ResponseEntity<?> changePassword(
//            @RequestHeader("Authorization") String token,
//            @RequestBody ChangePasswordRequest request
//    ) {
//        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
//        Profile profile = (Profile) profileDao.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        profile.setTemporaryPassword(passwordEncoder.encode(request.getNewPassword()));
//        profile.setPasswordResetRequired(false);
//        profileDao.save(profile);
//
//        return ResponseEntity.ok("Password changed successfully");
//    }


}
