import React, {useEffect, useRef} from "react";
import {TodoItemData} from "../../models/todo";
import styled from "styled-components";
import {AppButton, Divider} from "../common/misc";


interface TodoItemProps {
    item: TodoItemData,
    onItemSelected: (itemId: number) => void;
    onItemCompleted: (itemId: number) => void;
    onItemDeleted: (itemId: number[]) => void;
}

const ItemContainer = styled.div<{ $done?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
  opacity: ${props => props?.$done ? .4 : 1 || 1};
  gap: 1rem;
  border: 1px solid;
  padding: 0 .5rem;
  margin: .2rem 0;
  border-radius: 5px;
`
const ItemLeftSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  word-break: break-all;
  gap: 1rem;
`
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .1rem;
`
export default function TodoItem({
                                     item,
                                     onItemCompleted,
                                     onItemSelected,
                                     onItemDeleted
                                 }: TodoItemProps) {
    const markCompleted = () => onItemCompleted(item?.id);
    const deleteItem = () => onItemDeleted([item?.id]);


    const handleItemSelected = () => onItemSelected?.(item?.id)
    return <div>
        <ItemContainer $done={item?.done}>
            <ItemLeftSection>
                <input
                    type="checkbox"
                    onChange={handleItemSelected}
                />{" "}
                <span style={{textDecoration: !item?.done ? "none" : "line-through"}}>{item?.text}</span>
            </ItemLeftSection>
            <ButtonsContainer>
                <AppButton $fontSize={"10px"} type="button"
                           onClick={markCompleted}>{!item?.done ? "✅" : "❎"}</AppButton>
                <AppButton $fontSize={"10px"} type="button" onClick={deleteItem}>❌</AppButton>
            </ButtonsContainer>
        </ItemContainer>
    </div>

}