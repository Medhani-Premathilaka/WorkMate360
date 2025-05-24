package com.example.WorkMate360.dao;

import com.example.WorkMate360.models.Profile;
import com.example.WorkMate360.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  UserDao extends JpaRepository<User, Integer> {

    // Add more methods as needed
}
