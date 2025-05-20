package com.example.WorkMate360.controllers;

import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @GetMapping("/all")
    public ResponseEntity<List<Profile>> getAllProfiles() {
        return profileService.getAllDetails();
    }

    @GetMapping(value = "/details/{index}")
    public ResponseEntity<Profile> getProfileByIndex(@PathVariable Integer index) {
        return profileService.getAllDetailsByIndex(index);
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
    public Profile updateProfile(@RequestBody Profile profile) {

         return profileService.updateProfile(profile);
    }

}
