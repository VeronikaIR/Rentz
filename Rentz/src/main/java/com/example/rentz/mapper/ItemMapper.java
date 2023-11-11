package com.example.rentz.mapper;


import com.example.rentz.data.domain.Item;
import com.example.rentz.dto.request.ItemCreateDto;
import com.example.rentz.dto.response.ItemDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper
public interface ItemMapper {

    Item toItem(ItemCreateDto itemCreateDto);

    ItemDto toItemDto(Item item);

    void updateItem(@MappingTarget Item item, ItemCreateDto itemCreateDto);
}
