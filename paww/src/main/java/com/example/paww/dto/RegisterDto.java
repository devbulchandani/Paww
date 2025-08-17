package com.example.paww.dto;

import com.example.paww.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterDto {
    @NotBlank private String name;
    @NotBlank private String phone;
    @NotBlank private String password;
    @NotNull private UserRole role;
    private String city;
}
