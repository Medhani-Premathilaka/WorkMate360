package com.example.WorkMate360.controllers;

import com.example.WorkMate360.models.Todo;
import com.example.WorkMate360.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/create")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo){
        return todoService.createTodo(todo);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Todo> deleteTodo(@PathVariable Integer id) {
        return todoService.deleteTodo(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo, @PathVariable Integer id) {
        return todoService.updateTodo(todo,id);
    }


//    @GetMapping("/getAll")
//    public ResponseEntity<List<Todo>> getAllTodos(@PathVariable Todo todo) {
//        return  todoService.getAllTodos(todo);
//    }


//    @GetMapping("/getById")
//    public ResponseEntity<List<Todo>> getTodoByProfileId(@RequestParam Integer profile_id) {
//        return todoService.getTodoByProfileId(profile_id);
//    }
@GetMapping("/getByProfileId/{index}")
public ResponseEntity<List<Todo>> getTodoByProfileId(@PathVariable Integer index) {
    return todoService.getTodoByProfileId(index);
}
    @GetMapping("/getById/{id}")
    public ResponseEntity<Todo> getTodoById(@RequestParam Integer id) {
        return todoService.getTodoById(id);
    }

}
