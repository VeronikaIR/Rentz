package com.example.rentz.rest;

import com.example.rentz.data.domain.CustomUserDetails;
import com.example.rentz.data.domain.User;
import com.example.rentz.dto.request.UserCreateDto;
import com.example.rentz.dto.response.UserDetailedDto;
import com.example.rentz.exception.ResourceNotFoundException;
import com.example.rentz.mapper.UserMapper;
import com.example.rentz.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/info")
    public ResponseEntity<UserDetailedDto> getUserInfo(OAuth2User oAuth2User) {
        User user = userService.getUserById(oAuth2User.getAttribute("id"))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return ResponseEntity.ok(this.userMapper.toUserDetailedDto(user));
    }

    @GetMapping("/social-login")
    public ResponseEntity<UserDetailedDto> socialLogin() {

        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userService.getFireBaseId(userDetails.getUid());

        if (user.isPresent()) {
            return ResponseEntity.ok(this.userMapper.toUserDetailedDto(user.get()));
        }
        User userToCreate = new User();
        userToCreate.setName(userDetails.getName());
        userToCreate.setEmail(userDetails.getEmail());
        userToCreate.setFireBaseId(userDetails.getUid());

        User createdUser = userService.createUser(userToCreate);

        return new ResponseEntity<>(this.userMapper.toUserDetailedDto(createdUser), HttpStatus.CREATED);
    }


    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDetailedDto> createUser(@RequestBody UserCreateDto userCreateDto) {

        User createdUser = userService.createUser(this.userMapper.toUser(userCreateDto));

        return ResponseEntity.ok(this.userMapper.toUserDetailedDto(createdUser));
    }

//    @PutMapping("/{id}")
//    public void updateUser(@PathVariable Long id, @RequestBody UserDetailedDto userDetailedDto) {
//
//        User user = userService.getUserById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//        this.userMapper.updateUser(user, userDetailedDto);
//
//        userService.updateUser(user);
//    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userService.deleteUser(user);
    }
}
