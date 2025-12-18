package com.example.api.bookmanage.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class UserDTO {

    // 요청용 DTO (회원가입, 로그인)
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {

        @NotBlank(message = "아이디는 필수 입력 값입니다.")
        @Size(min = 1, max = 20, message = "아이디는 45자 이하여야 합니다.")
        private String loginId;

        @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
        @Size(min = 8, max = 20, message = "비밀번호는 최소 8글자 이상이어야 합니다.")
        private String password;
    }

    // 응답용 DTO (회원가입, 로그인)
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private String loginId;     // 회원가입/로그인 시 반환
        private String message;  // 회원가입/수정 시 상태 메시지
    }

    // 비밀번호 수정 요청
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PasswordUpdateRequest{

        @NotBlank
        private String loginId;

        @NotBlank
        private String oldPassword;

        @NotBlank
        @Size(min = 8, max = 20, message = "비밀번호는 최소 8글자 이상이어야 합니다.")
        private String newPassword;
    }
}