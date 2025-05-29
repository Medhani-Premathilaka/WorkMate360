package com.example.WorkMate360.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Data
@Entity
@Getter
@Setter
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private LocalDate dueDate; // Links to calendar
    private boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonBackReference
    private Profile profile;
}
