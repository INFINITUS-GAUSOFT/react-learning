import React, { useState } from 'react'
import {
  Checkbox,
  IconButton,
  InputBase,
  ListItem,
  ListItemIcon,
} from '@mui/material'
import { Close } from '@mui/icons-material';

interface Props {
  id: string,
  done: boolean,
  text: string
  onStatusChange: (id: string, done: boolean) => any,
  onTextChange: (id: string, text: string) => any,
  onDelete: (id: string) => any
}

export default function TodoItem({ id, done, text, onStatusChange, onTextChange, onDelete }: Props) {

  const [localText, setLocalText] = useState(text);  // local text within this component to prevent rapid re-render in parent component

  // --- These methods changes parent TodoList data ---
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onStatusChange(id, checked);
  }

  const handleTextBlur = () => {  // text field lose focus, text edit finish
    onTextChange(id, localText);
  }

  const handleTextKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.code === 'Escape') {
      onTextChange(id, localText);
      e.target.addEventListener('blur', handleTextBlur);
    }
  }

  const handleDeleteClick = () => {
    onDelete(id);
  }

  // --- These methods only effects this component ---
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e?.target.value === undefined) return;
    setLocalText(e.target.value);
  }

  const handleTextFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const len = e?.target.value.length;
    if (len === undefined) return;
    e?.target.setSelectionRange(0, len);
  }

  return (
    <ListItem
      sx={{
        display: 'flex',
        '&:hover': {
          backgroundColor: '#eeeeee'
        }
      }}>
      <ListItemIcon>
        <Checkbox
          checked={done}
          onChange={handleCheckboxChange}
          name='checkbox' />
      </ListItemIcon>
      <InputBase
        fullWidth
        value={localText}
        onChange={handleTextChange}
        onFocus={handleTextFocus}
        onBlur={handleTextBlur}
        onKeyDown={handleTextKeyDown}
        sx={{
          flexGrow: 1,
          textDecoration: done ? 'line-through' : 'none'
        }}
        name='text'
      />
      <IconButton onClick={handleDeleteClick}>
        <Close />
      </IconButton>
    </ListItem >
  )
}
