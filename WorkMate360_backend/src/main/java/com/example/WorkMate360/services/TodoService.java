package com.example.WorkMate360.services;

import com.example.WorkMate360.dao.ProfileDao;
import com.example.WorkMate360.models.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.WorkMate360.dao.TodoDao;
import com.example.WorkMate360.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// Add this import at the top of TodoService.java
import jakarta.persistence.EntityNotFoundException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoDao todoDao;

    @Autowired
    private ProfileDao profileDao;


    public ResponseEntity<List<Todo>> getTodoByProfileId(Integer profileId) {
        try {
            List<Todo> todos = todoDao.findByProfileId(profileId);
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<Todo> createTodo(Todo todo) {
        // Logic to save the todo to the database
        // For now, just return the todo object wrapped in a RequestEntity
        if (todo.getProfile() == null || todo.getProfile().getIndex() == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Integer profileId = todo.getProfile().getIndex();
        Profile profile = profileDao.findById(profileId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found with id: " + profileId));

        // Set the managed entity reference
        todo.setProfile(profile);
        Todo savedTodo = todoDao.save(todo);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
        //return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }

    public ResponseEntity<List<Todo>> getAllTodos() {
        try {
            List<Todo> todos = new ArrayList<>((Collection<Todo>) todoDao.findAll());
            return new ResponseEntity<>(todos, HttpStatus.OK);

        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    public ResponseEntity<List<Todo>> getTodoByProfileId(Integer profile_id) {
//        try {
//            List<Todo> todos = todoDao.findAllByProfile_Id(profile_id);
//            return new ResponseEntity<>(todos, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


    public ResponseEntity<Todo> getTodoById(Integer id) {
        try {
            Todo todo = todoDao.findById(id).orElse(null);
            if (todo != null) {
                return new ResponseEntity<>(todo, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
