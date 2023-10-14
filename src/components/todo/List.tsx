import React, {useState} from "react";
import {TodoItemData, TodoListData} from "../../models/todo";
import styled from "styled-components";
import TodoItem from "./Item";
import Form, {FormData} from "./Form";

const AppTitle = styled.h5<{ $bgColor?: string }>`
  margin: 0;
  padding: 0.2rem 0.5rem;
  color: white;
  background-color: ${props => props.$bgColor || "#000"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
`;


const TodoListContainer = styled.ul`

`;

const DeleteButton = styled.button`
  padding: 0.3rem;
  border-radius: 3px;
  border: 0;
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
    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([])


    const handleAddItem = (form: FormData) => {
        const newItem: TodoItemData = {
            id: Date.now(),
            text: form?.text,
            done: false
        };
        onAddItem?.(newItem)
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
        <AppTitle onClick={() => onSelectList(list?.id)} $bgColor={list?.color}>
            <p>LIST: {list?.name}</p>
            <DeleteButton onClick={handleDeleteList}>x</DeleteButton>
        </AppTitle>
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
            <Form title={"Create a new item"} onSubmit={handleAddItem}/>
        </div>}
    </>
}