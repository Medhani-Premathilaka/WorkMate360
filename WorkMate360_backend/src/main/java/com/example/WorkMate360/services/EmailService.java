package com.example.WorkMate360.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // Regular expression for basic email validation
    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$");


    public void sendCredentialsEmail(String toEmail, String username, String password) {
        // Validate email address before sending
        if (!isValidEmail(toEmail)) {
            throw new IllegalArgumentException("Invalid email address: " + toEmail);
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Your WorkMate360 Account Credentials");

        message.setText("Hello,\n\nYour account has been created successfully. Here are your credentials:\n\n" +
                "Username: " + username + "\n" +
                "Password: " + password + "\n\n" +
                "Please change your password after logging in for the first time.\n\n" +
                "Regards,\nWorkMate360 Team");

        mailSender.send(message);

//        String emailText = String.format(
//                "Dear Employee,\n\n" +
//                        "Your account has been created with the following credentials:\n\n" +
//                        "Username: %s\n" +
//                        "Temporary Password: %s\n\n" +
//                        "Please login at http://your-app-url/login and change your password immediately.\n\n" +
//                        "This is an automated message - please do not reply.",
//                username, password
//        );

        //message.setText(emailText);
        mailSender.send(message);
    }
    private boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email).matches();
    }

//    public void sendEmail(String email, String welcomeToWorkMate360, String s) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(fromEmail);
//        message.setTo(email);
//        message.setSubject(welcomeToWorkMate360);
//        message.setText(s);
//        mailSender.send(message);
//    }
}
