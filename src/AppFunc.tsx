import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {TodoItemData, TodoListData} from "./models/todo";
import TodoList from "./components/todo/List";
import {randomMaterialColor} from "./utils/color";
import Form, {FormData} from "./components/todo/Form";
import {AppButton, Divider} from "./components/common/misc";

const DB_KEY = "TodoApp.v1.1.Lists"


const AppContainer = styled.div`
  margin: auto;
  max-width: 300px;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  --main-focus: #2d8cf0;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 20px 20px;
  gap: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
`

/**
 * In this application, the logic isn't overly complex.
 * Currently, callbacks are passed to children via inheritance.
 * However, if the children require frequent interaction with props,
 * we could consider implementing "context and reducer" logic.
 */
function TodoApp() {
    const [activeListId, setActiveListId] = useState<number | null>(null)
    const [lists, setLists] = useState<TodoListData[]>([])

    useEffect(() => {
        // Get From DB
        if (lists.length === 0) setLists(JSON.parse(localStorage.getItem(DB_KEY) || "[]"))
    }, []);

    useEffect(() => {
        // Save to the DB
        if (lists.length !== 0) localStorage.setItem(DB_KEY, JSON.stringify(lists));
    }, [lists]);


    const clearDB = () => {
        localStorage.removeItem(DB_KEY);
        setLists([])
    }

    // Handles collapsing
    const handleSelectList = (listId: number) => setActiveListId(listId === activeListId ? null : listId)

    const handleAddList = (form: FormData) => {
        const newList: TodoListData = {
            id: Date.now(),
            name: form?.text,
            items: [],
            color: randomMaterialColor()
        };

        setLists((prevLists) => [...prevLists, newList]);
    };

    const handleDeleteList = (listId: number) => {
        setLists(prevLists => prevLists?.filter(list => list?.id !== listId));
    };

    const handleItemCompleted = (itemId: number) => {
        setLists(prevLists => prevLists?.map(list => {
            if (list?.id === activeListId) return {
                ...list,
                items: list?.items?.map(item => item?.id === itemId ? {...item, done: !item?.done} : item)
            }
            return list
        }));
    };


    const handleAddItem = (newItem: TodoItemData) => {
        setLists(prevLists => prevLists?.map(list => {
            if (list?.id === activeListId) return {
                ...list,
                items: [...list?.items, newItem]
            }
            return list
        }));
    };


    const handleDeleteItem = (itemIds: number[]) => {
        setLists(prevLists => prevLists?.map(list => {
            if (list?.id === activeListId) return {
                ...list,
                items: list?.items?.filter(item => !itemIds.includes(item?.id))
            }
            return list
        }));
    };


    return <AppContainer>
        <h3>BIMM Todo App</h3>
        {lists.map(list =>
            <TodoList
                key={list?.id}
                list={list}
                active={list?.id === activeListId}
                onSelectList={handleSelectList}
                onDeleteList={handleDeleteList}
                onDeleteItem={handleDeleteItem}
                onAddItem={handleAddItem}
                onItemCompleted={handleItemCompleted}
            />)}

        {lists?.length > 0 && <Divider/>}
        {!activeListId && <>
            <Form title={"Create a new list"} onSubmit={handleAddList}/>
        </>}
        {lists?.length > 0 && <>
            <Divider/>
            <AppButton onClick={clearDB}>Clear All / Start Again</AppButton>
        </>}
    </AppContainer>
}


export default TodoApp;
