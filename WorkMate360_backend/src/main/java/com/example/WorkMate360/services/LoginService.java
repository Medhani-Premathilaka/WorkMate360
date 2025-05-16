package com.example.WorkMate360.services;

import com.example.WorkMate360.dao.LoginDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    LoginDao loginDao;

}
