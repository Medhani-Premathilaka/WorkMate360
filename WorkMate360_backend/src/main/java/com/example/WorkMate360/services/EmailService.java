package com.example.WorkMate360.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendCredentialsEmail(String toEmail, String username, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Your WorkMate360 Account Credentials");

        String emailText = String.format(
                "Dear Employee,\n\n" +
                        "Your account has been created with the following credentials:\n\n" +
                        "Username: %s\n" +
                        "Temporary Password: %s\n\n" +
                        "Please login at http://your-app-url/login and change your password immediately.\n\n" +
                        "This is an automated message - please do not reply.",
                username, password
        );

        message.setText(emailText);
        mailSender.send(message);
    }

    public void sendEmail(String email, String welcomeToWorkMate360, String s) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject(welcomeToWorkMate360);
        message.setText(s);
        mailSender.send(message);
    }
}
