package com.example.paww.dto;

import com.example.paww.enums.Gender;
import com.example.paww.models.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DogResponse {
    private UUID id;
    private String name;
    private String description;
    private Integer age;
    private Gender gender;
    private String imageUrl;
    private Address address;
    private Boolean vaccinatedStatus;
    private String registrantName;
    private String registrantPhone;
}
