"use client"
import Header from '@/components/r_dashboard/Header'
import NotesLayout from '@/components/r_dashboard/NotesLayout';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Note } from '@/lib/types';
import { FileText, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function Dashboard() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Load notes from localStorage on initial render
    useEffect(() => {
        const savedNotes = localStorage.getItem("notes")
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes))
        }
    }, [])

    // Save notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const handleCreateNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            createdAt: Date.now()
        };
        setNotes([newNote, ...notes]);
        setIsFormOpen(false);
        setSelectedNoteId(newNote.id);
    }

    const handleSaveNote = (note: Note) => {
        const newNotes = [note, ...notes];
        setNotes(newNotes);
        setIsFormOpen(false);
        setSelectedNoteId(note.id);
    }

    const handleUpdateNote = (updatedNote: Note) => {
        setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
        setIsFormOpen(false);
        setEditingNote(null);
    }

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
        if (selectedNoteId === id) {
            setSelectedNoteId(null);
        }
    }

    const handleEditNote = (id: string) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setEditingNote(noteToEdit);
            setIsFormOpen(true);
        }
    }

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

    return (

        <div className='h-full'>
            <Header onNewNote={handleCreateNote} />
            {/*  */}
            <div className='pt-24 flex justify-center  items-center'>
                <main className=" ">
                    <div className="flex flex-col items-center justify-center  text-center ">
                        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-medium mb-2">Start Taking Notes</h3>
                        <p className="text-muted-foreground mb-6">Select a note from the sidebar or create a new one</p>
                        <Button onClick={() => { }}>
                            <Plus className="mr-2 h-4 w-4" /> Create New Note
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard