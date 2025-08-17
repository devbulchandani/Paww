package com.example.paww.controllers;

import com.example.paww.dto.LoginDto;
import com.example.paww.dto.RegisterDto;
import com.example.paww.dto.TokenDto;
import com.example.paww.models.User;
import com.example.paww.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto body){
        if (userRepository.existsByPhone(body.getPhone())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Phone already registered");
        }

        User u = new User();
        u.setName(body.getName());
        u.setPhone(body.getPhone());
        u.setPasswordHash(encoder.encode(body.getPassword()));
        u.setRole(body.getRole());
        u.setCity(body.getCity());
        userRepository.save(u);

        return ResponseEntity.ok("User Registered Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto body){
        User u = userRepository.findByPhone(body.getPhone()).orElse(null);
        if(u==null || u.getPasswordHash()==null || !encoder.matches(body.getPassword(), u.getPasswordHash())){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid phone number or password");
        }

        String token = UUID.randomUUID().toString();
        return ResponseEntity.ok(new TokenDto(token, u.getId().toString()));
    }

}
