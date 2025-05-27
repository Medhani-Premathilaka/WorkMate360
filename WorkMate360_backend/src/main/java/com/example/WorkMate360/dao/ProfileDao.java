package com.example.WorkMate360.dao;

import com.example.WorkMate360.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileDao extends JpaRepository<Profile, Integer> {

    @Query("SELECT p FROM Profile p WHERE p.Name = :name")
    List<Profile> findByName(String name);

    @Query("SELECT l.profile FROM Login l WHERE l.username = :username")
    Optional<Profile> findByUsername(@Param("username") String username);
}