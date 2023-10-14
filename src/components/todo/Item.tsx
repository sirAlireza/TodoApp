import React, {useEffect, useRef} from "react";
import {TodoItemData} from "../../models/todo";


interface TodoItemProps {
    item: TodoItemData,
    onItemSelected: (itemId: number) => void;
    onItemCompleted: (itemId: number) => void;
    onItemDeleted: (itemId: number[]) => void;
}

export default function TodoItem({
                                     item,
                                     onItemCompleted,
                                     onItemSelected,
                                     onItemDeleted
                                 }: TodoItemProps) {
    const listItemRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (listItemRef.current) {
            listItemRef.current.classList.add("highlight");

            setTimeout(() => {
                if (listItemRef.current) {
                    listItemRef.current.classList.remove("highlight");
                }
            }, 500);
        }
    }, []);

    const markCompleted = () => onItemCompleted(item?.id);
    const deleteItem = () => onItemDeleted([item?.id]);


    const handleItemSelected = () => onItemSelected?.(item?.id)
    return (
        <li ref={listItemRef}>
            <label>
                <input
                    type="checkbox"
                    onChange={handleItemSelected}
                />{" "}
                Complete?
                <input
                    type="checkbox"
                    onChange={markCompleted}
                />{" "}
                {item?.text}
            </label>
            <button
                type="button"
                onClick={deleteItem}
            >
                x
            </button>
        </li>
    );
}