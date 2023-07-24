import { Alert, Box, Divider, List, Paper, TextField, Typography } from "@mui/material";
import AddNewTodoItem from "./AddNewTodoItem";
import { useState } from "react";
import TodoItem from "./TodoItem";


export interface TodoItemData {
    id: string,
    createdAt: Date,
    done: boolean,
    text: string,
}

interface Props {
    initialData: TodoItemData[]
}

export default function TodoList({ initialData }: Props) {

    const [todoItems, setTodoItems] = useState<TodoItemData[]>(initialData ?? []);
    const [searchStr, setSearchStr] = useState<string>('');

    const handleAddNewTodoItem = (text: string) => {
        const date = new Date();
        const newTodoItems = [
            { id: Number(date) + text, createdAt: date, done: false, text },
            ...todoItems
        ];
        setTodoItems(newTodoItems);
    }

    const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(e.target.value);
    }

    const handleItemStatusChange = (targetId: string, checked: boolean) => {
        const newTodoItems = todoItems
            .map((item) => {
                const { id, done, ...rest } = item;
                return targetId === id ? { id, done: !done, ...rest } : item;  // toggle done state of the todo item
            })
            .sort((a, b) => {
                // sort by done state
                if (a.done && !b.done)
                    return 1;
                else if (!a.done && b.done)
                    return -1;
                // sort by date 
                // because array.sort is not stable sort, so item order may not be preserved
                return b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds();
            })
        setTodoItems(newTodoItems);
    }

    const handleItemTextChange = (targetId: string, targetText: string) => {
        const newTodoItems = todoItems
            .map((item): TodoItemData => {
                const { id, text, ...rest } = item;
                if (id === targetId)
                    return { id, text: targetText, ...rest };
                return item;
            })
        setTodoItems(newTodoItems);
    }

    const getFilteredTodoItems = () => {
        if (searchStr === '')
            return todoItems;
        return todoItems.filter((item) => {
            const { text } = item;
            return text.toLowerCase().includes(searchStr.toLowerCase());
        })
    }


    const handleItemDelete = (targetId: string) => {
        const newTodoItems = todoItems.filter(({ id }) => (id !== targetId));
        setTodoItems(newTodoItems);
    }

    const needDivider = (idx: number): boolean => {
        if (idx >= 1 && todoItems[idx].done && !todoItems[idx - 1].done)
            return true;
        return false;
    }

    const filteredtodoItems = getFilteredTodoItems();

    return (
        <>
            <Paper sx={{ py: '1em' }}>
                <Typography variant='h4' textAlign='center'>
                    Todo List
                </Typography>
                <Box sx={{ mx: '1em', mt: '1em' }}>
                    <TextField fullWidth label='Search' onChange={handleSearchFieldChange} />
                </Box>
                <List dense>
                    <AddNewTodoItem onFinish={handleAddNewTodoItem} />
                    {
                        filteredtodoItems.length === 0 ? (
                            <Alert severity="info" sx={{ mx: '1em' }}>Aucun élément à afficher.</Alert>
                        ) :
                            (filteredtodoItems.map(({ id, done, text }, idx) => (
                                <div key={id}>
                                    {needDivider(idx) && <Divider orientation='horizontal' />}
                                    <TodoItem done={done} text={text} id={id}
                                        onStatusChange={handleItemStatusChange}
                                        onTextChange={handleItemTextChange}
                                        onDelete={handleItemDelete} />
                                </div>
                            )))
                    }
                </List>
            </Paper>
        </>
    );
}