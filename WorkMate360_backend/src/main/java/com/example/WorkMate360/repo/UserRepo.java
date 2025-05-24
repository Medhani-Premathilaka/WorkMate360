package com.example.WorkMate360.repo;

import com.example.WorkMate360.models.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Login, Integer> {
    ;

    Login findByUsername(String username);
    // Add more methods as needed
}
