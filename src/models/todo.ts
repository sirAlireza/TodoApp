/**
 * The models related to Todo app is placed here, Currently,
 * we don't have any specific logic related to the todo item
 * or todo list but if the business logic increases, we can
 * covert the interfaced to classes to encapsulate internal
 * logic and prevent having the complex functions in the components.
 */

export interface TodoItemData {
    id: number;
    text: string;
    done: boolean;
}

export interface TodoListData {
    id: number;
    name: string;
    items: TodoItemData[];
    color: string
}
