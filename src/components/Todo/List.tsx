import React, {useState} from "react";
import {TodoItemData, TodoListData} from "../../models/todo";
import styled from "styled-components";
import TodoItem from "./Item";

const AppTitle = styled.h3`
  margin: 1rem 0;
  color: #ff2968;
`;


const TodoListContainer = styled.ul`
  padding-left: 0;

  .todoitem {
    position: relative;
    margin-bottom: 0.25rem;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    border-top: 1px solid #ccc;

    &.done {
      .form-check-label {
        color: #999;
        text-decoration: line-through;
      }
    }

    &.highlight {
      border-color: #ff2968;
      background-color: #ff8fb0;

      &:last-child {
        border-color: #ff2968;
      }
    }

    &:last-child {
      border-bottom: 1px solid #ccc;
    }

    .btn-danger {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }

    .form-check-label {
      width: 100%;

      .form-check-input {
        margin-right: 1rem;
      }
    }
  }
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
`

interface TodoListProps {
    active: boolean,
    list: TodoListData,
    onSelectList: (listId: number) => void
    onDeleteList: (listId: number) => void
    onAddItem: (item: TodoItemData) => void
    onItemCompleted: (itemId: number) => void
    onDeleteItem: (itemId: number[]) => void
}

export default function TodoList({
                                     list, active,
                                     onSelectList,
                                     onDeleteList,
                                     onAddItem,
                                     onDeleteItem,
                                     onItemCompleted,
                                 }: TodoListProps) {
    const items = list?.items
    const [text, setText] = useState<string>("");
    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([])
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleAddItem = (event: React.FormEvent) => {
        event.preventDefault();
        const newItem: TodoItemData = {
            id: Date.now(),
            text: text,
            done: false
        };
        onAddItem?.(newItem)
        setText("")
    };

    const handleItemSelected = (itemId: number) => {
        if (selectedItemIds.includes(itemId))
            setSelectedItemIds(prev => prev.filter(id => id !== itemId))
        else setSelectedItemIds(prev => [...prev, itemId])
    }

    console.log({selectedItemIds})
    const handleDeleteList = () => onDeleteList?.(list?.id)
    const handleDeleteSelectedItems = () => onDeleteItem?.(selectedItemIds)

    return <>
        <span onClick={() => onSelectList(list?.id)}>
            <AppTitle>LIST: {list?.name}
                <button onClick={handleDeleteList}>x</button>
            </AppTitle>
        </span>
        {active && <div>
            <div>
                <div>
                    <TodoListContainer>
                        <button onClick={handleDeleteSelectedItems}>Delete Selected Items</button>
                        {items.map((item) => (
                            <TodoItem
                                key={item?.id}
                                item={item}
                                onItemCompleted={onItemCompleted}
                                onItemSelected={handleItemSelected}
                                onItemDeleted={onDeleteItem}
                            />
                        ))}
                    </TodoListContainer>
                </div>
            </div>
            <form>
                <div>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleTextChange}
                        value={text}
                    />
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={handleAddItem}
                        disabled={!text}
                    >
                        {"Add #" + (items.length + 1)}
                    </button>
                </div>
            </form>
        </div>}
    </>
}