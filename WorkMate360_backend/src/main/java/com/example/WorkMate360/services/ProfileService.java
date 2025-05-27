package com.example.WorkMate360.services;

import com.example.WorkMate360.dao.ProfileDao;
import com.example.WorkMate360.dto.CloudinaryResponse;
import com.example.WorkMate360.models.FileUploadUtil;
import com.example.WorkMate360.models.Login;
import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileDao profileDao;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CloudinaryService cloudinaryService;



    private String generateUsername(String name, Integer index) {
        String[] nameParts = name.toLowerCase().split(" ");
        return nameParts[0] + "." + nameParts[nameParts.length-1] + index;
    }

    private String generatePassword(LocalDate dob, Integer index) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
        return dob.format(formatter) + index;
    }

//    public  Profile addProfile(Profile profile, MultipartFile imageFile) throws IOException {
//        profile.setImageName(imageFile.getOriginalFilename());
//        profile.setImageType(imageFile.getContentType());
//        profile.setImageData(imageFile.getBytes());
//        return profileDao.save(profile);
//    }



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
                userRepo.deleteById(index);
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

    public ResponseEntity<Profile> getProfileByName(String name) {
        try {
            List<Profile> profiles = profileDao.findByName(name);
            if (profiles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(profiles.get(0), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    public Profile createProfileWithCredentials(Profile profile, MultipartFile imageFile) {
//        try {
//            // Generate username and password
//            String username = generateUsername(profile.getName(), profile.getIndex());
//            String password = generatePassword(profile.getDateOfBirth(), profile.getIndex());
//
//
//            // Set the generated username and password
//            profile.setEmail(username);
//            profile.setPhoneNumber(passwordEncoder.encode(password));
//
//            // Upload image to Cloudinary if provided
//            if (imageFile != null && !imageFile.isEmpty()) {
//                FileUploadUtil.assertAllowed(imageFile, FileUploadUtil.IMAGE_PATTERN);
//                final String fileName = FileUploadUtil.getFileName(imageFile.getOriginalFilename());
//                final CloudinaryResponse response = this.cloudinaryService.uploadFile(imageFile, fileName);
//                // Set the URL from Cloudinary response, not just the filename
//                profile.setImageUrl(response.getUrl());
//            }else{
//                return null;
//            }
////            if (profile.getImageUrl() == null || profile.getImageUrl().isEmpty()) {
////                return null;
////            }
//
//            // Save the profile
//            Profile savedProfile = profileDao.save(profile);
//
//            // Create a Login object
//            Login login = new Login();
//            login.setUsername(username);
//            login.setPassword(password);
//            login.setRole("USER");
//            login.setProfile(savedProfile);
//
//            // Save the login credentials (assuming you have a LoginDao)
//             userRepo.save(login);
//
//
//            // Send email with raw password (not encoded)
//            emailService.sendCredentialsEmail(savedProfile.getEmail(), username, password);
//
//            return savedProfile;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
    public ResponseEntity<Profile> adddProfile(Profile profile) {
        String username = generateUsername(profile.getName(), profile.getIndex());
        String password = generatePassword(profile.getDateOfBirth(), profile.getIndex());
        String email = profile.getEmail();

        profile.setEmail(email);

        Profile savedProfile = profileDao.save(profile);

        Login login = new Login();
        login.setUsername(username);
        login.setPassword(passwordEncoder.encode(password));
        login.setRole("USER");
        login.setProfile(savedProfile);

        // Save the login credentials (assuming you have a LoginDao)
        userRepo.save(login);
        emailService.sendCredentialsEmail(savedProfile.getEmail(), username, password);

        profileDao.save(profile);
        return new ResponseEntity<>(profile, HttpStatus.CREATED);
    }
    public void  addProfile(final Integer id, final MultipartFile file ){
        final Profile profile = profileDao.findById(id).orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
        FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PATTERN);
        final String fileName = FileUploadUtil.getFileName(file.getOriginalFilename());
        final CloudinaryResponse response = this.cloudinaryService.uploadFile(file, fileName);
        profile.setImageUrl(fileName);
        //profile.setImagePublicId(response.getPublicId());
        this.profileDao.save(profile);
    }
    // In your service class that needs the profile data:
    public Profile getProfileByUsername(String username) {
        Login login = userRepo.findByUsername(username);
        return login != null ? login.getProfile() : null;
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
