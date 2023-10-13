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

    const itemClass = "form-check todoitem " + (item?.done ? "done" : "undone");

    const handleItemSelected = () => onItemSelected?.(item?.id)
    return (
        <li className={itemClass} ref={listItemRef}>
            <label className="form-check-label">
                <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleItemSelected}
                />{" "}
                Complete?
                <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={markCompleted}
                />{" "}
                {item?.text}
            </label>
            <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={deleteItem}
            >
                x
            </button>
        </li>
    );
}