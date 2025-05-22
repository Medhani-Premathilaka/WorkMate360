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
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileDao profileDao;

    public ResponseEntity<List<Profile>> getAllDetails() {
        try {
            List<Profile> profiles = new ArrayList<>((Collection<Profile>) profileDao.findAll());
            return new ResponseEntity<>(profiles, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Profile> getAllDetailsByIndex(Integer index) {
        try {
            Optional<Profile> profileOptional = profileDao.findById(index);
            return profileOptional.map(profile ->
                            new ResponseEntity<>(profile, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Profile> addProfile(Profile profile) {
        try {
            Profile saved = profileDao.save(profile);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteProfile(Integer index) {
        try {
            if (profileDao.existsById(index)) {
                profileDao.deleteById(index);
                return new ResponseEntity<>("Profile deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Profile not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete profile", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Profile> updateProfile(Profile profile) {
        try {
            if (!profileDao.existsById(profile.getIndex())) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Profile updated = profileDao.save(profile);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public int count() {
        return Math.toIntExact(profileDao.count());
    }
}

//@Service
//public class ProfileService {
//
//    @Autowired
//    ProfileDao profileDao;
//
//    public ResponseEntity<List<Profile>> getAllDetails() {
//        try {
//            List<Profile> profiles = new ArrayList<>((Collection<Profile>) profileDao.findAll());
//            return new ResponseEntity<>(profiles, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
//    }
//
//    public ResponseEntity<Profile> getAllDetailsByIndex(Integer index) {
//        try {
//            Optional<Profile> profileOptional = profileDao.findById(index);
//            if (profileOptional.isPresent()) {
//                return new ResponseEntity<>(profileOptional.get(), HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    public ResponseEntity<Profile> addProfile(Profile profile) {
//        profileDao.save(profile);
//        return new ResponseEntity<>(profile, HttpStatus.CREATED);
//    }
//
//    public ResponseEntity<String> deleteProfile(Integer index) {
//        profileDao.deleteById(index);
//        return new ResponseEntity<>("Profile deleted successfully", HttpStatus.OK);
////        try {
////            if (profileDao.existsById(id)) {
////                profileDao.deleteById(id);
////                return new ResponseEntity<>("Profile deleted successfully", HttpStatus.OK);
////            } else {
////                return new ResponseEntity<>("Profile not found with id: " + id, HttpStatus.NOT_FOUND);
////            }
////        } catch (Exception e) {
////            e.printStackTrace();
////            return new ResponseEntity<>("Failed to delete profile: " + e.getMessage(),
////                    HttpStatus.INTERNAL_SERVER_ERROR);
////        }
//    }
//
//    public Profile updateProfile(Profile profile) {
//        profileDao.save(profile);
//        return profile;
//        //return "Updated successfully";
//    }
//
//    public int count() {
//        return Math.toIntExact(profileDao.count());
//    }
//}
