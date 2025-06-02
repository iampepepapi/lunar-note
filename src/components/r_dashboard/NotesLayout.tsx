import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Eye,
  Italic,
  Pencil,
  Save,
  Strikethrough,
  FolderOpen,
} from "lucide-react";
import { Button } from "../ui/button";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // You can choose different themes
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
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

const downloadFile = (content: string, filename: string) => {
  const element = document.createElement("a");
  const blob = new Blob([content], { type: "text/markdown" });
  element.href = URL.createObjectURL(blob);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
};

function NotesLayout({
  selectedNote,
  onSaveNote,
}: NotesLayoutProps) {
  const [isPreview, setIsPreview] = useState(false);
  const editor = useEditor({
    content: "",
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        codeBlock: false,
      }),
      CustomHeading,
      TextAlign.configure({
        types: ["paragraph"],
      }),
    ],
    editable: !isPreview,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  const handleSaveMarkdown = () => {
    if (!editor) return;
    const content = editor.view.dom.innerText;
    downloadFile(content, "note.md");
  };

  const handleOpenMarkdown = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        // Insert raw text content line by line to preserve markdown symbols
        const lines = content.split("\n");
        editor.commands.clearContent();

        for (const line of lines) {
          editor.commands.insertContent(line);
          editor.commands.enter();
        }

        // Remove extra line at the end
        editor.commands.command(({ tr }) => {
          tr.delete(tr.doc.content.size - 2, tr.doc.content.size);
          return true;
        });
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const markdownComponents: Components = {
    code: ({ node, children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match ? match[1] : "";

      const codeString = String(children).replace(/\n$/, "");

      useEffect(() => {
        Prism.highlightAll();
      }, []);

      return (
        <div className="relative">
          {lang && (
            <div className="absolute right-2 font-mono text-xs text-gray-400">
              {lang}
            </div>
          )}
          <pre className="!m-0">
            <code
              className={`language-${lang} -mt-4 block overflow-x-auto rounded-lg bg-gray-100 pl-4 font-mono text-sm dark:bg-gray-800`}
            >
              {codeString}
            </code>
          </pre>
        </div>
      );
    },
    pre: ({ node, children, ...props }) => (
      <pre
        className="my-4 rounded-lg bg-gray-100 p-0 dark:bg-gray-800"
        {...props}
      >
        {children}
      </pre>
    ),

    // Improve heading components
    h1: ({ children }) => (
      <h1 className="mb-6 border-b pb-2 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-2xl font-bold">{children}</h3>
    ),

    // Update the list components
    ul: ({ children }) => (
        <ul className="list-disc space-y-2 ml-6">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal space-y-2 ml-6">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="pl-2 marker:text-gray-500">{children}</li>
    ),

    // Add horizontal rule
    hr: () => (
      <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />
    ),

    // Enhance paragraph spacing
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,

    // Add support for wiki-style links
    a: ({ children, href }) => {
      const isWikiLink = href?.startsWith("[[") && href?.endsWith("]]");
      return isWikiLink ? (
        <span className="cursor-pointer text-blue-500 hover:underline">
          {children}
        </span>
      ) : (
        <a href={href} className="text-blue-500 hover:underline">
          {children}
        </a>
      );
    },

    // Enhance emphasis and strong
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  };

  return (
    <div className="flex w-full max-w-5xl flex-col justify-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".md"
        style={{ display: "none" }}
      />
      <FormattingBar
        editor={editor}
        isPreview={isPreview}
        handlePreview={handlePreview}
        onSave={handleSaveMarkdown}
        onOpen={handleOpenMarkdown}
      />
      <div className="flex justify-center pt-8 focus:outline-none">
        {isPreview && editor ? (
          <div className="prose dark:prose-invert min-h-[600px] w-full overflow-y-auto rounded-lg border p-4 pr-6 pb-4 pl-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {editor.getText()}
            </ReactMarkdown>
          </div>
        ) : (
          <EditorContent
            editor={editor}
            className="min-h-[600px] w-full overflow-y-auto rounded-lg border p-4 pr-6 pb-4 pl-6 text-gray-200"
          />
        )}
      </div>
    </div>
  );
}

export default NotesLayout;

interface FormattingBarProps {
  editor: Editor | null;
  isPreview: boolean;
  handlePreview: () => void;
  onSave: () => void;
  onOpen: () => void;
}

const FormattingBar = ({
  editor,
  isPreview,
  handlePreview,
  onSave,
  onOpen,
}: FormattingBarProps) => {
  return (
    <div className="bg-muted flex flex-wrap gap-2 rounded-lg border px-4 py-2">
      <Button
        variant={editor?.isActive("bold") ? "default" : "outline"}
        size="icon"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant={editor?.isActive("italic") ? "default" : "outline"}
        size="icon"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant={editor?.isActive("strike") ? "default" : "outline"}
        size="icon"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <div className="bg-border mx-2 h-5 w-px" />

      <Button variant="outline" size="sm" onClick={handlePreview}>
        {isPreview ? (
          <>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </>
        ) : (
          <>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </>
        )}
      </Button>

      <div className="bg-border mx-2 h-5 w-px" />

      <Button
        variant="outline"
        size="icon"
        onClick={onSave}
        title="Save as Markdown"
      >
        <Save className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onOpen}
        title="Open Markdown file"
      >
        <FolderOpen className="h-4 w-4" />
      </Button>

      <div className="bg-border mx-2 h-5 w-px" />

      <Button
        variant={
          editor?.isActive({ textAlign: "left" }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor?.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant={
          editor?.isActive({ textAlign: "center" }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant={
          editor?.isActive({ textAlign: "right" }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor?.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
