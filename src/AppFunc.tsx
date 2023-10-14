import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {TodoItemData, TodoListData} from "./models/todo";
import TodoList from "./components/Todo/List";
import {generateColor} from "./utils/color";

const DB_KEY = "TodoApp.v1.1.Lists"


const AppContainer = styled.div`
  margin: auto;
  max-width: 400px;
`

/**
 * In this application, the logic isn't overly complex.
 * Currently, callbacks are passed to children via inheritance.
 * However, if the children require frequent interaction with props,
 * we could consider implementing "context and reducer" logic.
 */
function TodoApp() {
    const [name, setName] = useState<string>("");
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
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleAddList = (event: React.FormEvent) => {
        event.preventDefault();

        const newList: TodoListData = {
            id: Date.now(),
            name: name,
            items: [],
            color: generateColor()
        };

        setLists((prevLists) => [...prevLists, newList]);
        setName("");
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
        <h3>Todo APP </h3>
        <button onClick={clearDB}>clear db</button>
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

        <h3>Create new list</h3>
        <form>
            <div>
                <input
                    type="text"
                    onChange={handleTextChange}
                    value={name}
                />
            </div>
            <div>
                <button
                    onClick={handleAddList}
                    disabled={!name}
                >
                    {"Add #" + (lists.length + 1)}
                </button>
            </div>
        </form>
    </AppContainer>
}


export default TodoApp;
