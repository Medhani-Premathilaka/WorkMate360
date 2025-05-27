package com.example.WorkMate360.dto;

public class ChangePasswordRequest {
    private String currentPassword;  // Needed if changing from non-temporary password
    private String newPassword;
    private String confirmPassword;

    // Constructors
    public ChangePasswordRequest() {}

    public ChangePasswordRequest(String newPassword, String confirmPassword) {
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    // Getters and Setters
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
