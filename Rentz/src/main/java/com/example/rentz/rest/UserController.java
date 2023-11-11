package com.example.rentz.rest;

import com.example.rentz.data.domain.User;
import com.example.rentz.dto.response.UserDetailedDto;
import com.example.rentz.exception.ResourceNotFoundException;
import com.example.rentz.mapper.UserMapper;
import com.example.rentz.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;

    public UserController(UserMapper userMapper, UserService userService) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDetailedDto>> getAllUsers() {
        List<UserDetailedDto> userDetailedDtos = new ArrayList<>();
        userService.getAllUsers().forEach(item -> {
            userDetailedDtos.add(userMapper.toUserDetailedDto(item));
        });

        return ResponseEntity.ok(userDetailedDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailedDto> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return ResponseEntity.ok(this.userMapper.toUserDetailedDto(user));
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable String id, @RequestBody UserDetailedDto  userDetailedDto) {

        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        this.userMapper.updateUser(user, userDetailedDto);

        userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable String id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userService.deleteUser(user);
    }
}
