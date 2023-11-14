package com.example.rentz.mapper;


import com.example.rentz.data.domain.Item;
import com.example.rentz.dto.request.ItemCreateDto;
import com.example.rentz.dto.response.ItemDto;
import com.example.rentz.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface ItemMapper {


//    @Mapping(target = "reservation", source = "")
//    @Mapping(target = "id", source = "")
    Item toItem(ItemCreateDto itemCreateDto);


    //@Mapping(target = "reservationId", source = "reservation.id")
    @Mapping(target = "ownerId", source ="owner.id")
    ItemDto toItemDto(Item item);

//    @Mapping(target = "reservation", source = "")
//    @Mapping(target = "owner", source = "")
//    @Mapping(target = "id", source = "")
//    void updateItem(@MappingTarget Item item, ItemCreateDto itemCreateDto);
}



