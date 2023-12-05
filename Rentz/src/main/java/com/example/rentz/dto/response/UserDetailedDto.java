package com.example.rentz.dto.response;

import lombok.*;

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

    private String fireBaseId;
}
