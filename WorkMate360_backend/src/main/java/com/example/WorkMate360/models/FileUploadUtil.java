package com.example.WorkMate360.models;

import lombok.experimental.UtilityClass;
import org.apache.commons.io.FilenameUtils;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@UtilityClass
public class FileUploadUtil {

    public static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    public static final String IMAGE_PATTERN = "image/(png|jpg|jpeg|gif)";

    public static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

    public static final String FILE_NAME_PATTERN = "^[a-zA-Z0-9._-]+$";

    public static boolean isAllowedExtension(final String fileName, final String pattern) {
        final Matcher matcher = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE).matcher(fileName);
        return fileName.matches(IMAGE_PATTERN);
    }

    public static void  assertAllowed(MultipartFile file, String pattern){
        final long fileSize = file.getSize();
        if (fileSize > MAX_FILE_SIZE){

            throw new IllegalArgumentException("File size exceeds the maximum allowed limit of " + MAX_FILE_SIZE + " bytes.");
        }

        final String fileName = file.getOriginalFilename();
        final String extension = FilenameUtils.getExtension(fileName);
        if (!isAllowedExtension(extension, pattern)) {
            throw new IllegalArgumentException("File type not allowed. Allowed types are: " + pattern);
        }
    }

    public static String getFileName(final String name){
        final DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        final String date = dateFormat.format(System.currentTimeMillis());
        return String.format(FILE_NAME_PATTERN, name, date);
    }
}
