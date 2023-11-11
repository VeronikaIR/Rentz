package com.example.rentz.mapper;

import com.example.rentz.data.domain.User;
import com.example.rentz.dto.request.UserCreateDto;
import com.example.rentz.dto.response.UserDetailedDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper
public interface UserMapper {

   User toUser(UserCreateDto userCreateDto);

   UserDetailedDto toUserDetailedDto(User user);

    void updateUser(@MappingTarget User user, UserDetailedDto userDetailedDto);

}
