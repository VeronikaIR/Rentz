package com.example.rentz.data.repository;

import com.example.rentz.data.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
