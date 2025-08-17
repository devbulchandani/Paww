package com.example.paww.dto;

import com.example.paww.enums.Gender;
import lombok.Data;

@Data
public class DogSearchParams {
    private String street;
    private int maxAge;
    private String locality;
    private String city;
    private String state;
    private String postalCode;

    private Gender gender;
    private Boolean vaccinated;
}
