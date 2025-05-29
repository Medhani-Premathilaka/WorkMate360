package com.example.WorkMate360.dao;

import com.example.WorkMate360.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface TodoDao extends JpaRepository<Todo, Integer> {
   // List<Todo> findAllByProfile_Index(Integer profileIndex);

    //List<Todo> findAllByProfile_Id(Integer profile_id);
    @Query("SELECT t FROM Todo t WHERE t.profile.id = :profileId")
    List<Todo> findByProfileId(@Param("profileId") Integer profileId);

}
