import React, {useState} from "react";
import {TodoItemData, TodoListData} from "../../models/todo";
import styled from "styled-components";
import TodoItem from "./Item";
import Form, {FormData} from "./Form";
import {AppButton, Divider} from "../common/misc";

const AppTitle = styled.h5<{ $bgColor?: string }>`
  margin: 0;
  padding: 0.2rem 0.5rem;
  color: black;
  background-color: ${props => props.$bgColor || "#000"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: 2px solid black;

  & p {
    overflow: hidden;
    font-weight: Bold;
    background-color: white;
    border-radius: 5px;
    padding: .2rem .5rem;
  }
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
            <p>{list?.name}</p>
            <AppButton onClick={handleDeleteList}>x</AppButton>
        </AppTitle>
        {active && <div>
            <div>
                <div>
                    <TodoListContainer>
                        {selectedItemIds.length > 0 &&
                            <button onClick={handleDeleteSelectedItems}>Delete Selected Items</button>}
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
            <Form title={"Add a item to the list"} onSubmit={handleAddItem}/>
        </div>}
        {active && <Divider/>}
    </>
}