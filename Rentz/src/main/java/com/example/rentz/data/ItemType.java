package com.example.rentz.data;

public enum ItemType {
    FITNESS("Fitness"),
    BOOKS("Books"),
    DEVICES("Devices"),
    HOME("Home"),
    HOBBIES("Hobbies");

    private final String displayName;

    ItemType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
