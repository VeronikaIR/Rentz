package com.example.rentz.data.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "USERS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    //TODO unique = true not working
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank
    private String personalInformation;

    //TODO add profilePictureId later
//    @NotBlank
//    private Long profilePictureId;

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private List<Item> itemsForRent = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "reservedBy")
    private List<Reservation> reservations = new ArrayList<>();


//    @JsonIgnore
//    @OneToMany(mappedBy = "rentedBy")
//    private List<Item> itemsForRent = new ArrayList<>();


}
