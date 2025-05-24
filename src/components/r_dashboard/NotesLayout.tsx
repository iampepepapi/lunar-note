import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AlignCenter, AlignLeft, AlignRight, Bold, Eye, Italic, Pencil, Strikethrough } from 'lucide-react';
import { Button } from '../ui/button';

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

const CustomHeading = Heading.extend({
    addInputRules() {
        return []; // disables # turning into heading
    },
});

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
    const [isPreview, setIsPreview] = useState(false);
    const editor = useEditor({
        content: '',
        extensions: [
            StarterKit.configure({
                heading: false, // disable default heading entirely
            }),
            CustomHeading,
            TextAlign.configure({
                types: ['paragraph'],
            }),
        ],
        editable: !isPreview,
    });

    const handleSaveNote = () => {
        if (editor) {
            const content = editor.getHTML();
            const note = { ...selectedNote, content };
            onSaveNote(note as Note);
        }
    };

    const handlePreview = () => {
        setIsPreview(!isPreview);
    };

    return (
        <div className="flex flex-col max-w-5xl justify-center w-full">
            <FormattingBar editor={editor} isPreview={isPreview} handlePreview={handlePreview} />
            <div className="flex pt-8 justify-center focus:outline-none">
                {isPreview && editor ? (
                    <ReactMarkdown>

                        {editor.getJSON().content?.[0]?.content?.[0]?.text}
                    </ReactMarkdown>
                ) : (
                    <EditorContent
                        editor={editor}
                        className="text-gray-600 w-full min-h-[600px] overflow-y-auto p-4 pr-6 pb-4 pl-6 border rounded-lg"
                    />
                )}
            </div>
        </div>
    );
}

export default NotesLayout;


const FormattingBar = ({ editor, isPreview, handlePreview }: any) => {
    return (
        <div className="flex flex-wrap gap-2 px-4 py-2 bg-muted border rounded-lg">
            <Button
                variant={editor?.isActive("bold") ? "default" : "outline"}
                size="icon"
                onClick={() => editor?.chain().focus().toggleBold().run()}
            >
                <Bold className="w-4 h-4" />
            </Button>

            <Button
                variant={editor?.isActive("italic") ? "default" : "outline"}
                size="icon"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
                <Italic className="w-4 h-4" />
            </Button>

            <Button
                variant={editor?.isActive("strike") ? "default" : "outline"}
                size="icon"
                onClick={() => editor?.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="w-4 h-4" />
            </Button>

            <div className="w-px h-5 bg-border mx-2" />

            <Button variant="outline" size="sm" onClick={handlePreview}>
                {isPreview ? (
                    <>
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                    </>
                ) : (
                    <>
                        <Eye className="w-4 h-4 mr-2" /> Preview
                    </>
                )}
            </Button>

            <div className="w-px h-5 bg-border mx-2" />

            <Button
                variant={editor?.isActive({ textAlign: "left" }) ? "default" : "outline"}
                size="icon"
                onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            >
                <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
                variant={editor?.isActive({ textAlign: "center" }) ? "default" : "outline"}
                size="icon"
                onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            >
                <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
                variant={editor?.isActive({ textAlign: "right" }) ? "default" : "outline"}
                size="icon"
                onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            >
                <AlignRight className="w-4 h-4" />
            </Button>
        </div>
    );
};