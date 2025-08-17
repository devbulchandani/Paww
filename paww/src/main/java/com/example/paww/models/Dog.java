package com.example.paww.models;

import com.example.paww.enums.Gender;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

import java.time.Instant;
import java.util.UUID;

@Entity @Table(name = "dogs")
@Data
public class Dog {
    @Id @GeneratedValue @UuidGenerator
    private UUID id;

    private String name;
    @Column(length = 1000)
    private String description;
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Embedded
    private Address address;

    private Boolean vaccinatedStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    private User registeredBy;

    private String imageUrl;

    private Instant createdAt;

    @PrePersist
    void onCreate(){
        if(createdAt==null) createdAt = Instant.now();
    }


}
