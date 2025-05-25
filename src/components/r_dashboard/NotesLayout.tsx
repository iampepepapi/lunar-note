import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import React, { useState, useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { AlignCenter, AlignLeft, AlignRight, Bold, Eye, Italic, Pencil, Strikethrough } from 'lucide-react';
import { Button } from '../ui/button';
import { Markdown } from 'tiptap-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // You can choose different themes
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
// Import more language support as needed

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
                heading: false,
                bulletList: false,  // Disable auto bullet lists
                orderedList: false,
                codeBlock: false,  // Disable code blocks
            }),
            CustomHeading,
            TextAlign.configure({
                types: ['paragraph'],
            }),
            Markdown.configure({
                breaks: true,
                html: false,
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

    const markdownComponents: Components = {
        code: ({ node, children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const lang = match ? match[1] : ''

            const codeString = String(children).replace(/\n$/, '');

            useEffect(() => {
                Prism.highlightAll();
            }, []);

            return (
                <div className="relative">
                    {lang && (
                        <div className="absolute right-2  text-xs text-gray-400 font-mono">
                            {lang}
                        </div>
                    )}
                    <pre className="!m-0">
                        <code
                            className={`language-${lang} -mt-4 pl-4 block bg-gray-100 dark:bg-gray-800 
                                rounded-lg  font-mono text-sm overflow-x-auto`}
                        >
                            {codeString}
                        </code>
                    </pre>
                </div>
            )
        },
        pre: ({ node, children, ...props }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-0 my-4" {...props}>
                {children}
            </pre>
        ),

        h1: ({ node, children, ...props }) => (
            <h1 className="text-4xl font-bold mb-4" {...props}>
                {children}
            </h1>
        ),
        h2: ({ node, children, ...props }) => (
            <h2 className="text-3xl font-bold mb-3" {...props}>
                {children}
            </h2>
        ),
        h3: ({ node, children, ...props }) => (
            <h3 className="text-2xl font-bold mb-2" {...props}>
                {children}
            </h3>
        ),
        h4: ({ node, children, ...props }) => (
            <h4 className="text-xl font-bold mb-2" {...props}>
                {children}
            </h4>
        ),
        h5: ({ node, children, ...props }) => (
            <h5 className="text-lg font-bold mb-1" {...props}>
                {children}
            </h5>
        ),
        h6: ({ node, children, ...props }) => (
            <h6 className="text-base font-bold mb-1" {...props}>
                {children}
            </h6>
        ),

        // Add paragraph component to handle spacing
        p: ({ node, children, ...props }) => (
            <p className="mb-4" {...props}>
                {children}
            </p>
        ),
    };

    return (
        <div className="flex flex-col max-w-5xl justify-center w-full">
            <FormattingBar editor={editor} isPreview={isPreview} handlePreview={handlePreview} />
            <div className="flex pt-8 justify-center focus:outline-none">
                {isPreview && editor ? (
                    <div className="w-full min-h-[600px] overflow-y-auto p-4 pr-6 pb-4 pl-6 border rounded-lg prose dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                            {editor.getText()}
                        </ReactMarkdown>
                    </div>
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

