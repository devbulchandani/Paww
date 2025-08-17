package com.example.paww.controllers;

import com.cloudinary.api.ApiResponse;
import com.example.paww.dto.DogCreateRequest;
import com.example.paww.dto.DogResponse;
import com.example.paww.dto.DogSearchParams;
import com.example.paww.dto.TokenDto;
import com.example.paww.enums.Gender;
import com.example.paww.service.DogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/dogs")
@RequiredArgsConstructor
public class DogController {
    private final DogService dogService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DogResponse> create(
            @RequestHeader("X-userId") UUID userId,
            @Valid @RequestPart("data") DogCreateRequest data,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {


        DogResponse response = dogService.create(userId, data, image);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<DogResponse>> search(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Boolean vaccinated,
            @RequestParam(defaultValue = "0") int maxAge,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String locality,
            @RequestParam(required = false) String street,
            @RequestParam(required = false, name = "pincode") String postalCode
    ) {
        DogSearchParams params = new DogSearchParams();
        if (gender != null) {
            try {
                params.setGender(Gender.valueOf(gender.toUpperCase())); // assuming you have Gender enum
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }
        params.setVaccinated(vaccinated);
        params.setMaxAge(maxAge);
        params.setState(state);
        params.setCity(city);
        params.setLocality(locality);
        params.setStreet(street);
        params.setPostalCode(postalCode);

        return ResponseEntity.ok(dogService.search(params));
    }

}
