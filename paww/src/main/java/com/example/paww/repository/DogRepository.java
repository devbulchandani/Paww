package com.example.paww.repository;

import com.example.paww.models.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DogRepository extends JpaRepository<Dog, UUID> {
    @Query("SELECT DISTINCT d.address.state FROM Dog d WHERE d.address.state IS NOT NULL")
    List<String> findDistinctStates();

    @Query("SELECT DISTINCT d.address.city FROM Dog d WHERE d.address.state = :state AND d.address.city IS NOT NULL")
    List<String> findDistinctCitiesByState(@Param("state") String state);

    @Query("SELECT DISTINCT d.address.locality FROM Dog d WHERE d.address.state = :state AND d.address.city = :city AND d.address.locality IS NOT NULL")
    List<String> findDistinctLocalitiesByStateAndCity(@Param("state") String state, @Param("city") String city);

    @Query("SELECT DISTINCT d.address.street FROM Dog d WHERE d.address.state = :state AND d.address.city = :city AND d.address.locality = :locality AND d.address.street IS NOT NULL")
    List<String> findDistinctStreetsByStateAndCityAndLocality(
            @Param("state") String state,
            @Param("city") String city,
            @Param("locality") String locality
    );
}
