package com.example.api.bookmanage.controller;

import com.example.api.bookmanage.dto.UserDTO;
import com.example.api.bookmanage.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/users")
    public ResponseEntity<UserDTO.Response> registerUser(
            @RequestBody @Valid UserDTO.Request request) {

        UserDTO.Response response = userService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    // 로그인
    @PostMapping("/auth/login")
    public ResponseEntity<UserDTO.Response> login(
            @RequestBody @Valid UserDTO.Request request) {

        UserDTO.Response response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    // 비밀번호 변경
    @PutMapping("/users/{loginId}")
    public ResponseEntity<UserDTO.Response> updatePassword(
            @PathVariable String loginId,
            @RequestBody @Valid UserDTO.PasswordUpdateRequest request) {

        UserDTO.Response response = userService.updatePassword(loginId, request);
        return ResponseEntity.ok(response);
    }
}