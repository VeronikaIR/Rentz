package com.example.rentz.rest;

import com.example.rentz.data.domain.Item;
import com.example.rentz.dto.request.ItemCreateDto;
import com.example.rentz.dto.response.ItemDto;
import com.example.rentz.exception.ResourceNotFoundException;
import com.example.rentz.mapper.ItemMapper;
import com.example.rentz.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemMapper itemMapper;

    private final ItemService itemService;


    public ItemController(ItemMapper itemMapper, ItemService itemService) {
        this.itemMapper = itemMapper;
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<ItemDto>> getAllItems() {

        List<ItemDto> itemDtoList = new ArrayList<>();
        itemService.getAllItems().forEach(item -> {
            itemDtoList.add(itemMapper.toItemDto(item));
        });

        return ResponseEntity.ok(itemDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable String id) {

        Item item = itemService.getItemById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));


        return ResponseEntity.ok(this.itemMapper.toItemDto(item));
    }

    @PostMapping
    public ResponseEntity<ItemDto> createItem(@RequestBody ItemCreateDto itemCreateDto) {

        Item item = itemMapper.toItem(itemCreateDto);

        Item createdItem = itemService.createItem(item);

        return new ResponseEntity<>(this.itemMapper.toItemDto(createdItem), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public void editItem(@PathVariable String id, @Valid @RequestBody ItemCreateDto itemCreateDto) {

        Item item = itemService.getItemById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        this.itemMapper.updateItem(item, itemCreateDto);
        itemService.editItem(item);
    }

    @DeleteMapping("/{id}")
    public void deleteItemById(@PathVariable String id) {

        Item item = itemService.getItemById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        itemService.deleteItem(item);
    }
}
