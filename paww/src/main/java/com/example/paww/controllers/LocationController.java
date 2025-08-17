package com.example.paww.controllers;

import com.example.paww.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;
    @GetMapping("/states")
    public ResponseEntity<List<String>> getStates() {
        return ResponseEntity.ok(locationService.getStates());
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getCities(@RequestParam String state) {
        return ResponseEntity.ok(locationService.getCities(state));
    }

    @GetMapping("/localities")
    public ResponseEntity<List<String>> getLocalities(
            @RequestParam String state,
            @RequestParam String city
    ) {
        return ResponseEntity.ok(locationService.getLocalities(state, city));
    }

    @GetMapping("/streets")
    public ResponseEntity<List<String>> getStreets(
            @RequestParam String state,
            @RequestParam String city,
            @RequestParam String locality
    ) {
        return ResponseEntity.ok(locationService.getStreets(state, city, locality));
    }


}
