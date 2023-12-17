package com.example.rentz.data.domain;

import com.example.rentz.data.ItemType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ITEMS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    //TODO remove
    @NotBlank
    private boolean availableNow;

    @NotBlank
    private Double pricePerDay;

    @NotBlank
    private ItemType itemType;

    @NotBlank
    @Lob
    private byte[] picture1Base64;

    @NotBlank
    @Lob
    private byte[] picture2Base64;

    @NotBlank
    @Lob
    private byte[] picture3Base64;


    @NotBlank
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    //@MapsId("owner_id")
    private User owner;

    @JsonIgnore
    @OneToMany(mappedBy = "item",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations;

    @ElementCollection
    private List<LocalDate> reservationDates = new ArrayList<>();
}
