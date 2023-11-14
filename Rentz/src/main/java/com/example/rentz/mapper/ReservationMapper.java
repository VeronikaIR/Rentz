package com.example.rentz.mapper;

import com.example.rentz.data.domain.Item;
import com.example.rentz.data.domain.Reservation;
import com.example.rentz.dto.request.ItemCreateDto;
import com.example.rentz.dto.request.ReservationCreateDto;
import com.example.rentz.dto.response.ItemDto;
import com.example.rentz.dto.response.ReservationDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper
public interface ReservationMapper {

    Reservation toReservation(ReservationCreateDto reservationCreateDto);


    @Mapping(target = "itemId", source = "item.id")
    @Mapping(target = "ownerId", source = "owner.id")
    ReservationDto toReservationDto(Reservation reservation);
}
