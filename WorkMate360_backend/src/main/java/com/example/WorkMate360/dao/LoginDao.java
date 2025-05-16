package com.example.WorkMate360.dao;

import com.example.WorkMate360.models.Login;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface LoginDao extends JpaRepository<Login, Integer> {
    // You can add custom queries as needed

}
