import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import React from 'react';

interface NotesLayoutProps {
    notes: Note[];
    selectedNote: Note | null;
    editingNote: Note | null;
    isFormOpen: boolean;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSelectNote: (id: string) => void;
    onCreateNote: () => void;
    onSaveNote: (note: Note) => void;
    onUpdateNote: (note: Note) => void;
    onEditNote: (id: string) => void;
    onDeleteNote: (id: string) => void;
    onCancelForm: () => void;
}

function NotesLayout({
    notes,
    selectedNote,
    editingNote,
    isFormOpen,
    searchQuery,
    onSearchChange,
    onSelectNote,
    onCreateNote,
    onSaveNote,
    onUpdateNote,
    onEditNote,
    onDeleteNote,
    onCancelForm,
}: NotesLayoutProps) {

    const handleSaveNote = () => {
        if (editor) {
            const content = editor.getHTML();
            const note = { ...selectedNote, content };
            onSaveNote(note as Note);
        }
    };

    const editor = useEditor({
        content: '',
        extensions: [
            StarterKit,
            TextAlign,
        ],
        editable: true,
    });

    return (
        <div className="flex flex-col max-w-5xl justify-center w-full">
            <Menubar className='w-full px-8'>
                <MenubarMenu>
                    <MenubarTrigger>Format</MenubarTrigger>
                    <MenubarContent className=''>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                            Bold
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                            Italic
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                            Strike
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => editor?.commands.setTextAlign('left')}>
                            Left
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.commands.setTextAlign('center')}>
                            Center
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.commands.setTextAlign('right')}>
                            Right
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <div className="flex pt-8 justify-center focus:outline-none">
                <EditorContent
                    editor={editor}
                    className="text-gray-600 w-full  min-h-[600px] overflow-y-auto p-4 pr-6 pb-4 pl-6 border  rounded-lg"
                />
            </div>
        </div>
    );
}

export default NotesLayout;