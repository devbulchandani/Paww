package com.example.paww.service;

import com.example.paww.repository.DogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final DogRepository dogRepository;
    public List<String> getStates() {
        return dogRepository.findDistinctStates();
    }

    public List<String> getCities(String state) {
        return dogRepository.findDistinctCitiesByState(state);
    }

    public List<String> getLocalities(String state, String city) {
        return dogRepository.findDistinctLocalitiesByStateAndCity(state, city);
    }

    public List<String> getStreets(String state, String city, String locality) {
        return dogRepository.findDistinctStreetsByStateAndCityAndLocality(state, city, locality);
    }
}
