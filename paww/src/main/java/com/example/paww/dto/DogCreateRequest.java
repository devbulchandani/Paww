package com.example.paww.dto;

import com.example.paww.enums.Gender;
import com.example.paww.models.Address;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class DogCreateRequest {
    @NotBlank
    private String name;
    @Size(max = 1000)
    private String description;
    @Min(0)
    @Max(25)
    private Integer age;
    private Gender gender = Gender.UNKNOWN;
    @NotNull
    Address address;
    private Boolean vaccinatedStatus = false;
}
