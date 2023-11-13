package com.example.rentz.rest;

import com.example.rentz.data.domain.User;
import com.example.rentz.dto.request.UserCreateDto;
import com.example.rentz.dto.response.UserDetailedDto;
import com.example.rentz.exception.ResourceNotFoundException;
import com.example.rentz.mapper.UserMapper;
import com.example.rentz.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/users", produces = APPLICATION_JSON_VALUE)
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
    public ResponseEntity<UserDetailedDto> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return ResponseEntity.ok(this.userMapper.toUserDetailedDto(user));
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDetailedDto> createUser(@RequestBody UserCreateDto userCreateDto) {

        User createdUser = userService.createUser(this.userMapper.toUser(userCreateDto));

        return ResponseEntity.ok(this.userMapper.toUserDetailedDto(createdUser));
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody UserDetailedDto userDetailedDto) {

        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        this.userMapper.updateUser(user, userDetailedDto);

        userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userService.deleteUser(user);
    }
}
