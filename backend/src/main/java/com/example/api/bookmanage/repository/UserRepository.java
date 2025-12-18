package com.example.api.bookmanage.repository;

import com.example.api.bookmanage.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {
    // 아이디 조회
    Optional<User> findByLoginId(String loginId);
}
