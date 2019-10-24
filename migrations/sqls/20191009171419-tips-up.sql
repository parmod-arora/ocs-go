CREATE TABLE tips (
    "id" bigserial,
    "item_key" text,
    "item_tips" text,
    PRIMARY KEY ("id")
);

insert into tips("item_key", "item_tips") values('key1', 'tip1' );
insert into tips("item_key", "item_tips") values('key2', 'tip2' );