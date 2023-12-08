package com.example.rentz.dto.response;

import com.example.rentz.data.domain.Item;
import com.example.rentz.data.domain.Reservation;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailedDto {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String town;
    private String personalInformation;
    private List<Item> itemsForRent;
    private List<Reservation> reservations;

    private String fireBaseId;
}
