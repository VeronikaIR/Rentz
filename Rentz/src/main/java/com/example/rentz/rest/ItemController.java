package com.example.rentz.rest;

import com.example.rentz.data.ItemType;
import com.example.rentz.data.domain.Item;
import com.example.rentz.dto.request.ItemCreateDto;
import com.example.rentz.dto.response.ItemDto;
import com.example.rentz.exception.ResourceNotFoundException;
import com.example.rentz.mapper.ItemMapper;
import com.example.rentz.service.ItemService;
import com.example.rentz.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemMapper itemMapper;

    private final ItemService itemService;
    private final UserService userService;


    public ItemController(ItemMapper itemMapper, ItemService itemService, UserService userService) {
        this.itemMapper = itemMapper;
        this.itemService = itemService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<ItemDto>> getAllItems() {

        List<ItemDto> itemDtoList = new ArrayList<>();
        itemService.getAllItems().forEach(item -> {
            List<LocalDate> reservationDates = new ArrayList<>();
            item.getReservations().forEach(reservation -> {
                LocalDate startDate = reservation.getBookedOn();
                LocalDate endDate = reservation.getBookedUntil();
                List<LocalDate> dates = startDate.datesUntil(endDate)
                        .toList();
                reservationDates.addAll(dates);
                reservationDates.add(endDate);
                Collections.sort(reservationDates);
            });
            item.setReservationDates(reservationDates);

            itemDtoList.add(itemMapper.toItemDto(item));
        });

        return ResponseEntity.ok(itemDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable Long id) {

        Item item = itemService.getItemById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        return ResponseEntity.ok(this.itemMapper.toItemDto(item));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ItemDto>> getItemsByCategory(@RequestParam ItemType type) {

        List<ItemDto> itemDtoList = new ArrayList<>();
        itemService.getItemsByItemType(type).forEach(item -> {
            itemDtoList.add(itemMapper.toItemDto(item));
        });

        return ResponseEntity.ok(itemDtoList);
    }

    @PostMapping(path = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Item> createItem(@ModelAttribute ItemCreateDto itemCreateDto) throws IOException {


        //1.TODO get user from the context
        //2. Convert pictures to base64 format

//        User user = userService.getUserById(itemCreateDto.getOwnerId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
////        itemCreateDto.setAvailableNow(true);
//        Item item = itemMapper.toItem(itemCreateDto);
//        item.setOwner(user);
//        Item createdItem = itemService.createItem(item);


        return new ResponseEntity<>(itemService.createItem(itemCreateDto), HttpStatus.CREATED);
    }

//    @PutMapping("/{id}")
//    public void editItem(@PathVariable Long id, @Valid @RequestBody ItemCreateDto itemCreateDto) {
//
//        Item item = itemService.getItemById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
//
//        this.itemMapper.updateItem(item, itemCreateDto);
//        itemService.editItem(item);
//    }

    @DeleteMapping("/{id}")
    public void deleteItemById(@PathVariable Long id) {

        Item item = itemService.getItemById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        itemService.deleteItem(item);
    }
}
