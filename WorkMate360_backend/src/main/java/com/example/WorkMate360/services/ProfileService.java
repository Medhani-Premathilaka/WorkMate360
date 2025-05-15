package com.example.WorkMate360.services;

import com.example.WorkMate360.dao.ProfileDao;
import com.example.WorkMate360.models.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ProfileService {

    @Autowired
    ProfileDao profileDao;

    public ResponseEntity<List<Profile>> getAllDetails() {
        try {
            List<Profile> profiles = new ArrayList<>((Collection<Profile>) profileDao.findAll());
            return new ResponseEntity<>(profiles, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Profile>> getAllDetailsByIndex(Integer index) {
        try {
            List<Profile> allProfiles = new ArrayList<>((Collection<Profile>) profileDao.findAll());

            // Filter profiles by index
            List<Profile> filteredProfiles = allProfiles.stream()
                    .filter(profile -> profile.getIndex().equals(index))
                    .collect(java.util.stream.Collectors.toList());

            if (filteredProfiles.isEmpty()) {
                return new ResponseEntity<>(filteredProfiles, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(filteredProfiles, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Profile> addProfile(Profile profile) {
        profileDao.save(profile);
        return new ResponseEntity<>(profile, HttpStatus.CREATED);
    }

    public ResponseEntity<String> deleteProfile(Integer id) {
        profileDao.deleteById(id);
        return new ResponseEntity<>("Profile deleted successfully", HttpStatus.OK);
//        try {
//            if (profileDao.existsById(id)) {
//                profileDao.deleteById(id);
//                return new ResponseEntity<>("Profile deleted successfully", HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>("Profile not found with id: " + id, HttpStatus.NOT_FOUND);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>("Failed to delete profile: " + e.getMessage(),
//                    HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }

    public Profile updateProfile(Profile profile) {
        profileDao.save(profile);
        return profile;
        //return "Updated successfully";
    }

}
