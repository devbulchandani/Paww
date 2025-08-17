package com.example.paww.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDto {
    @NotBlank private String phone;
    @NotBlank private String password;
}
