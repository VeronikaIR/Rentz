package com.example.rentz.mapper;


import com.example.rentz.data.domain.Item;
import com.example.rentz.data.domain.User;
import com.example.rentz.dto.request.ItemCreateDto;
import com.example.rentz.dto.response.ItemDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface ItemMapper {

    @Mapping(target = "reservations", source = "cc")
    @Mapping(target = "owner", source = "cc")
    @Mapping(target = "id", source = "cc")
    Item toItem(ItemCreateDto itemCreateDto);

    @Mapping(target = "rentedById", source = "rentedBy.id")
    @Mapping(target = "ownerId", source = "owner.id")
    ItemDto toItemDto(Item item, User owner, User... rentedBy);

    @Mapping(target = "reservations", source = "cc")
    @Mapping(target = "owner", source = "cc")
    @Mapping(target = "id", source = "cc")
    void updateItem(@MappingTarget Item item, ItemCreateDto itemCreateDto);
}
