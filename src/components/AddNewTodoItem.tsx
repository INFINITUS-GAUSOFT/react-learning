import { IconButton, InputBase, ListItem, ListItemIcon } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

interface Props {
    onFinish: (text: string) => any
}

export default function AddNewTodoItem({ onFinish }: Props) {

    const [text, setText] = useState('');

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value === undefined)
            return;
        setText(e.target.value)
    }

    const handleTextKeyDown = (
        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleAddButtonClicked();
        }
    }

    function handleAddButtonClicked() {
        onFinish(text);
        setText('');
    }

    return (
        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
                <IconButton onClick={handleAddButtonClicked}>
                    <AddIcon />
                </IconButton>
            </ListItemIcon>
            <InputBase fullWidth placeholder='Add new todo ...' value={text}
                onChange={handleTextChange}
                onKeyDown={handleTextKeyDown}
            />
        </ListItem>
    )
}