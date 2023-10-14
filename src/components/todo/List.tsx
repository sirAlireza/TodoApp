import React, {useEffect, useState} from "react";
import {TodoItemData, TodoListData} from "../../models/todo";
import styled from "styled-components";
import TodoItem from "./Item";
import Form, {FormData} from "./Form";
import {AppButton, Divider} from "../common/misc";

const AppTitle = styled.h5<{ $bgColor?: string, $active: boolean }>`
  margin: 0;
  padding: 0.2rem 0.5rem;
  color: black;
  opacity: ${props => props?.$active ? 1 : 0.4};
  background-color: ${props => props.$bgColor || "#000"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: 2px solid black;
  gap: 0 0.5rem;
  & p {
    overflow: hidden;
    font-weight: Bold;
    font-size: 16px;
    background-color: white;
    border-radius: 5px;
    padding: .2rem .5rem;
    word-break: break-all;
    pointer-events: auto;
    cursor: pointer;
  }
`;

const TodoItemsContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  & button {
    margin: 0.3rem 0;
  }
`
const NoItemMessageContainer = styled.div`
  text-align: center;
  margin: 0.6rem 0;

  & span {
    padding: .3rem 1rem;
    background-color: black;
    color: white;
    border-radius: 5px;
  }
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

    useEffect(() => {
        setSelectedItemIds([])
    }, [active])

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

    const handleDeleteList = () => onDeleteList?.(list?.id)
    const handleDeleteSelectedItems = () => {
        onDeleteItem?.(selectedItemIds)
        setSelectedItemIds([])
    }
    return <>
        <AppTitle $active={active} $bgColor={list?.color}>
            <p onClick={() => onSelectList(list?.id)}>
                <span>{!active ? " + " : " - "}</span>
                {list?.name} {list?.items?.length === 0 ? "(0)" : `(${list?.items?.filter(i => i?.done)?.length}/${list?.items?.length})`}
            </p>

            <AppButton $fontSize={"10px"} onClick={handleDeleteList}>❌</AppButton>
        </AppTitle>
        {active && <div>
            <TodoItemsContainer>
                {selectedItemIds.length > 0 &&
                    <AppButton onClick={handleDeleteSelectedItems}>Delete Selected Items</AppButton>}
                {items.map((item) => (
                    <TodoItem
                        key={item?.id}
                        item={item}
                        onItemCompleted={onItemCompleted}
                        onItemSelected={handleItemSelected}
                        onItemDeleted={onDeleteItem}
                    />
                ))}
                {items?.length === 0 &&
                    <NoItemMessageContainer>
                        <span>There is not task inside this list!</span>
                    </NoItemMessageContainer>
                }
            </TodoItemsContainer>
            <Form title={"Add a item to the list"} onSubmit={handleAddItem}/>
        </div>}
        {active && <Divider/>}
    </>
}