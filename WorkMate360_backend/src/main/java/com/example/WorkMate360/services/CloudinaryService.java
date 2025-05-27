package com.example.WorkMate360.services;

import com.cloudinary.Cloudinary;
import com.example.WorkMate360.dto.CloudinaryResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    @Transactional
    public CloudinaryResponse uploadFile(MultipartFile file, String file_name) {
        try {
            final Map result = cloudinary.uploader().upload(file.getBytes(), Map.of(
                "resource_type", "auto",
                "public_id", file_name
            ));
            final String url = (String) result.get("secure_url");
            final String publicId = (String) result.get("public_id");
            return CloudinaryResponse.builder().publicId(publicId).url(url).build();
        }catch (Exception e){
            e.printStackTrace();
            return new CloudinaryResponse("Error uploading file: " + e.getMessage(), null);
        }
    }
}
