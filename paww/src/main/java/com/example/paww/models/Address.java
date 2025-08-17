package com.example.paww.models;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Address {
    private String street;
    private String locality;
    private String city;
    private String state;
    private String pincode;
}
