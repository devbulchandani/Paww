package com.example.paww.dto;

import lombok.Data;

@Data
public class TokenDto {
    private String token; // mock token for MVP
    private String userId;
    public TokenDto(String token, String userId){ this.token = token; this.userId = userId; }
}