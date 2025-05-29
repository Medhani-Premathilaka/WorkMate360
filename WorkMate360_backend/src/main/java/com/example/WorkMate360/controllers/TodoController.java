package com.example.WorkMate360.controllers;

import com.example.WorkMate360.models.Todo;
import com.example.WorkMate360.services.TodoService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/create")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo){
        return todoService.createTodo(todo);

    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Todo>> getAllTodos(){
        return  todoService.getAllTodos();
    }


//    @GetMapping("/getById")
//    public ResponseEntity<List<Todo>> getTodoByProfileId(@RequestParam Integer profile_id) {
//        return todoService.getTodoByProfileId(profile_id);
//    }
@GetMapping("/getByProfileId/{profileId}")
public ResponseEntity<List<Todo>> getTodoByProfileId(@PathVariable Integer profileId) {
    return todoService.getTodoByProfileId(profileId);
}
    @GetMapping("/getById/{id}")
    public ResponseEntity<Todo> getTodoById(@RequestParam Integer id) {
        return todoService.getTodoById(id);
    }

}
