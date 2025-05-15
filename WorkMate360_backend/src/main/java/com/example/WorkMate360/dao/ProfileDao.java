package com.example.WorkMate360.dao;

import com.example.WorkMate360.models.Profile;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileDao extends CrudRepository<Profile, Integer> {
     //give

}
