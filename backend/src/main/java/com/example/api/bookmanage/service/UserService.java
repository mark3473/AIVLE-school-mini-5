package com.example.api.bookmanage.service;

import com.example.api.bookmanage.domain.User;
import com.example.api.bookmanage.dto.UserDTO;
import com.example.api.bookmanage.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    public UserDTO.Response registerUser(UserDTO.Request request) {

        String loginId = request.getLoginId();
        String password = request.getPassword();

        if (userRepository.findByLoginId(loginId).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        if (password.length() < 8) {
            throw new IllegalArgumentException("비밀번호는 최소 8글자 이상이어야 합니다.");
        }

        User user = new User();
        user.setLoginId(loginId);
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);

        return new UserDTO.Response(user.getLoginId(), "Created Successfully");
    }

    // 로그인
    public UserDTO.Response login(UserDTO.Request request) {

        String loginId = request.getLoginId();
        String password = request.getPassword();

        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(password,user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }

        System.out.println("입력 패스워드: " + password);
        System.out.println("DB 암호화 패스워드: " + user.getPassword());
        System.out.println("matches 결과: " + passwordEncoder.matches(password, user.getPassword()));


        return new UserDTO.Response(user.getLoginId(), "Login Successful");
    }

    // 비밀번호 변경
    public UserDTO.Response updatePassword(String loginId, UserDTO.PasswordUpdateRequest request) {

        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(request.getOldPassword(),user.getPassword())) {
            throw new IllegalArgumentException("기존 비밀번호가 맞지 않습니다.");
        }

        // 새 비밀번호 유효성 검사
        if (request.getNewPassword().length() < 8) {
            throw new IllegalArgumentException("비밀번호는 최소 8글자 이상이어야 합니다.");
        }

        // 새 비밀번호 저장
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        return new UserDTO.Response(user.getLoginId(), "Updated Successfully");
    }
}