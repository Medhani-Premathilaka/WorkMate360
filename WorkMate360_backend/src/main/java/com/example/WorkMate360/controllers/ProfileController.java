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

    @GetMapping("/all/{index}")
    public ResponseEntity<List<Profile>> getAllProfilesByIndex(@PathVariable Integer index) {
        return profileService.getAllDetailsByIndex(index);
    }

    @PostMapping("/add")
    public ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {
        return profileService.addProfile(profile);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable Integer id) {
        return profileService.deleteProfile(id);
    }

    @PutMapping("/update")
    public Profile updateProfile(@RequestBody Profile profile) {

         return profileService.updateProfile(profile);
    }

}
