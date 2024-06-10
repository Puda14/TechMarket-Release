import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CommentForm = ({ handleSubmit, submitLabel }) => {
    const [text, setText] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };

    return (
        <form onSubmit={onSubmit} className="space-y-2 !relative">
            <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your comment here..."
                required
            />
            <Button variant="contained" color="primary" type="submit" className={'!absolute !top-1/2  right-4 -translate-y-1/2 !m-0'}>
                {submitLabel}
            </Button>
        </form>
    );
};

export default CommentForm;
